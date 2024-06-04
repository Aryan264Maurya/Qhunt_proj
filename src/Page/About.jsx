import React from "react";
import { Link } from "react-router-dom";
import HighlightText from "../components/core/HighlighText";
const About = () => {
  return (
    <div className="bg-gray-900 text-white py-20 px-6 lg:px-24">
       <div className=" text-xl md:text-4xl font-semibold mx-auto py-5 pb-20 text-center text-white">
        We are passionate about revolutionizing the way we learn. Our
        innovative platform <HighlightText text={"combines technology"} />,{" "}
        <span className="bg-gradient-to-b from-[#FF512F] to-[#F09819] text-transparent bg-clip-text font-bold">
            {" "}
            expertise
        </span>
        , and community to create an
        <span className="bg-gradient-to-b from-[#E65C00] to-[#F9D423] text-transparent bg-clip-text font-bold">
            {" "}
            unparalleled educational
        experience.
        </span> 
    </div>
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-semibold mb-8 text-center">
          About Qhunt
        </h1>
        <p className="text-lg mb-8">
          Qhunt is your ultimate destination for creating and taking quizzes online. Our platform empowers educators, students, and quiz enthusiasts to engage in interactive learning experiences.
        </p>
        <p className="text-lg mb-8">
          With Qhunt, you can easily create quizzes on any topic, customize them to your liking, and share them with your audience. Whether you're a teacher looking to assess your students' knowledge or an individual interested in creating fun quizzes for friends, Qhunt has got you covered.
        </p>
        <p className="text-lg mb-8">
          On the other hand, if you're looking to challenge yourself or test your knowledge, Qhunt offers a wide range of quizzes created by our community. From academic subjects to pop culture trivia, there's something for everyone on Qhunt.
        </p>
        <p className="text-lg mb-8">
          Join Qhunt today and embark on a journey of discovery, learning, and fun!
        </p>
        <div className="text-center">
          <Link
            to="/signup"
            className="inline-block bg-blue-500 hover:bg-blue-600 text-white py-3 px-8 rounded-lg transition-colors duration-300"
          >
            Get Started
          </Link>
        </div>
      </div>
    </div>
  );
}

export default About;
