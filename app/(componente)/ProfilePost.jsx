'use client'

import Image from 'next/image';
import React from 'react';

function ProfilePost({url}) {
  return (
    <div className="post w-[32.5%] h-32 overflow-hidden">
      <Image width='70' height='70' src={url} alt="img" className='w-full h-full object-cover'/>
    </div>
  )
}

export default ProfilePost
