import React, { useState } from 'react';

import Comment from './Comment';
import ShowPost from './ShowPost';

function  ProfilePost({ post, user , loginUser}) {
  const [showComment, setShowComment] = useState(false);
  const [showPost, setShowPost] = useState(false);
 

  return (
    <>
      <div className='realtive'>

        <div className="post w-[30vw] h-[30vw] md:w-[20vw] md:h-[20vw] bg-sky-100 overflow-hidden md:hidden">
          <img src={post.image} alt="" className="object-cover w-full h-full" onClick={()=>setShowPost(true)}/>
        </div>


        <div className="post w-[30vw] h-[30vw] md:w-[20vw] md:h-[20vw] bg-sky-100 overflow-hidden hidden md:block">
          <img src={post.image} alt="" className="object-cover w-full h-full" onClick={()=>setShowComment(true)}/>
        </div>

        {/* show post section */}
        {showPost && <ShowPost setShowPost={setShowPost} post={post} user={user} setShowComment={setShowComment} loginUser={loginUser}/>}


        {/* comment section */}
        {showComment && <Comment setShowComment={setShowComment} post={post} user={user} loginUser={loginUser}/>}
        
      </div>
    </>
  )
}

export default ProfilePost;
