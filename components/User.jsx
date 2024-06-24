import React, { useState } from 'react'

function User({ username, name, userphoto }) {

    return (
        <div className="text-white flex gap-5 items-center mt-5">
            <div className="image w-[12vw] h-[12vw] rounded-full overflow-hidden">
                <img src={userphoto} alt="" className='object-cover h-full w-full' />
            </div>
            <div className="text">
                <h3>{username}</h3>
                <h4 className="text-xs opacity-30 leading-none">{name}</h4>
            </div>
        </div>
    )
}

export default User
