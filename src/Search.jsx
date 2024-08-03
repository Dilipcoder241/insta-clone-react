import React, { useEffect, useState } from 'react'
import User from '../components/User';
import { CgSearch } from "react-icons/cg";
import Footer from '../components/Footer';
import UserLoader from '../components/UserLoader';
import LoadingBar from 'react-top-loading-bar';
import axios from "../Utils/axios";




function Search() {
    const [user, setUser] = useState(""); 
    const [allUser, setAllUser] = useState([]);
    const [loginUser, setloginUser] = useState("");
    const [progress, setprogress] = useState(0);

    const handelChange = (e) => {
        setUser(e.target.value);
    }

    const getuser =async(name)=>{
        setprogress(10);
        const body  = {
            name
        }
        const {data} = await axios.post(`/search`, body);

        setprogress(100);
        setAllUser(data.user);
        setloginUser(data.loginUser);
    }

    useEffect(() => {
        getuser(user)
    }, [user])
    

    return (
        <div className='relative flex'>
    <LoadingBar color='#f11946' progress={progress} onLoaderFinished={()=>{setprogress(0)}} />
            <Footer />
            <div className="w-full min-h-screen bg-zinc-900 px-4 py-5 md:w-[30%]">
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
        </div>

    )
}

export default Search
