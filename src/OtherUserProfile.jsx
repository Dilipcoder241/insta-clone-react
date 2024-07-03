import React, { useEffect, useState } from 'react'
import { RiMenu3Line } from 'react-icons/ri'
import { Link, useNavigate, useParams } from 'react-router-dom'
import Footer from '../components/Footer';
import ProfilePost from '../components/ProfilePost';

function OtherUserProfile() {
    const { id } = useParams();
    const [user, setUser] = useState("");
    const [loginUser, setloginUser] = useState("");
    const navigate = useNavigate();
    const [followBtnText, setFollowBtnText] = useState("Follow");
    const [NoOfFollowers, setNoOfFollowers] = useState(0);
    const [NoOfFolloing, setNoOfFolloing] = useState(0);


    const handleGetname = async ()=>{
        if(!localStorage.getItem("Token")){
          toast.error("Please Login");
          return;
        }
    
        const rowdata =  await fetch(`${import.meta.env.VITE_BACKEND_URL}/getname`, {
          method: "GET",
          headers: {
            "Content-type": "application/json; charset=UTF-8",
            "Token": localStorage.getItem("Token")
          }
          
        })
        const data = await rowdata.json();
    
        setloginUser(data);
      }

    const dataget = async () => {
        const data = await fetch(`${import.meta.env.VITE_BACKEND_URL}/user/${id}`, {
            method: "GET",
            headers: {
                "Content-type": "application/json; charset=UTF-8",
                "Token": localStorage.getItem("Token")
            }

        })
        const jdata = await data.json();
        setUser(jdata.user);
        setNoOfFollowers(jdata.user?.followers.length);
        setNoOfFolloing(jdata.user?.following.length);


       
    }


    const handleFollow = async (id) =>{
        const data = await fetch(`${import.meta.env.VITE_BACKEND_URL}/follow/${id}`, {
            method: "POST",
            headers: {
                "Content-type": "application/json; charset=UTF-8",
                "Token": localStorage.getItem("Token")
            }

        })
        const jdata = await data.json();
        console.log(jdata);
        setFollowBtnText((prev)=>prev=="Follow"?"Unfollow":"Follow");
        setNoOfFollowers((prev)=>followBtnText=="Follow"?prev+1:prev-1);
    }


    useEffect(() => {
        handleGetname();
        dataget();
    }, [])


    useEffect(() => {
        if(user && loginUser){
            if(user.followers?.indexOf(loginUser._id)== -1){
                setFollowBtnText("Follow");
            }
            else{
                setFollowBtnText("Unfollow");
            }
        }
    }, [user , loginUser])



    return (
        <div className='relative md:flex'>
            <Footer />
            <div className="w-full md:w-[80%] min-h-screen bg-zinc-900 text-white py-2 overflow-y-scroll">
                <div className="nav flex justify-between items-center px-4">
                    <h3 className="text-lg">{user.username}</h3>
                    <div className="icons flex gap-5 items-center md:hidden">
                        <RiMenu3Line />
                    </div>
                </div>
                <div className="flex justify-between items-center pl-6 pr-[12vw] mt-8">
                    <div className="w-[20vw] h-[20vw] md:w-[10vw] md:h-[10vw] rounded-full overflow-hidden border-2">
                        <img src={user.photo} alt="" className='object-cover object-center w-full h-full' />
                    </div>
                    <div className="stats flex gap-5 items-center justify-between">
                        <div className="flex flex-col items-center justify-center">
                            <h3>{user.posts?.length || 0}</h3>
                            <h4>Posts</h4>
                        </div>
                        <div className="flex flex-col items-center justify-center">
                            <h3>{NoOfFollowers || 0}</h3>
                            <h4>Followers</h4>
                        </div>
                        <div className="flex flex-col items-center justify-center">
                            <h3>{NoOfFolloing || 0}</h3>
                            <h4>Following</h4>
                        </div>
                    </div>
                </div>
                <div className="dets px-6 mt-5">
                    <h3 className="text-lg mb-1">{user.name}</h3>
                    <p className="text-xs tracking-tight opacity-50">{user.bio}.</p>
                </div>
                <div className="px-6 mt-5 flex gap-2">
                    <button className="px-6 py-2 rounded-md bg-blue-500" onClick={()=>{handleFollow(user._id)}}>{followBtnText}</button>
                    <Link className="px-6 py-2 rounded-md bg-zinc-500">Message</Link>
                </div>

                {user.posts?.length >= 1 ? <div className="posts w-full flex gap-1 py-2 mt-5 flex-wrap">
                    {user.posts.map((post) => {
                        return <ProfilePost key={post._id} url={post.image} post={post} user={user} loginUser={loginUser}/>
                    })}
                </div> : <h1 className='m-10 '>no post to show</h1>}


            </div>
        </div>
    )
}

export default OtherUserProfile