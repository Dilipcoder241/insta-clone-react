import React, { useRef, useState } from 'react'
import { FaHeart, FaRegHeart } from 'react-icons/fa6';
import { FiBookmark } from 'react-icons/fi';
import { IoMdSend } from 'react-icons/io';
import { IoChatbubbleEllipsesOutline, IoClose } from 'react-icons/io5';
import { RiDeleteBin6Line } from 'react-icons/ri';
import { TfiLocationArrow } from 'react-icons/tfi';
import { toast } from 'react-toastify';
import axios from "../Utils/axios"


function Comment({ setShowComment, post, loginUser, user  }) {
  const [Likes, setLikes] = useState(post.likes.length);
  const [isLiked, setisLiked] = useState(post.likes.indexOf(loginUser._id)>=0);
  const [comments, setcomments] = useState(post.comment);
  const [commentText, setcommentText] = useState("");
  const submitBtn = useRef("");

  const handleComment = async (id) => {
    if (!commentText) {
      return toast.error("Please Write A Comment First");
    }

    try {
      submitBtn.current.disabled = true;
      const body = {
        text:commentText
      }
      const {data} = await axios.post(`/comment/${id}`,body)
      setcomments(data.updatedPost.comment);
      setcommentText("");
      submitBtn.current.disabled = false;

    } catch (error) {
      submitBtn.current.disabled = false;
      toast.error("not able to comment on the post");
    }
  }

  const handleLike = async (id) => {
    try {
      const {data} = await axios.post(`/like/${id}`);
      setLikes(data.post.likes.length);
      setisLiked(data.post.likes.indexOf(loginUser._id)>=0);

    } catch (error) {
      toast.error("not able to like the post");
    }

  }

  const handleDelete = async (id) => {
    try {
        const {data} = await axios.post(`/delete/${id}`);
        console.log(data);
        if (data.success) {
            toast.success(data.msg);
            setShowComment(false);    
        }
        else {
            toast.error(data.msg);
        }

    } catch (error) {
        toast.error("not able to delete the post");
    }
}

  return (
    <>
      <div className='w-screen h-screen fixed bottom-0 left-0 bg-black bg-opacity-70 z-20 md:hidden'>
        <div className='h-[70vh] w-full bg-zinc-900 fixed bottom-0 left-0 text-white border-t-2 rounded-tl-2xl rounded-tr-2xl z-30'>
          <div className='h-1 w-[12%] bg-white rounded-xl mt-2 mx-auto'></div>
          <div className='flex justify-center items-center mt-4 text-slate-400 text-sm'>
            <h1>Comments</h1>
          </div>
          <IoClose className='text-3xl absolute top-0 right-0' onClick={() => setShowComment(false)} />

          <div className="comments mt-4 p-2 flex flex-col gap-4 h-[74%] overflow-y-scroll ">
            {comments.length >= 1 ? comments.map((comment) => {
              return <div key={comment._id} className='flex gap-2'>
                <div className='rounded-full w-[12vw] h-[12vw] overflow-hidden'>
                  <img src={comment.user.photo || "/user.png"} alt="user" className='w-full h-full object-cover' />
                </div>
                <div className='leading-tight'>
                  <h1>{comment.user.username}</h1>
                  <h1 className='text-sm leading-tight opacity-50'>{comment.text}</h1>
                </div>
              </div>
            }) : <h1 className='font-bold text-center'>Be the First To Comment On This Post</h1>}
          </div>

          <div className='sendComment bg-red-20 p-2 flex gap-3 fixed bottom-0 left-0 w-full'>
            <div className='bg-green-600 rounded-full w-[11vw] h-[11vw] overflow-hidden flex-shrink-0'>
              <img src={loginUser?.photo || "/user.png"} alt="user" className='w-full h-full object-cover' />
            </div>
            <input type="text" placeholder='Add a comment' className='bg-transparent w-[75%] outline-none' value={commentText} onChange={(e) => { setcommentText(e.target.value) }} />
            <button ref={submitBtn} className='text-2xl text-blue-500 p-2' onClick={() => handleComment(post._id)}><IoMdSend /></button>
          </div>
        </div>
      </div>



      <div className='absolute w-screen h-screen top-0 left-0 justify-center items-center flex-col hidden md:flex'>
        <div className='py-1 rounded-lg overflow-hidden bg-zinc-800 m-2 w-[80%]'>
          <div className='w-full h-[70vh] flex'>
            <img src={post.image} alt="" className="object-cover w-2/5 h-full" />

            <div className='w-full relative'>
              <div className="title px-2 flex justify-between items-center w-full">
                <div className='flex items-center gap-2 mb-2 w-full'>
                  <div className="w-[3vw] h-[3vw] rounded-full overflow-hidden">
                    <img src={loginUser.photo || "/user.png"} alt="img" className="object-cover h-full w-full" />
                  </div>
                  <h4 className="text-sm px-2">{user.username}</h4>
                  <h6 className="text-xs text-white">1d</h6>
                </div>
                <div className='flex'>
                  {loginUser.posts.find(upost => upost._id === post._id) && <button className='text-2xl text-red-700' onClick={() => { handleDelete(post._id) }}><RiDeleteBin6Line /></button>}
                  <button className='text-3xl' onClick={() => setShowComment(false)}><IoClose /></button>
                </div>
              </div>

              <div className='h-[65%] border-t-2 border-b-2 border-zinc-600'>
                <div className="comments mt-4 p-2 flex flex-col gap-4 h-[74%] overflow-y-scroll ">
                  {comments.length >= 1 ? comments.map((comment) => {
                    return <div key={comment._id} className='flex gap-2'>
                      <div className='rounded-full w-[3vw] h-[3vw] overflow-hidden'>
                        <img src={comment.user.photo || "/user.png"} alt="user" className='w-full h-full object-cover' />
                      </div>
                      <div className='leading-tight'>
                        <h1>{comment.user.username}</h1>
                        <h1 className='text-sm leading-tight opacity-50'>{comment.text}</h1>
                      </div>
                    </div>
                  }) : <h1 className='font-bold text-center'>Be the First To Comment On This Post</h1>}
                </div>
              </div>

              <div className='w-full mt-1 px-2'>
                <div className="options w-full px-2 flex justify-between text-[1.4rem]">
                  <div className="flex gap-3 mt-2">
                    {isLiked ? <p className='flex'><span className='text-sm mx-1'>{Likes}</span><FaHeart onClick={() => handleLike(post._id)} className='text-red-600' /></p> : <p className='flex items-center justify-center'> <span className='text-sm mx-1'>{Likes}</span><FaRegHeart onClick={() => handleLike(post._id)} /></p>}
                    <p className='flex'><span className='text-sm mx-1'>{post.comment.length}</span><IoChatbubbleEllipsesOutline onClick={() => setShowComment(true)} /></p>
                    <TfiLocationArrow className='rotate-90' />
                  </div>
                  <FiBookmark />
                </div>
                <p className='px-4 opacity-50 text-ellipsis w-[80%]'>post caption: {post.caption}</p>
              </div>

              <div className='sendComment bg-red-20 p-2 flex gap-3 w-full absolute bottom-0'>
                <div className='bg-green-600 rounded-full w-[3vw] h-[3vw] overflow-hidden flex-shrink-0'>
                  <img src={loginUser?.photo || "/user.png"} alt="user" className='w-full h-full object-cover' />
                </div>
                <input type="text" placeholder='Add a comment' className='bg-transparent w-full outline-none' value={commentText} onChange={(e) => { setcommentText(e.target.value) }} />
                <button ref={submitBtn} className='text-2xl text-blue-500 p-2' onClick={() => handleComment(post._id)}><IoMdSend /></button>
              </div>

            </div>
          </div>

        </div>
      </div>
    </>
  )
}

export default Comment;