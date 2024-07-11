import React, { useState } from 'react';
import { FaHeart, FaRegHeart } from 'react-icons/fa6';
import { FiBookmark } from 'react-icons/fi';
import { IoChatbubbleEllipsesOutline, IoClose } from 'react-icons/io5';
import { TfiLocationArrow } from 'react-icons/tfi';
import { toast } from 'react-toastify';
import { RiDeleteBin6Line } from "react-icons/ri";


function ShowPost({setShowPost , post , user , setShowComment , loginUser}) {
    const [Likes, setLikes] = useState(post.likes.length);

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

    const handleDelete = async (id) => {
        try {
            const rowData = await fetch(`${import.meta.env.VITE_BACKEND_URL}/delete/${id}`, {
                method: "POST",
                headers: {
                    "Content-type": "application/json; charset=UTF-8",
                    "Token": localStorage.getItem("Token")
                }

            })
            const data = await rowData.json();
            if (data.success) {
                toast.success(data.msg);
                setShowPost(false);
            }
            else {
                toast.error(data.msg);
            }

        } catch (error) {
            toast.error("not able to delete the post");
        }
    }


    return (
        <div className='absolute w-screen h-screen top-0 left-0 flex justify-center items-center flex-col'>
            <div className='py-2 rounded-lg overflow-hidden bg-zinc-800 m-2 w-full'>
                <div className="title px-2 flex justify-between">
                    <div className='flex items-center gap-2 mb-2'>
                        <div className="w-[8vw] h-[8vw] rounded-full overflow-hidden">
                            <img src={user.photo || "./user.png"} alt="img" className="object-cover h-full w-full" />
                        </div>
                        <h4 className="text-sm px-2">{user.username}</h4>
                        <h6 className="text-xs text-white">1d</h6>
                    </div>
                    <div className='flex'>
                       {loginUser.posts.find(upost => upost._id === post._id) && <button className='text-2xl text-red-700' onClick={() => { handleDelete(post._id) }}><RiDeleteBin6Line /></button>}
                        <button className='text-3xl' onClick={() => setShowPost(false)}><IoClose /></button>
                    </div>
                </div>
                <div className='w-full h-[50vh] bg-green-400'>
                    <img src={post.image} alt="" className="object-cover w-full h-full" />
                </div>
                <div className='w-full mt-1'>
                    <div className="options w-full px-2 flex justify-between items-center text-[1.4rem]">
                        <div className="flex gap-3 mt-2">
                            {Likes >= 1 ? <p className='flex'><span className='text-sm mx-1'>{Likes}</span><FaHeart onClick={() => handleLike(post._id)} className='text-red-600' /></p> : <p className='flex items-center justify-center'> <span className='text-sm mx-1'>{Likes}</span><FaRegHeart onClick={() => handleLike(post._id)} /></p>}
                            <p className='flex'><span className='text-sm mx-1'>{post.comment.length}</span><IoChatbubbleEllipsesOutline onClick={() => setShowComment(true)} /></p>
                            <TfiLocationArrow className='rotate-90' />
                        </div>
                        <FiBookmark />

                    </div>
                </div>
            </div>
        </div>
    )
}

export default ShowPost