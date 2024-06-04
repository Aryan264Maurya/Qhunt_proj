import React from "react";
import { FiMail, FiPhone, FiMapPin } from "react-icons/fi";
import { MdSend } from "react-icons/md";
import Footer from "../components/common/Footer";

const Contact = () => {
  return (
    <div className="bg-gray-900 text-white py-20 px-6 lg:px-24">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-semibold mb-8 text-center">
          Contact Us
        </h1>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div>
            <h2 className="text-2xl font-semibold mb-4">Contact Details</h2>
            <div className="flex items-center mb-4">
              <FiMail className="mr-2" />
              <p>Email: contact@qhunt.com</p>
            </div>
            <div className="flex items-center mb-4">
              <FiPhone className="mr-2" />
              <p>Phone: +123 456 7890</p>
            </div>
            <div className="flex items-center mb-4">
              <FiMapPin className="mr-2" />
              <p>Address: 123 Main Street, City, Country</p>
            </div>
          </div>
          <div>
            <h2 className="text-2xl font-semibold mb-4">Send Us a Message</h2>
            <form>
              <div className="mb-4">
                <label htmlFor="name" className="block mb-2">Name</label>
                <input type="text" id="name" name="name" className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg focus:outline-none focus:border-blue-500" />
              </div>
              <div className="mb-4">
                <label htmlFor="email" className="block mb-2">Email</label>
                <input type="email" id="email" name="email" className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg focus:outline-none focus:border-blue-500" />
              </div>
              <div className="mb-4">
                <label htmlFor="phone" className="block mb-2">Phone Number</label>
                <input type="tel" id="phone" name="phone" className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg focus:outline-none focus:border-blue-500" />
              </div>
              <div className="mb-4">
                <label htmlFor="message" className="block mb-2">Message</label>
                <textarea id="message" name="message" rows="5" className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg focus:outline-none focus:border-blue-500"></textarea>
              </div>
              <button type="submit" className="bg-blue-500 hover:bg-blue-600 text-white py-3 px-8 rounded-lg transition-colors duration-300 flex items-center">
                <MdSend className="mr-2" />
                Send Message
              </button>
            </form>
          </div>
        </div>
      </div>
      <div className="relative mx-auto my-20 flex w-11/12 max-w-maxContent flex-col items-center justify-between gap-8 bg-richblack-900 text-white">
       
        <h1 className="text-center text-4xl font-semibold mt-8">
         THANKYOU 
        </h1>
      
      </div>
      <Footer />
    </div>
  );
}

export default Contact;
