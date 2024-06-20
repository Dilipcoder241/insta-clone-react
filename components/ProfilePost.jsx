import React, { useState } from 'react';

function ProfilePost({ url }) {
  const [urlString, seturlString] = useState("")
  const uint8Array = new Uint8Array(url);
  const blob = new Blob([uint8Array], { type: 'image/jpeg' });
  const reader = new FileReader();
  reader.readAsDataURL(blob);
  reader.onload = () => {
    seturlString(reader.result);
  };


  return (
    <div className="post w30 bg-sky-100 overflow-hidden">
      <img src={urlString} alt="" className="object-cover w-full h-full" />
    </div>
  )
}

export default ProfilePost;
