import React, { useEffect, useState } from 'react'
import Story from '../components/Story'
import Post from '../components/Post';
import { TiHeartOutline } from "react-icons/ti";
import { RiMessengerLine } from "react-icons/ri";
import Footer from "../components/Footer";
import Loader from "../components/Loader";


function Feed() {
  const [posts, setPosts] = useState([]);


  const getAllPosts = async () => {
    const rowdata = await fetch(`${import.meta.env.VITE_BACKEND_URL}/getallposts`);
    const data = await rowdata.json();
    setPosts(data.result.reverse());
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
              <TiHeartOutline className='text-2xl'/>
              <RiMessengerLine className='text-2xl'/>
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


          {posts.length >= 1 ?<div className="posts mb-20 w-full">
            {posts.map((post) => {
              return <Post key={post._id} id={post._id} username={post.user.username} caption={post.caption} userPhoto={post.user.photo} postUrl={post.image} likes={post.likes.length}/>
            })}
          </div>: <Loader/>}
        </div>
        <Footer />
    </div >

  )
}

export default Feed