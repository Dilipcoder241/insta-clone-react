import React , { useState } from 'react'
import { TiHeartOutline } from "react-icons/ti";
import { IoChatbubbleEllipsesOutline } from "react-icons/io5";
import { TfiLocationArrow } from "react-icons/tfi";
import { FiBookmark } from "react-icons/fi";



function Post({username, caption, likes , userPhoto , postUrl}) {
  
  const [PostUrlString, setPostUrlString] = useState("")
  const [UserUrlString, setUserUrlString] = useState("")

  const Post = new Uint8Array(postUrl);
  const Postb = new Blob([Post], { type: 'image/jpeg' });
  const Postreader = new FileReader();
  Postreader.readAsDataURL(Postb);
  Postreader.onload = () => {
    setPostUrlString(Postreader.result);
  };

  const User = new Uint8Array(userPhoto);
  const Userb = new Blob([User], { type: 'image/jpeg' });
  const Userreader = new FileReader();
  Userreader.readAsDataURL(Userb);
  Userreader.onload = () => {
    setUserUrlString(Userreader.result);
  };


  return (
    <div className="post mt-5">
        <div className="title px-2 flex items-center gap-2">
          <div className="w8 rounded-full overflow-hidden">
            <img src={UserUrlString} alt="img" className="object-cover h-full w-full"/>
          </div>
          <h4 className="text-sm px-2">{username}</h4>
          <h6 className="text-xs text-zinc-900">1d</h6>
        </div>
        <div className="w-full h50 mt-4 overflow-hidden">
          <img src={PostUrlString} alt="img" className='object-cover object-center w-full h-full'/>
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
        <h2 className="text-slate-400 font-light text-sm "><span className="font-semibold px-2 text-white">{username}</span>{caption}.</h2>
      </div>
  )
}

export default Post
