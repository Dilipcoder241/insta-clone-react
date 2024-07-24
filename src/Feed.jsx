import React, { useEffect, useState } from 'react'
import Story from '../components/Story'
import Post from '../components/Post';
import { TiHeartOutline } from "react-icons/ti";
import { RiMessengerLine } from "react-icons/ri";
import Footer from "../components/Footer";
import Loader from "../components/Loader";
import LoadingBar from 'react-top-loading-bar';
import axios from '../Utils/axios';


function Feed() {
  const [posts, setPosts] = useState([]);
  const [loginUser, setloginUser] = useState("");
  const [progress, setprogress] = useState(0)
  

  const getAllPosts = async () => {
    setprogress(10);
    const rowdata = await axios.get(`/getallposts`);
    setPosts(rowdata.data.result.reverse());
    setprogress(100);
  }

  const handleGetname = async ()=>{
    if(!localStorage.getItem("Token")){
      toast.error("Please Login");
      
      return;
    }
    const rowdata =  await axios.get(`/getname`);
    setloginUser(rowdata.data);
  }

  useEffect(() => {
    getAllPosts();
    handleGetname();
  }, [])


  return (
    <div className='relative md:flex md:h-screen '>
    <LoadingBar color='#f11946' progress={progress} onLoaderFinished={()=>{setprogress(0)}} />
      <Footer />
        <div className="bg-zinc-900 text-white py-5 min-h-screen md:w-[35%] overflow-y-scroll md:ml-20 md:px-4 md:py-1">
          <div className="px-4 flex items-center justify-between md:hidden">
            <img className="w-1/4 md:w-[10%] object-cover" src="/logo.png" alt="" />
            <div className="icons -mt-2 flex gap-3 items-center md:hidden">
              <TiHeartOutline className='text-2xl'/>
              <RiMessengerLine className='text-2xl'/>
            </div>
          </div>
          <div className="story px-3 flex gap-3 overflow-auto mt-5">
            <Story url={loginUser.photo}/>
            {loginUser.following?.map((user)=>{
              return <Story key={user._id} url={user.photo}/>
            })}
          </div>


          {posts.length >= 1 ?<div className="posts mb-20 w-full">
            {posts.map((post) => {
              return <Post key={post._id} id={post._id} postuser={post.user}  post={post}/>
            })}
          </div>: <Loader/>}
        </div>

    </div >

  )
}

export default Feed;