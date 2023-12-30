'use client'

import React, { useEffect, useState } from 'react'
import ProfilePost from '../../(componente)/ProfilePost'
import Footer from '../../(componente)/Footer';
import { RiMenu3Line } from "react-icons/ri";
import { RiAddBoxLine } from "react-icons/ri";
import Link from 'next/link';




function page({params}) {
    const [userdata, setUserdata] = useState({});
    const [posts, setPosts] = useState([])
    const [userphoto, setUserphoto] = useState("")

    const dataget = async () =>{
      const data = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/profile/${params.username}`);
      const jdata = await data.json();
      setUserdata(jdata)
    }

    const getAllImages = async () =>{
      const rowdata =  await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/getallimage`, {
        method: "GET",
        headers: {
          "Token": localStorage.getItem("Token")
        }
        
      })
      const data = await rowdata.json();
      setPosts(data.result.posts.reverse());
    }

    const getImage = async () =>{
      const rowdata =  await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/getimage`, {
        method: "GET",
        headers: {
          "Token": localStorage.getItem("Token")
        }
        
      })
      const data = await rowdata.json();
      setUserphoto(data.user.photo);
    }
    useEffect(() => {
      dataget();
      getAllImages();
      getImage();
    }, [])
    
    
    
  return (
    <div className='relative'>
    <div className="w-full min-h-screen bg-zinc-900 text-white py-5">
      <div className="nav flex justify-between items-center px-4">
        <h3 className="text-lg">{userdata.username}</h3>
        <div className="icons flex gap-5">
          <Link href="/upload"><RiAddBoxLine className="text-[1.4rem] ri-add-box-line"/></Link>
          <RiMenu3Line />
        </div>
      </div>
      <div className="flex justify-between items-center pl-6 pr-[12vw] mt-8">
        <div className="w-[19vw] h-[19vw] rounded-full overflow-hidden">
          <img src={userphoto} alt="" className='h-fill w-full object-cover'/>
        </div>
        <div className="stats flex gap-5 items-center justify-between">
          <div className="flex flex-col items-center justify-center">
            <h3>{posts.length}</h3>
            <h4>Posts</h4>
          </div>
          <div className="flex flex-col items-center justify-center">
            <h3>322</h3>
            <h4>Posts</h4>
          </div>
          <div className="flex flex-col items-center justify-center">
            <h3>322</h3>
            <h4>Posts</h4>
          </div>
        </div>
      </div>
      <div className="dets px-6 mt-5">
        <h3 className="text-lg mb-1">{userdata.name}</h3>
        <p className="text-xs tracking-tight opacity-50">{userdata.bio}.</p>
      </div>
      <div className="px-6 mt-5">
        <Link className="px-3 py-2 bg-zinc-800 text-xs rounded-md" href="/edit">Edit Profile</Link>
      </div>
      <div className="posts w-full flex gap-1 py-2 mt-5 flex-wrap">
        {posts.map((post , index)=>{
           return <ProfilePost key={index} url={post.image}/>
        })}
      </div>
  </div>
  <Footer/>
        </div>
  )
}

export default page
