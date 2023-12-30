'use client'

import React from 'react'
import { TiHeartOutline } from "react-icons/ti";
import { IoChatbubbleEllipsesOutline } from "react-icons/io5";
import { TfiLocationArrow } from "react-icons/tfi";
import { FiBookmark } from "react-icons/fi";




function Post({username, caption, likes , userPhoto , postUrl}) {
  return (
    <div className="post mt-10 w-full min-h-[50vh]">
        <div className="title px-2 flex items-center gap-2">
          <div className="w-[8vw] h-[8vw] rounded-full overflow-hidden">
            <img src={userPhoto} alt="" className='object-cover'/>
          </div>
          <h4 className="text-sm">{username}</h4>
          <h6 className="text-xs opacity-30">1d</h6>
        </div>
        <div className="w-full h-96 mt-4 overflow-hidden">
          <img src={postUrl} alt="" className='object-cover w-full h-full'/>
        </div>
        <div className="options w-full px-2 flex justify-between items-center text-[1.4rem]">
          <div className="flex gap-3 mt-2">
          <TiHeartOutline />
          <IoChatbubbleEllipsesOutline />
          <TfiLocationArrow  className='rotate-90'/>

          </div>
          <FiBookmark />

        </div>
        <h3 className="px-2 mt-2 text-sm leading-none tracking-tight">{likes} likes</h3>
        <h2 className="text-white font-light text-sm mt-2"><span className="font-semibold pl-2 pr-2">{username}</span>{caption}.</h2>
      </div>
  )
}

export default Post
