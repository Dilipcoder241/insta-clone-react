'use client'
import Image from 'next/image';
import Link from 'next/link'
import { useRouter } from 'next/navigation';
import React, { useState } from 'react'

function Page() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  const handleSubmit = async (e) =>{
    e.preventDefault()
    const rowdata =  await fetch("http://localhost:9000/register", {
      method: "POST",
      body: JSON.stringify({
        username:username,
        email:email,
        name:name,
        password:password
      }),
      headers: {
        "Content-type": "application/json; charset=UTF-8"
      }
    })

    let data = await rowdata.json();
    if(data.success){
      router.push(`/profile/${username}`);
    }

  }
  return (
    <div className="w-full min-h-screen bg-zinc-900 text-white py-5 flex flex-col items-center justify-center">
    <div className="flex flex-col items-center gap-5 px-4">
      <Image width='70' height='70' className="w-1/2" src="/logo.png" alt=""/>
      <form className="w-full" onSubmit={handleSubmit}>
        <input className="px-3 mt-2 py-2 border-2 border-zinc-800 rounded-md block w-full bg-zinc-900" type="text" placeholder="username" name="username" value={username} onChange={(e)=>{setUsername(e.target.value)}}/>
        <input className="px-3 mt-2 py-2 border-2 border-zinc-800 rounded-md block w-full bg-zinc-900" type="email" placeholder="email" name="email" value={email} onChange={(e)=>{setEmail(e.target.value)}}/>
        <input className="px-3 mt-2 py-2 border-2 border-zinc-800 rounded-md block w-full bg-zinc-900" type="text" placeholder="name" name="name" value={name} onChange={(e)=>{setName(e.target.value)}}/>
        <input className="px-3 mt-2 py-2 border-2 border-zinc-800 rounded-md block w-full bg-zinc-900" type="password" placeholder="password" name="password" value={password} onChange={(e)=>{setPassword(e.target.value)}}/>
        <input className="w-full bg-blue-500 px-3 py-3 rounded-md mt-2" type="submit" value="Make New Account"/>
      </form>
      <span>Already have an account ? <Link href="/login" className="text-blue-500">Log In</Link></span>
    </div>
  </div>
  )
}

export default Page
