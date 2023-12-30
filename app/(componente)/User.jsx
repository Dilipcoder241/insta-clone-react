'use client'

import React from 'react'

function User({username, name , userphoto}) {
    return (
        <div className="text-white flex items-center gap-2 mt-5">
            <div className="image w-[11vw] h-[11vw] rounded-full overflow-hidden">
                <img src={userphoto} alt="" className='object-cover h-full w-full'/>
            </div>
            <div className="text">
                <h3>{username}</h3>
                <h4 className="text-xs opacity-30 leading-none">{name}</h4>
            </div>
        </div>
    )
}

export default User
