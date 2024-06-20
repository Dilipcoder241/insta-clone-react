import React, { useEffect, useState } from 'react';
import { RiHome5Line } from "react-icons/ri";
import { IoSearchSharp } from "react-icons/io5";
import { FaRegSquarePlus } from "react-icons/fa6";
import { Link ,useNavigate } from 'react-router-dom';
import { FaRegUserCircle } from "react-icons/fa";


function Footer() {
  const [username, setusername] = useState("");
  const router = useNavigate();

  const handleGetname = async ()=>{
    const rowdata =  await fetch(`${import.meta.env.VITE_BACKEND_URL}/getname`, {
      method: "GET",
      headers: {
        "Content-type": "application/json; charset=UTF-8",
        "Token": localStorage.getItem("Token")
      }
      
    })
    const data = await rowdata.json();
    setusername(data.username);
  }

  useEffect(() => {
    handleGetname();
  }, [])
  


  return (
    <div className="footer text-white flex justify-between items-center w-full fixed bottom-0 z-10 bg-zinc-900">
        <Link to="/feed"><RiHome5Line className="text-[1.4rem] ri-home-line"/></Link>
        <Link to="/search"><IoSearchSharp className="text-[1.4rem] ri-search-line"/></Link>
        <Link to="/upload"><FaRegSquarePlus className="text-[1.4rem] ri-add-box-line"/></Link>
        <button onClick={()=>{router(`/profile/${username}`)}}>
          <FaRegUserCircle className='text-xl'/>
        </button>
      </div>
  )
}

export default Footer
