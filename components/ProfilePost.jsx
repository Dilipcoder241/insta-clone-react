import React, { useState } from 'react';

import Comment from './Comment';
import ShowPost from './ShowPost';

function ProfilePost({ post, user , loginUser}) {
  const [showComment, setShowComment] = useState(false);
  const [showPost, setShowPost] = useState(false);
 

  return (
    <>
      <div className='realtive'>

        <div className="post w30 bg-sky-100 overflow-hidden">
          <img src={post.image} alt="" className="object-cover w-full h-full" onClick={()=>setShowPost(true)}/>
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
