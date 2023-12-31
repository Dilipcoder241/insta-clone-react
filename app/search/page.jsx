'use client'

import React, { useEffect, useState } from 'react'
import User from '../(componente)/User';
import { CgSearch } from "react-icons/cg";
import Footer from '../(componente)/Footer';



function Page() {
    const [user, setUser] = useState(""); 
    const [allUser, setAllUser] = useState([])

    const handelChange = (e) => {
        setUser(e.target.value);
    }

    const getuser =async(name)=>{
        const rowdata = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/search`, {
            method: "POST",
            body: JSON.stringify({
                name:name
            }),
            headers: {
                "Content-type": "application/json; charset=UTF-8"
            }
        })

        let data = await rowdata.json();
        setAllUser(data.user);
    }

    useEffect(() => {
        getuser(user)
    }, [user])
    

    return (
        <div className='relative'>

            <div className="w-full min-h-screen bg-zinc-900 px-4 py-5">
                <div className="border-2 border-zinc-800 flex items-center gap-1 px-2 py-1 rounded-md">
                    <CgSearch className='text-white ' />
                    <input onChange={handelChange} className="ml-1 w-full bg-zinc-900 outline-none text-zinc-400" type="text" placeholder="search username" />
                </div>
                <div className="users">
                    {allUser.map((user , index)=>{
                        return <User key={index} username={user.username} name={user.name} userphoto={user.photo}/>
                    })}
                </div>
            </div>

            <Footer />
        </div>

    )
}

export default Page
