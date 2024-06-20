import React, { useEffect, useState } from 'react'
import Story from '../components/Story'
import Post from '../components/Post';
import { TiHeartOutline } from "react-icons/ti";
import { RiMessengerLine } from "react-icons/ri";
import Footer from "../components/Footer";


function Feed() {
  const [users, setUsers] = useState([])


  const getAllPosts = async () =>{
    const rowdata =  await fetch(`${import.meta.env.VITE_BACKEND_URL}/getallposts`, {
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
    <div className="bg-zinc-900 text-white py-5">
      <div className="px-4 flex items-center justify-between">
        <img className="w-1/4 object-cover" src="/logo.png" alt="" />
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

      {/* <div class="circle flex-shrink-0">
        <div class="gradient w-[18vw] h-[18vw] bg-sky-100 rounded-full bg-gradient-to-r from-purple-700 to-orange-500 flex items-center justify-center">
          <div class="inner w-[92%] h-[92%] rounded-full overflow-hidden">
            <img class="w-full h-full object-cover"
              src="https://images.unsplash.com/photo-1570158268183-d296b2892211?q=80&w=3456&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
              alt=""/>
          </div>
        </div>
      </div> */}

      
      
      
      <div className="posts mb-20 w-full">
        {users.map((post , index)=>{
          return <Post key={index} username={post.user.username} caption={post.caption} likes={post.likes.length} userPhoto={post.user.photo?.data} postUrl={post.image.data}  />
        })}
      </div>
    </div>
      <Footer/>
    </div>

  )
}

export default Feed