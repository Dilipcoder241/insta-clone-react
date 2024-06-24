
import React, { useEffect, useState } from 'react'
import User from '../components/User';
import { CgSearch } from "react-icons/cg";
import Footer from '../components/Footer';
import UserLoader from '../components/UserLoader';



function Search() {
    const [user, setUser] = useState(""); 
    const [allUser, setAllUser] = useState([]);
    const [loginUser, setloginUser] = useState("");

    const handelChange = (e) => {
        setUser(e.target.value);
    }

    const getuser =async(name)=>{
        const rowdata = await fetch(`${import.meta.env.VITE_BACKEND_URL}/search`, {
            method: "POST",
            body: JSON.stringify({
                name:name
            }),
            headers: {
                "Content-type": "application/json; charset=UTF-8",
                "Token": localStorage.getItem("Token")
            }
        })

        let data = await rowdata.json();
        setAllUser(data.user);
        setloginUser(data.loginUser);
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
                {allUser.length>=1 ?<div className="users">
                    {allUser?.map((user , index)=>{
                        return <User key={index} user={user} loginUser={loginUser}/>
                    })}
                </div>: <UserLoader/>}
            </div>

            <Footer />
        </div>

    )
}

export default Search
