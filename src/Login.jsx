import { Link, useNavigate } from 'react-router-dom';
import React, { useRef, useState } from 'react';
import { toast } from 'react-toastify';
import LoadingBar from 'react-top-loading-bar';
import axios from "../Utils/axios"


function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const router = useNavigate();
  const submitBtn = useRef("");
  const [progress, setprogress] = useState(0);


  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!username || !password) {
      return toast.error("Please Fill All The Fields");
    }
    submitBtn.current.disabled = true;
    setprogress(10);
    const body = {
      username, password
    }
    try {
      const {data} = await axios.post(`/login` , body);
  
      if (data.success) {
        submitBtn.current.disabled = false;
        localStorage.removeItem("Token");
        localStorage.setItem("Token", data.token);
        router(`/profile/${username}`);
        toast.success(data.msg);
      }
      else {
        submitBtn.current.disabled = false;
        toast.error(data.msg);
      }
    } catch (error) {
      toast.error("some internal error");
    }
    finally{
      setprogress(100);
    }
  }

  return (
    <div className="w-full md:w-[30%] md:mx-auto min-h-screen bg-zinc-900 text-white py-5 flex flex-col items-center justify-center">
    <LoadingBar color='#f11946' progress={progress} onLoaderFinished={()=>{setprogress(0)}} />

      <div className="flex flex-col items-center gap-5 px-4">
        <img width='70' height='70' className="w-1/2" src="/logo.png" alt="" />
        <form className="w-full" onSubmit={handleSubmit}>
          <input className="px-3 mt-2 py-2 border-2 border-zinc-800 rounded-md block w-full bg-zinc-900" type="text" placeholder="username" name="username" onChange={(e) => { setUsername(e.target.value) }} />
          <input className="px-3 mt-2 py-2 border-2 border-zinc-800 rounded-md block w-full bg-zinc-900" type="password" placeholder="password" name="password" onChange={(e) => { setPassword(e.target.value) }} />
          <input ref={submitBtn} className="w-full bg-blue-500 px-3 py-3 rounded-md mt-2" type="submit" value="Log In" />
        </form>
        <span>Not have an account yet ? <Link to="/" className="text-blue-500">Sign Up</Link></span>
      </div>
    </div>
  )
}

export default Login
