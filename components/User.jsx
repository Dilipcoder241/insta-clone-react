import React from 'react'
import { Link } from 'react-router-dom';

function User({ user, loginUser }) {

    return (

        <Link to={user._id == loginUser._id ?`/profile/${loginUser.username}`:`/user/${user._id}`} className="text-white flex gap-5 items-center mt-5">
            <div className="image w-[12vw] h-[12vw] rounded-full overflow-hidden">
                <img src={user.photo} alt="" className='object-cover h-full w-full' />
            </div>
            <div className="text">
                <h3>{user.username}</h3>
                <h4 className="text-xs opacity-30 leading-none">{user.name}</h4>
            </div>
        </Link>
    )
}

export default User
