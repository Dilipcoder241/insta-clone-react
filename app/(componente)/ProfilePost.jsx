'use client'

import React from 'react';

function ProfilePost({url}) {
  return (
    <div className="post w-[32.5%] h-32 overflow-hidden">
      <img src={url} alt="" className='w-full h-full object-cover'/>
    </div>
  )
}

export default ProfilePost
