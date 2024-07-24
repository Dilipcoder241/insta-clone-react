import React, { useContext, useEffect, useState } from 'react'
import { IoChatbubbleEllipsesOutline } from "react-icons/io5";
import { TfiLocationArrow } from "react-icons/tfi";
import { FiBookmark } from "react-icons/fi";
import { FaHeart } from "react-icons/fa";
import { FaRegHeart } from "react-icons/fa6";
import Comment from './Comment';
import { Link } from 'react-router-dom';
import axios from "../Utils/axios"
import { toast } from 'react-toastify';



function Post({ id, postuser,post }) {
  const [Likes, setLikes] = useState(post.likes.length);
  const [isLiked, setisLiked] = useState(null);
  const [showComment, setShowComment] = useState(false);
  const [user, setUser] = useState("");

  const handleLike = async (id) => {
    try {
      if(!localStorage.getItem("Token")){
        toast.error("Please Login");
        return;
      }
      const {data} = await axios.post(`/like/${id}`);
      setLikes(data.post.likes.length);
      setisLiked(data.post.likes.indexOf(user._id)>=0);
    } catch (error) {
      toast.error("not able to like the post");
    }

  }


  const handleGetname = async ()=>{
    if(!localStorage.getItem("Token")){
      toast.error("Please Login");
      return;
    }

    const {data} =  await axios.get(`/getname`);
    setUser(data);
    setisLiked(post.likes.indexOf(data._id)>=0);
  }

  useEffect(() => {
    handleGetname();
  }, [])
  

  return (
    <div className="post mt-5">
      <div className="title px-2 flex items-center gap-2">
        <div className="w-[8vw] h-[8vw] md:w-[2.5vw] md:h-[2.5vw] rounded-full overflow-hidden">
          <img src={postuser.photo || "/user.png"} alt="img" className="object-cover h-full w-full"/>
        </div>
        <Link className="text-sm px-2" to={user._id == postuser._id ?`/profile/${user.username}`:`/user/${postuser._id}`}>{postuser.username}</Link>
        <h6 className="text-xs text-zinc-900">1d</h6>
      </div>
      <div className="w-full h-[50vh] md:h-[60vh] mt-4 overflow-hidden">
        <img src={post.image} alt="img" className='object-cover object-center w-full h-full' />
      </div>
      <div className="options w-full px-2 flex justify-between items-center text-[1.4rem]">
        <div className="flex gap-3 mt-2">
          {isLiked ? <FaHeart onClick={() => handleLike(id)} className='text-red-600' /> : <FaRegHeart onClick={() => handleLike(id)} />}
          <IoChatbubbleEllipsesOutline onClick={()=>setShowComment(true)}/>
          <TfiLocationArrow className='rotate-90'/>

        </div>
        <FiBookmark />

      </div>
      <h3 className="px-2 mt-2 text-sm leading-none tracking-tight">{Likes} likes</h3>
      <h2 className="text-slate-400 font-light text-sm "><span className="font-semibold px-2 text-white">{postuser.username}</span>{post.caption}.</h2>

      <button className='px-2 mt-2 text-zinc-500 ' onClick={()=>setShowComment(true)}> <p>View all {post.comment.length>=1?post.comment.length:""} comments</p></button>



       {/* comment section */}
       <div>
        {showComment && <Comment setShowComment={setShowComment} post={post} loginUser={user} user={user}/>}
        </div> 
    </div>
  )
}

export default Post;
