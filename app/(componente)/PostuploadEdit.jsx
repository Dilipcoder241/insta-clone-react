'use client'
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react';
import { BsFillImageFill } from "react-icons/bs";
import { RiArrowLeftSLine , RiHome5Line } from "react-icons/ri";



function PostuploadEdit({heading , type}) {
  const [username, setusername] = useState("");
  const [name, setname] = useState("");
  const [bio, setbio] = useState("");
  const [caption, setcaption] = useState("");
  const router = useRouter();


  const handleSubmitEdit = async (e)=>{
    e.preventDefault();
    const rowdata =  await fetch("http://localhost:9000/edit", {
      method: "POST",
      body: JSON.stringify({
        username:username,
        name:name,
        bio:bio
      }),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
        "Token": localStorage.getItem("Token")
      }
      
    })
    const data = rowdata.json();
    router.push(`profile/${username}`)

  }


  return (
    <div className="w-full min-h-screen bg-zinc-900 text-white py-5">
    <div className="flex justify-between items-center px-4">
      <Link className="text-sm text-blue-500 flex justify-center" href="/profile"><RiArrowLeftSLine /> profile</Link>
      <h2 className="leading-none text-sm">{heading}</h2>
      <Link className="text-sm flex gap-1 justify-center" href="/feed"><RiHome5Line /> home</Link>
    </div>
    <div className="flex flex-col items-center gap-2 mt-20">
      <div className="image w-[25vw] h-[25vw] rounded-full border-2 border-zinc-800 flex items-center justify-center">
        <BsFillImageFill className='text-5xl'/>
      </div>
      <button id="selectpic" className="text-blue-500 capitalize">select picture</button>
    </div>
    {type=="upload"?<form id="uploadform" action="/upload" className="w-full px-6 py-3 mt-10" enctype="multipart/form-data" method="post">
        <input hidden type="file" name="image"/>
        <textarea className="px-2 py-1 w-full bg-zinc-900 border-2 h-20 border-zinc-800 resize-none rounded-md outline-none" placeholder="Write a caption..." onChange={(e)=>{setcaption(e.target.value)}}></textarea>
        <input className="w-full px-2 py-2 bg-blue-500 rounded-md" type="submit" value="Post"/>
    </form>:<form className="w-full px-6 py-3" onSubmit={handleSubmitEdit}>
        <input className="px-3 mt-2 py-2 border-2 border-zinc-800 rounded-md block w-full bg-zinc-900" type="text" placeholder="username" name="username" value={username} onChange={(e)=>{setusername(e.target.value)}}/>
        <input className="px-3 mt-2 py-2 border-2 border-zinc-800 rounded-md block w-full bg-zinc-900" type="text" placeholder="name" name="name" value={name} onChange={(e)=>{setname(e.target.value)}}/>
        <textarea className="px-3 mt-2 py-2 border-2 border-zinc-800 rounded-md block w-full bg-zinc-900 resize-none" placeholder="Bio" value={bio} onChange={(e)=>{setbio(e.target.value)}}></textarea>
        <input className="w-full bg-blue-500 px-3 py-3 rounded-md mt-2" type="submit" value="Update Details"/>
      </form>}
  </div>
  )
}

export default PostuploadEdit
