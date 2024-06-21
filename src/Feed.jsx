import React, { useEffect, useState } from 'react'
import Story from '../components/Story'
import Post from '../components/Post';
import { TiHeartOutline } from "react-icons/ti";
import { RiH1, RiMessengerLine } from "react-icons/ri";
import Footer from "../components/Footer";
import Loader from "../components/Loader";


function Feed() {
  const [users, setUsers] = useState([])


  const getAllPosts = async () => {
    const rowdata = await fetch(`${import.meta.env.VITE_BACKEND_URL}/getallposts`, {
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
        <div className="bg-zinc-900 text-white py-5 min-h-screen">
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


          {users.length > 1 ?<div className="posts mb-20 w-full">
            {users.map((post, index) => {
              return <Post key={index} username={post.user.username} caption={post.caption} likes={post.likes.length} userPhoto={post.user.photo?.data} postUrl={post.image.data} />
            })}
          </div>: <Loader/>}
        </div>
        <Footer />
    </div >

  )
}

export default Feed