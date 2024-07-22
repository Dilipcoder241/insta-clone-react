import React, { useEffect, useState } from 'react'
import ProfilePost from '../components/ProfilePost'
import Footer from '../components/Footer';
import { RiMenu3Line } from "react-icons/ri";
import { RiAddBoxLine } from "react-icons/ri";
import { Link, useParams } from 'react-router-dom';
import LoadingBar from 'react-top-loading-bar';
import axios from "../Utils/axios";




function Profile() {
  const { username } = useParams();
  const [userdata, setUserdata] = useState({});
  const [posts, setPosts] = useState([]);
  const [userphoto, setUserphoto] = useState("");
  const [progress, setprogress] = useState(0);

  const dataget = async () => {
    setprogress(10);
    const {data} = await axios.get(`/profile/${username}`);
  
    setprogress(100);
    setUserdata(data);
    setPosts(data.posts.reverse());
    setUserphoto(data.photo)
  }


  
  useEffect(() => {
    dataget();
  }, [userphoto])



  return (
    <div className='relative md:flex'>
    <LoadingBar color='#f11946' progress={progress} onLoaderFinished={()=>{setprogress(0)}} />
      <Footer />
      <div className="w-full md:w-[80%] h-screen bg-zinc-900 text-white py-2 overflow-y-scroll">
        <div className="nav flex justify-between items-center px-4">
          <h3 className="text-md">{userdata.username}</h3>
          <div className="icons flex gap-5 items-center md:hidden">
            <Link to="/upload"><RiAddBoxLine className="text-[1.4rem] ri-add-box-line" /></Link>
            <RiMenu3Line />
          </div>
        </div>
        <div className="flex justify-between items-center pl-6 pr-[12vw] mt-8">
          <div className="w-[20vw] h-[20vw] md:w-[10vw] md:h-[10vw] rounded-full overflow-hidden border-2">
            <img src={userphoto || "/user.png"} alt="" className='object-cover object-center w-full h-full' />
          </div>
          <div className="stats flex gap-5 items-center justify-between">
            <div className="flex flex-col items-center justify-center">
              <h3>{posts.length}</h3>
              <h4>Posts</h4>
            </div>
            <div className="flex flex-col items-center justify-center">
              <h3>{userdata.followers?.length || 0}</h3>
              <h4>Followers</h4>
            </div>
            <div className="flex flex-col items-center justify-center">
              <h3>{userdata.following?.length || 0}</h3>
              <h4>Following</h4>
            </div>
          </div>
        </div>
        <div className="dets px-6 mt-5">
          <h3 className="text-md mb-1">{userdata.name}</h3>
          <p className="text-xs tracking-tight opacity-50">{userdata.bio}.</p>
        </div>
        <div className="px-6 mt-5 ">
          <Link className="px-3 py-2 bg-zinc-800 text-xs rounded-md" to="/edit">Edit Profile</Link>
        </div>

        {posts.length>=1 ? <div className="posts w-full flex gap-1 py-2 mt-5 flex-wrap">
          {posts.map((post) => {
            return <ProfilePost key={post._id} post={post} user={userdata} loginUser={userdata}/>
          })}
        </div> : <h1 className='m-10 '>no post to show</h1>}

        
      </div>
    </div>
  )
}

export default Profile
