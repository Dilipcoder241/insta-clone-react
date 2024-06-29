import React, { useRef, useState } from 'react'
import { IoMdSend } from 'react-icons/io';
import { IoClose } from 'react-icons/io5';
import { toast } from 'react-toastify';

function Comment({ setShowComment , post , loginUser}) {
    const [comments, setcomments] = useState(post.comment);
    const [commentText, setcommentText] = useState("");
    const submitBtn = useRef("");

    const handleComment = async (id) => {
        if(!commentText){
          return toast.error("Please Write A Comment First");
        }

        try {
          submitBtn.current.disabled = true;
          const rowData = await fetch(`${import.meta.env.VITE_BACKEND_URL}/comment/${id}`, {
            method: "POST",
            body: JSON.stringify({
              text: commentText
            }),
            headers: {
              "Content-type": "application/json; charset=UTF-8",
              "Token": localStorage.getItem("Token")
            }
    
          })
          const data = await rowData.json();
          setcomments(data.updatedPost.comment);
          setcommentText("");
          submitBtn.current.disabled = false;
    
        } catch (error) {
          submitBtn.current.disabled = false;
          toast.error("not able to comment on the post");
        }
    }

  return (
    <div className='w-screen h-screen fixed bottom-0 left-0 bg-black bg-opacity-70 z-20'>
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
                <img src={comment.user.photo} alt="user" className='w-full h-full object-cover' />
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
            <img src={loginUser?.photo} alt="user" className='w-full h-full object-cover' />
          </div>
          <input type="text" placeholder='Add a comment' className='bg-transparent w-[75%] outline-none' value={commentText} onChange={(e) => { setcommentText(e.target.value) }} />
          <button ref={submitBtn} className='text-2xl text-blue-500 p-2' onClick={() => handleComment(post._id)}><IoMdSend /></button>
        </div>
      </div>
    </div>
  )
}

export default Comment;