"use client"

import React, { useEffect, useState } from 'react'
import Story from '../(componente)/Story'
import Post from '../(componente)/Post';
import { TiHeartOutline } from "react-icons/ti";
import { RiMessengerLine } from "react-icons/ri";
import Footer from '../(componente)/Footer';


function page() {
  const [users, setUsers] = useState([])


  const getAllPosts = async () =>{
    const rowdata =  await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/getallposts`, {
      method: "GET",
      headers: {
        "Token": localStorage.getItem("Token")
      }
      
    })
    const data = await rowdata.json();
    setUsers(data.result.reverse());
  }

  useEffect(() => {
    getAllPosts();
  }, [])
  

  return (
    <div className='relative'>
    <div className="w-full min-h-screen bg-zinc-900 text-white py-5">
      <div className="w-full px-4 flex items-center justify-between">
        <img className="w-1/4" src="/logo.png" alt="" />
        <div className="icons -mt-2 flex gap-3 items-center">
          <TiHeartOutline className='text-2xl' />
          <RiMessengerLine className='text-2xl' />

        </div>
      </div>
      <div className="story px-3 flex gap-3 overflow-auto mt-5">
        <Story />
        <Story />
        <Story />
        <Story />
        <Story />
        <Story />
      </div>
      <div className="posts mb-20">
        {users.map((post , index)=>{
          return <Post key={index} username={post.user.username} caption={post.caption} likes={post.likes.length} userPhoto={post.user.photo} postUrl={post.image}  />
        })}
      </div>
    </div>
    <Footer/>
    </div>

  )
}

export default page
