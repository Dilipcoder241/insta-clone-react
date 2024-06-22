
import { Link , useNavigate } from 'react-router-dom';
import React, { useEffect, useRef, useState } from 'react';
import { BsFillImageFill } from "react-icons/bs";
import { RiArrowLeftSLine , RiHome5Line } from "react-icons/ri";
import { toast } from 'react-toastify';



function PostuploadEdit({heading , type}) {
  const [username, setusername] = useState("");
  const [name, setname] = useState("");
  const [bio, setbio] = useState("");
  const [caption, setcaption] = useState("");
  const [postfile , setpostfile] = useState();
  const [userfile , setuserfile] = useState();
  const router = useNavigate();
  const postphoto = useRef(null);
  const userphoto = useRef(null);

  const handleGetname = async ()=>{
    const rowdata =  await fetch(`${import.meta.env.VITE_BACKEND_URL}/getname`, {
      method: "GET",
      headers: {
        "Content-type": "application/json; charset=UTF-8",
        "Token": localStorage.getItem("Token")
      }
      
    })
    const data = await rowdata.json();
    setusername(data.username);
  }

  

  useEffect(() => {
    handleGetname();
  }, [])

  const onclickUploadPhoto= ()=>{
    postphoto.current.click();
  }

  const onclickEditPhoto = () =>{
    userphoto.current.click();
  }

  const handleSubmitEdit = async (e)=>{
    e.preventDefault();
    
    const formData = new FormData();
    formData.append("file", userfile);
    formData.append("username", username);
    formData.append("name", name);
    formData.append("bio", bio);
    const rowdata =  await fetch(`${import.meta.env.VITE_BACKEND_URL}/edit`, {
      method: "POST",
      body: formData,
      headers: {
        "Token": localStorage.getItem("Token")
      }
      
    })
    const data = await rowdata.json();
    if(data.success){
      toast.success(data.msg, { position: "bottom-center", theme: "dark" });
    }
    else{
      toast.error(data.msg, { position: "bottom-center", theme: "dark"});
    }
    router(`/profile/${username}`)

  }


  const handleSubmitUpdate = async(e)=>{
    e.preventDefault();
    const formData = new FormData();
    formData.append("file", postfile);
    formData.append("caption", caption);
    const rowdata =  await fetch(`${import.meta.env.VITE_BACKEND_URL}/upload`, {
      method: "POST",
      body: formData,
      headers: {
        "Token": localStorage.getItem("Token")
      }
      
    })
    const data = await rowdata.json();
    console.log(data)
    router(`/profile/${username}`)
  }

  return (
    <div className="w-full min-h-screen bg-zinc-900 text-white py-5">
    <div className="flex justify-between items-center px-4">
      <button className="text-sm text-blue-500 flex justify-center" onClick={()=>{router(`/profile/${username}`)}} ><RiArrowLeftSLine /> profile</button>
      <h2 className="leading-none text-sm">{heading}</h2>
      <Link className="text-sm flex gap-1 justify-center" to="/feed"><RiHome5Line /> home</Link>
    </div>
    <div className="flex flex-col items-center gap-2 mt-20">
      <div className="image w-[25vw] h-[25vw] rounded-full border-2 border-zinc-800 flex items-center justify-center">
        <BsFillImageFill className='text-5xl'/>
      </div>
      <button id="selectpic" className="text-blue-500 capitalize" onClick={type=="upload"?onclickUploadPhoto:onclickEditPhoto}>select picture</button>
    </div>
    {type=="upload"?<form id="uploadform" onSubmit={handleSubmitUpdate} className="w-full px-6 py-3 mt-10" encType="multipart/form-data">
        <input ref={postphoto} hidden type="file" name="image" onChange={(e)=>{setpostfile(e.target.files[0])}} />
        <textarea className="px-2 py-1 w-full bg-zinc-900 border-2 h-20 border-zinc-800 resize-none rounded-md outline-none" placeholder="Write a caption..." onChange={(e)=>{setcaption(e.target.value)}}></textarea>
        <input className="w-full px-2 py-2 bg-blue-500 rounded-md" type="submit" value="Post"/>
    </form>:<form className="w-full px-6 py-3" onSubmit={handleSubmitEdit}>
        <input ref={userphoto} type="file" name="photo" hidden onChange={(e)=>{setuserfile(e.target.files[0])}}/>
        <input className="px-3 mt-2 py-2 border-2 border-zinc-800 rounded-md block w-full bg-zinc-900" type="text" placeholder="username" name="username" value={username} onChange={(e)=>{setusername(e.target.value)}}/>
        <input className="px-3 mt-2 py-2 border-2 border-zinc-800 rounded-md block w-full bg-zinc-900" type="text" placeholder="name" name="name" value={name} onChange={(e)=>{setname(e.target.value)}}/>
        <textarea className="px-3 mt-2 py-2 border-2 border-zinc-800 rounded-md block w-full bg-zinc-900 resize-none" placeholder="Bio" value={bio} onChange={(e)=>{setbio(e.target.value)}}></textarea>
        <input className="w-full bg-blue-500 px-3 py-3 rounded-md mt-2" type="submit" value="Update Details"/>
      </form>}
  </div>
  )
}

export default PostuploadEdit
