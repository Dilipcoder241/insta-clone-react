import React, { useState } from 'react';

function ProfilePost({ url }) {

  return (
    <div className="post w30 bg-sky-100 overflow-hidden">
      <img src={url} alt="" className="object-cover w-full h-full" />
    </div>
  )
}

export default ProfilePost;
