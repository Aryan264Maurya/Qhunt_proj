import React from "react";
import { Link, matchPath } from "react-router-dom";
import logo from "../../assets/Logo/logo.jpeg";
import {NavbarLinks} from "../../data/navbar-links";
import { useLocation } from "react-router-dom";
import {useSelector} from "react-redux";
import ProfileDropDown from '../core/Auth/ProfileDropDown'

const Navbar = () =>{
    const {token} = useSelector( (state) => state.auth );
    // const {user} = useSelector( (state) => state.profile );
    const location=useLocation();
    const matchRoute =(route)=>{
        return matchPath({path:route} , location.pathname);
    }
    // console.log(token);
    // token=null;
    return (
        <div className="flex h-16 items-center justify-center border-b-[1px] border-b-richblack-700">
            <div className="flex w-11/12 max-w-maxContent items-center justify-between">
                <Link t="/">
                    <img src={logo} alt="logo" width={130} height={20} loading="lazy" />
                </Link>

                {/* {navlinks} */}
                <nav>
                    <ul className="flex gap-x-6 text-richblack-25">
                    {
                     NavbarLinks.map((link,index) => {
                         return <li key={index}>
                          {
                            <Link to={link?.path}>
                                <p className={`${matchRoute(link?.path)? "text-yellow-25":"text-richblack-25"}`}>
                                {link.title}</p></Link>
                          }</li>
                        })
                    }

                    </ul>
                </nav>


                {/* login signup dashboard */}

                <div className="flex gap-x-4 items-center">
                    {
                        token===null && (
                            <Link to="/login">
                                <button className='border border-richblack-700 bg-richblack-800 px-[12px] py-[8px] text-richblack-100 rounded-md'>
                                    Log in
                                </button>
                            </Link>
                        )
                    } 
                    {
                    token === null && (
                        <Link to="/signup">
                            <button  className='border border-richblack-700 bg-richblack-800 px-[12px] py-[8px] text-richblack-100 rounded-md'>
                                Sign Up
                            </button>
                        </Link>
                    )
                }
                {
                    token !== null && <ProfileDropDown />
                    
                }
                </div>
            </div>
        </div>

    )
}
export default Navbar;
