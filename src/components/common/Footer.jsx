import React from "react";
import { Link } from "react-router-dom";
import { FaFacebook, FaGoogle, FaTwitter, FaYoutube } from "react-icons/fa";
import Logo from "../../assets/Logo/logo.jpeg";

const BottomFooter = ["Privacy Policy", "Cookie Policy", "Terms"];

const Footer = () => {
  return (
    <div className="bg-richblack-800 text-richblack-400 py-10 px-6 lg:px-24">
      <div className="max-w-4xl mx-auto flex flex-col lg:flex-row justify-between items-center">
        {/* Logo and Social Icons */}
        <div className="flex items-center mb-4 lg:mb-0">
          <img src={Logo} alt="Logo" className="w-30 h-12 mr-4" /> 
          <div className="flex gap-4 text-lg">
            <FaFacebook />
            <FaGoogle />
            <FaTwitter />
            <FaYoutube />
          </div>
        </div>
        
        {/* Bottom Footer Links */}
        <div className="flex flex-wrap justify-center lg:justify-end gap-6">
          {BottomFooter.map((link, index) => (
            <Link
              key={index}
              to={`/${link.split(" ").join("-").toLowerCase()}`}
              className="text-sm hover:text-richblack-50 transition-colors duration-300"
            >
              {link}
            </Link>
          ))}
        </div>
      </div>
      
      {/* Attribution */}
      <div className="text-center mt-8 text-xs">
        Made with ❤️ Aryan Maurya © 2023 Qhunt
      </div>
    </div>
  );
};

export default Footer;
