//signup login send otp chnagepassword


const bcrypt = require("bcrypt");
const User = require("../models/User");
const OTP = require("../models/OTP");
const jwt = require("jsonwebtoken");
const otpGenerator = require("otp-generator");
const mailSender = require("../utils/mailSender");
const { passwordUpdated } = require("../mail/templates/passwordUpdate");
const Profile = require("../models/Profile");
require("dotenv").config();


exports.signup = async (req, res) => {
    try {
        const {
            firstName,
            lastName,
            email,
            password,
            confirmpassword,
            accountType,
            contactNumber,
            otp,
        } = req.body;

        if (!firstName || !lastName || !email || !password || !confirmpassword || !otp) {
            return res.status(403).send({
                success: false,
                message: "Please fill in all the details",
            });
        }

        if (password !== confirmpassword) {
            return res.status(400).json({
                success: false,
                message: "Password and Confirm Password do not match. Please try again.",
            });
        }

        // Check if user already exists
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({
                success: false,
                message: "User already exists. Please sign in to continue.",
            });
        }

        // Find most recent OTP to check
        const latestOTP = await OTP.findOne({ email }).sort({ createdAt: -1 });
        if (!latestOTP || latestOTP.otp !== otp) {
            return res.status(400).json({
                success: false,
                message: "The OTP is not valid",
            });
        }

        // Hash the password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create a new profile
        const profileDetails = await Profile.create({
            gender: null,
            dateOfBirth: null,
            about: null,
            contactNumber: null,
        });

        // Determine approval status based on accountType
        let approved = "";
		approved === "Admin" ? (approved = false) : (approved = true);

        // Create the user
        const newUser = await User.create({
            firstName,
            lastName,
            email,
            contactNumber,
            password: hashedPassword,
            accountType,
            approved,
            additionalDetails: profileDetails._id,
            image: `https://api.dicebear.com/5.x/initials/svg?seed=${firstName} ${lastName}`,
        });

        return res.status(200).json({
            success: true,
            user: newUser,
            message: "User registered successfully",
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            success: false,
            message: "User cannot be registered. Please try again.",
        });
    }
};



exports.login = async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            // Return 400 Bad Request status code with error message
            return res.status(400).json({
                success: false,
                message: `Please fill in all the required fields.`,
            });
        }

        const user = await User.findOne({ email }).populate("additionalDetails");
        if (!user) {
            return res.status(401).json({
                success: false,
                message: `User is not registered with us. Please sign up to continue.`,
            });
        }
        
        // Check if password matches
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            return res.status(401).json({
                success: false,
                message: `Password is incorrect.`,
            });
        }

        // Generate token
        const token = jwt.sign(
            {
                email: user.email,
                id: user._id,
                accountType: user.accountType
            },
            process.env.JWT_SECRET,
            { expiresIn: "24h" }
        );

        // Set token in user object and remove password
        user.token = token;
        user.password = undefined;

        // Set token in cookie
        const options = {
            expires: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000),
            httpOnly: true,
        };
        res.cookie("token", token, options);

        // Return success response with token and user information
        return res.status(200).json({
            success: true,
            token,
            user,
            message: `User login success.`,
        });
    } catch (error) {
        console.error(error);
        // Return 500 Internal Server Error status code with error message
        return res.status(500).json({
            success: false,
            message: `Login failure. Please try again.`,
        });
    }
};

exports.sendotp = async (req, res) => {
    try {
        const { email } = req.body;
        const checkUser = await User.findOne({ email });

        if (checkUser) {
            return res.status(401).json({
                success: false,
                message: `User is Already Registered`,
            });
        }

        var otp = otpGenerator.generate(6, {
            upperCaseAlphabets: false,
            lowerCaseAlphabets: false,
            specialChars: false,
        });
        const result = await OTP.find({ otp: otp });
        console.log("Result is Generate OTP Func");
        console.log("OTP", otp);
        console.log("Result", result);
        while (result) {
            otp = otpGenerator.generate(6, {
                upperCaseAlphabets: false,
            });
        }
        const otpPayload = { email, otp };
        const otpBody = await OTP.create(otpPayload);
        console.log("OTP Body", otpBody);
        res.status(200).json({
            success: true,
            message: `OTP Sent Successfully`,
            otp,
        });
    } catch (error) {
        console.log(error.message);
        return res.status(500).json({ success: false, error: error.message });
    }
}

//change password
exports.changePassword = async (req, res) => {
    try {
        const userDetails = await User.findById(req.user.id);

        const { oldPassword, newPassword, confirmNewPassword } = req.body;

        const isPasswordMatch = await bcrypt.compare(
            oldPassword,
            userDetails.password
        );
        if (!isPasswordMatch) {
            // If old password does not match, return a 401 (Unauthorized) error
            return res
                .status(401)
                .json({ success: false, message: "The password is incorrect" });
        }


        if (newPassword !== confirmNewPassword) {
            // If new password and confirm new password do not match, return a 400 (Bad Request) error
            return res.status(400).json({
                success: false,
                message: "The password and confirm password does not match",
            });
        }

        const encryptedPassword = await bcrypt.hash(newPassword, 10);
        const updatedUserDetails = await User.findByIdAndUpdate(
            req.user.id,
            { password: encryptedPassword },
            { new: true }
        );


        //send notification email
        try {
            const emailResponse = await mailSender(
                updatedUserDetails.email,
                passwordUpdated(
                    updatedUserDetails.email,
                    `Password updated successfully for ${updatedUserDetails.firstName} ${updatedUserDetails.lastName}`
                )
            );
            console.log("Email sent successfully:", emailResponse.response);
        } catch (error) {
            console.error("Error occurred while sending email:", error);
            return res.status(500).json({
                success: false,
                message: "Error occurred while sending email",
                error: error.message,
            });
        }

        return res
            .status(200)
            .json({ success: true, message: "Password updated successfully" });

    } catch (error) {
        console.error("Error occurred while updating password:", error);
        return res.status(500).json({
            success: false,
            message: "Error occurred while updating password",
            error: error.message,
        });
    }
}