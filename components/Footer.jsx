import React, { useEffect, useState } from 'react';
import { RiHome5Line } from "react-icons/ri";
import { IoSearchSharp } from "react-icons/io5";
import { FaRegSquarePlus } from "react-icons/fa6";
import { Link, useNavigate } from 'react-router-dom';
import { FaRegUserCircle } from "react-icons/fa";
import { toast } from 'react-toastify';
import { TiHeartOutline } from "react-icons/ti";
import { RiMessengerLine } from "react-icons/ri";
import axios from '../Utils/axios';


function Footer() {
  const [username, setusername] = useState("");
  const router = useNavigate();

  const handleGetname = async () => {
    if (!localStorage.getItem("Token")) {
      toast.error("Please Login");
      router("/login");
      return;
    }

    const {data} = await axios.get(`/getname`);

    setusername(data.username);
  }

  const clickProfileBtn = () => {
    if (!username) {
      router("/login");
      return;
    }
    router(`/profile/${username}`)
  }

  useEffect(() => {
    handleGetname();
  }, [])



  return (
    <>

      <div className='md:hidden'>
        <div className="footer px-4 py-2 text-white flex justify-between items-center w-full fixed bottom-0 z-10 bg-zinc-900">
          <Link to="/feed"><RiHome5Line className="text-[1.4rem] ri-home-line" /></Link>
          <Link to="/search"><IoSearchSharp className="text-[1.4rem] ri-search-line" /></Link>
          <Link to={`${username ? "/upload" : "/login"}`}><FaRegSquarePlus className="text-[1.4rem] ri-add-box-line" /></Link>
          <button onClick={clickProfileBtn}>
            <FaRegUserCircle className='text-xl' />
          </button>
        </div>
      </div>

      <div className='navbar-bigScreen w-[20%] h-screen bg-zinc-900 text-white p-4 relative top-0 hidden md:block'>
        <img src="/logo.png" alt="" className='w-2/5 mb-14 mt-5' />
        <ul>
          <li>
            <Link to="/feed" className='w-full p-4 hover:bg-zinc-800 flex gap-2 rounded-md duration-300 font-bold'><RiHome5Line className="text-[1.4rem] ri-home-line" /> Home</Link>
          </li>
          <li>
            <Link to="/search" className='w-full p-4 hover:bg-zinc-800 flex gap-2 rounded-md duration-300 font-bold'><IoSearchSharp className="text-[1.4rem] ri-search-line" /> Search</Link>
          </li>
          <li>
            <Link to={`${username ? "/upload" : "/login"}`} className='w-full p-4 hover:bg-zinc-800 flex gap-2 rounded-md duration-300 font-bold'><FaRegSquarePlus className="text-[1.4rem] ri-add-box-line" /> Upload Post</Link>
          </li>
          <li>
            <button onClick={clickProfileBtn} className='w-full p-4 hover:bg-zinc-800 flex items-center gap-2 rounded-md duration-300 font-bold'>
              <FaRegUserCircle className='text-xl' /> Profile
            </button>
          </li>
          <li>
            <Link to="#" className='w-full p-4 hover:bg-zinc-800 flex gap-2 rounded-md duration-300 font-bold'><RiMessengerLine className="text-[1.4rem] ri-add-box-line" /> Messages</Link>
          </li>
          <li>
            <Link to="#" className='w-full p-4 hover:bg-zinc-800 flex gap-2 rounded-md duration-300 font-bold'><TiHeartOutline className="text-[1.4rem] ri-add-box-line" /> Notifications</Link>
          </li>
        </ul>
      </div>
    </>
  )
}

export default Footer
