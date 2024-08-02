
import { Link, useNavigate ,useLocation } from 'react-router-dom';
import React, { useEffect, useRef, useState } from 'react';
import { RiArrowLeftSLine, RiHome5Line } from "react-icons/ri";
import { toast } from 'react-toastify';
import axios from "../Utils/axios";
import LoadingBar from 'react-top-loading-bar';
import { useMyContext } from '../mycontext/context';




function PostuploadEdit({ heading, type }) {
  const location = useLocation();
  const {loginUser}= useMyContext();
  const [username, setusername] = useState(loginUser.username || "");
  const [name, setname] = useState(loginUser.name || "");
  const [bio, setbio] = useState(loginUser.bio || "");
  const [caption, setcaption] = useState("");
  const [postfile, setpostfile] = useState();
  const [userfile, setuserfile] = useState();
  const [src, Setsrc] = useState(location.pathname=="/edit"? loginUser?.photo :"./imageIcon.jpg");
  const router = useNavigate();
  const postphoto = useRef(null);
  const userphoto = useRef(null);
  const submitBtn = useRef("");
  const [progress, setprogress] = useState(0);



  const onclickUploadPhoto = () => {
    postphoto.current.click();
  }

  const onclickEditPhoto = () => {
    userphoto.current.click();
  }

  const uploadToCloud = async (file) => {
    try {
      const data = new FormData();
      data.append("file", file);
      data.append("upload_preset", "instaClone");
      data.append("cloud_name", "instacloud11");
      const rawResult = await fetch("https://api.cloudinary.com/v1_1/instacloud11/image/upload", {
        method: "post",
        body: data
      });
      const result = await rawResult.json();
      return result;
    } catch (error) {
      toast.error("not able to upload your image");
    }
  }

  const handleSubmitEdit = async (e) => {
    e.preventDefault();
    setprogress(30);

    const result = await uploadToCloud(userfile);

    submitBtn.current.disabled = true;
    const body ={
        username: username,
        name: name,
        bio: bio,
        photo: result?.url,
        publicId: result?.public_id,
    }
    const {data} = await axios.post(`/edit`, body);
    
    if (data.success) {
      submitBtn.current.disabled = false;
      toast.success(data.msg);
    }
    else {
      submitBtn.current.disabled = false;
      toast.error(data.msg);
    }
    setprogress(100);
    router(`/profile/${username}`)

  }

  const handleSubmitUpdate = async (e) => {
    e.preventDefault();
    // posting image to cloudinary
    if(!caption){
      return toast.error("Please give Caption for your post");
    }
    const result = await uploadToCloud(postfile);
    if(result.error){
      toast.error("not able to upload Post");
      return;
    }
    submitBtn.current.disabled = true;
    setprogress(30);

    const body = {
      caption,
      image: result?.url,
      publicId: result?.public_id
    }
    const {data} = await axios.post(`/upload`,body);
    if (data.success) {
      submitBtn.current.disabled = false;
      toast.success(data.msg);
    }
    else {
      submitBtn.current.disabled = false;
      toast.error(data.msg);
    }
    setprogress(100);
    router(`/profile/${username}`);

  }

  return (
    <div className="w-full min-h-screen bg-zinc-900 text-white py-5">
    <LoadingBar color='#f11946' progress={progress} onLoaderFinished={()=>{setprogress(0)}} />
      <div className="md:justify-center flex justify-between items-center px-4">
        <button className="text-sm text-blue-500 flex justify-center items-center " onClick={() => { router(`/profile/${username}`) }} ><RiArrowLeftSLine />profile</button>
        <h2 className="leading-none text-sm">{heading}</h2>
        <Link className="text-sm flex gap-1 justify-center items-center " to="/feed"><RiHome5Line /> home</Link>
      </div>

      <div className="flex flex-col items-center gap-2 mt-5">
        <div className="image w-[60vw] h-[60vw] md:w-[22vw] md:h-[22vw] rounded-lg overflow-hidden border-2 border-zinc-700 flex items-center justify-center">
          <img src={src} className='object-cover object-center h-full w-full' />
        </div>
        <button id="selectpic" className="text-blue-500 capitalize cursor-pointer" onClick={type == "upload" ? onclickUploadPhoto : onclickEditPhoto}>select picture</button>
      </div>

      {type == "upload" ?
        <form id="uploadform" onSubmit={handleSubmitUpdate} className="w-full md:w-[35%] mx-auto px-6 py-3 mt-10" encType="multipart/form-data">
          <input ref={postphoto} hidden type="file" name="image" onChange={(e) => { setpostfile(e.target.files[0]); Setsrc(URL.createObjectURL(e.target.files[0])) }} />
          <textarea className="px-2 py-1 w-full bg-zinc-900 border-2 h-20 border-zinc-800 resize-none rounded-md outline-none" placeholder="Write a caption..." onChange={(e) => { setcaption(e.target.value) }}></textarea>
          <input ref={submitBtn} className="w-full px-2 py-2 bg-blue-500 rounded-md" type="submit" value="Post" />
        </form> :
        <form className="w-full md:w-[35%] mx-auto px-6 py-3" onSubmit={handleSubmitEdit}>
          <input ref={userphoto} type="file" name="photo" hidden onChange={(e) => { setuserfile(e.target.files[0]); Setsrc(URL.createObjectURL(e.target.files[0])) }} />
          <input className="px-3 mt-2 py-2 border-2 border-zinc-800 rounded-md block w-full bg-zinc-900" type="text" placeholder="username" name="username" value={username} onChange={(e) => { setusername(e.target.value) }} />
          <input className="px-3 mt-2 py-2 border-2 border-zinc-800 rounded-md block w-full bg-zinc-900" type="text" placeholder="name" name="name" value={name} onChange={(e) => { setname(e.target.value) }} />
          <textarea className="px-3 mt-2 py-2 border-2 border-zinc-800 rounded-md block w-full bg-zinc-900 resize-none" placeholder="Bio" value={bio} onChange={(e) => { setbio(e.target.value) }}></textarea>
          <input ref={submitBtn} className="w-full bg-blue-500 px-3 py-3 rounded-md mt-2" type="submit" value="Update Details" />
        </form>}
    </div>
  )
}

export default PostuploadEdit
