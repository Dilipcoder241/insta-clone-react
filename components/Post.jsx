import React, { useState } from 'react'
import { IoChatbubbleEllipsesOutline } from "react-icons/io5";
import { TfiLocationArrow } from "react-icons/tfi";
import { FiBookmark } from "react-icons/fi";
import { FaHeart } from "react-icons/fa";
import { FaRegHeart } from "react-icons/fa6";
import { toast } from 'react-toastify';



function Post({ id, username, caption, userPhoto, postUrl , likes }) {
  const [Likes, setLikes] = useState(likes);

  const handleLike = async (id) => {
    try {
      const rowData = await fetch(`${import.meta.env.VITE_BACKEND_URL}/like/${id}`, {
        method: "POST",
        headers: {
          "Content-type": "application/json; charset=UTF-8",
          "Token": localStorage.getItem("Token")
        }

      })
      const data = await rowData.json();
      setLikes(data.post.likes.length);

    } catch (error) {
      toast.error("not able to like the post");
    }

  }

  return (
    <div className="post mt-5">
      <div className="title px-2 flex items-center gap-2">
        <div className="w8 rounded-full overflow-hidden">
          <img src={userPhoto} alt="img" className="object-cover h-full w-full" />
        </div>
        <h4 className="text-sm px-2">{username}</h4>
        <h6 className="text-xs text-zinc-900">1d</h6>
      </div>
      <div className="w-full h50 mt-4 overflow-hidden">
        <img src={postUrl} alt="img" className='object-cover object-center w-full h-full' />
      </div>
      <div className="options w-full px-2 flex justify-between items-center text-[1.4rem]">
        <div className="flex gap-3 mt-2">
          {Likes >= 1 ? <FaHeart onClick={() => handleLike(id)} className='text-red-600' /> : <FaRegHeart onClick={() => handleLike(id)} />}
          <IoChatbubbleEllipsesOutline />
          <TfiLocationArrow className='rotate-90' />

        </div>
        <FiBookmark />

      </div>
      <h3 className="px-2 mt-2 text-sm leading-none tracking-tight">{Likes} likes</h3>
      <h2 className="text-slate-400 font-light text-sm "><span className="font-semibold px-2 text-white">{username}</span>{caption}.</h2>
    </div>
  )
}

export default Post
