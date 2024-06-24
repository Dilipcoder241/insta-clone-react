import React, { useContext, useEffect, useState } from 'react'
import { IoChatbubbleEllipsesOutline } from "react-icons/io5";
import { TfiLocationArrow } from "react-icons/tfi";
import { FiBookmark } from "react-icons/fi";
import { FaHeart } from "react-icons/fa";
import { FaRegHeart } from "react-icons/fa6";
import { toast } from 'react-toastify';
import { IoClose } from "react-icons/io5";
import { IoMdSend } from "react-icons/io";



function Post({ id, username, caption, userPhoto, postUrl , likes , comment }) {
  const [Likes, setLikes] = useState(likes);
  const [commentText, setcommentText] = useState("");
  const [showComment, setShowComment] = useState(false);
  const [comments, setcomments] = useState(comment);
  const [userUrl, setUserUrl] = useState("");


  const handleLike = async (id) => {
    try {
      const rowData = await fetch(`${import.meta.env.VITE_BACKEND_URL}/like/${id}`, {
        method: "POST",
        headers: {
          "Content-type": "application/json; charset=UTF-8",
          "Token": localStorage.getItem("Token")
        }

      })
      const data = await rowData.json();
      setLikes(data.post.likes.length);

    } catch (error) {
      toast.error("not able to like the post");
    }

  }

  const hangleComment = async(id) =>{
    try {
      const rowData = await fetch(`${import.meta.env.VITE_BACKEND_URL}/comment/${id}`, {
        method: "POST",
        body:JSON.stringify({
          text:commentText
        }),
        headers: {
          "Content-type": "application/json; charset=UTF-8",
          "Token": localStorage.getItem("Token")
        }

      })
      const data = await rowData.json();
      setcomments(data.updatedPost.comment);
      setcommentText("");

    } catch (error) {
      toast.error("not able to comment on the post");
    }
  }

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

    setUserUrl(data.photo);
  }

  useEffect(() => {
    handleGetname();
  }, [])
  

  return (
    <div className="post mt-5">
      <div className="title px-2 flex items-center gap-2">
        <div className="w8 rounded-full overflow-hidden">
          <img src={userPhoto} alt="img" className="object-cover h-full w-full" />
        </div>
        <h4 className="text-sm px-2">{username}</h4>
        <h6 className="text-xs text-zinc-900">1d</h6>
      </div>
      <div className="w-full h50 mt-4 overflow-hidden">
        <img src={postUrl} alt="img" className='object-cover object-center w-full h-full' />
      </div>
      <div className="options w-full px-2 flex justify-between items-center text-[1.4rem]">
        <div className="flex gap-3 mt-2">
          {Likes >= 1 ? <FaHeart onClick={() => handleLike(id)} className='text-red-600' /> : <FaRegHeart onClick={() => handleLike(id)} />}
          <IoChatbubbleEllipsesOutline onClick={()=>setShowComment(true)}/>
          <TfiLocationArrow className='rotate-90' />

        </div>
        <FiBookmark />

      </div>
      <h3 className="px-2 mt-2 text-sm leading-none tracking-tight">{Likes} likes</h3>
      <h2 className="text-slate-400 font-light text-sm "><span className="font-semibold px-2 text-white">{username}</span>{caption}.</h2>

      <button className='px-2 mt-2 text-zinc-500 ' onClick={()=>setShowComment(true)}> <p>View {comments.length>=1?comments.length:""} All Comments</p></button>



       {/* comment section */}
       <div>
        {showComment && <div className='w-screen h-screen fixed bottom-0 left-0 bg-black bg-opacity-70 z-20'>
            <div className='h-[70vh] w-full bg-zinc-900 fixed bottom-0 left-0 text-white border-t-2 rounded-tl-2xl rounded-tr-2xl z-30'>
                <div className='h-1 w-[12%] bg-white rounded-xl mt-2 mx-auto'></div>
                <div className='flex justify-center items-center mt-4 text-slate-400 text-sm'>
                    <h1>Comments</h1>
                </div>
                <IoClose className='text-3xl absolute top-0 right-0' onClick={()=>setShowComment(false)}/>

                <div className="comments mt-4 p-2 flex flex-col gap-4 h-[74%] overflow-y-scroll ">
                  {comments.length>=1?comments.map((comment)=>{
                    return <div key={comment._id} className='flex gap-2'>
                        <div className='rounded-full w-[12vw] h-[12vw] overflow-hidden'>
                          <img src={comment.user.photo} alt="user" className='w-full h-full object-cover'/>
                        </div>
                        <div className='leading-tight'>
                            <h1>{comment.user.username}</h1>
                            <h1 className='text-sm leading-tight opacity-50'>{comment.text}</h1>
                        </div>
                    </div>
                  }): <h1 className='font-bold text-center'>Be the First To Comment On This Post</h1>}
                </div>

                <div className='sendComment bg-red-20 p-2 flex gap-3 fixed bottom-0 left-0 w-full'>
                  <div className='bg-green-600 rounded-full w-[11vw] h-[11vw] overflow-hidden flex-shrink-0'>
                    <img src={userUrl} alt="user" className='w-full h-full object-cover'/>
                  </div>
                  <input type="text" placeholder='Add a comment' className='bg-transparent w-[75%] outline-none' onChange={(e)=>{setcommentText(e.target.value)}}/>
                  <button className='text-2xl text-blue-500 p-2' onClick={()=>hangleComment(id)}><IoMdSend/></button>
                </div>
            </div>
        </div>}
        </div> 
    </div>
  )
}

export default Post
