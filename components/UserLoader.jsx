import React from 'react'

function UserLoader() {
    return (
        <div className="relative flex w-64 animate-pulse gap-2 mt-5">
            <div className="h-10 w-10 rounded-full bg-neutral-800"></div>
            <div className="flex-1">
                <div className="mb-1 h-4 w-3/5 rounded-lg bg-neutral-600 text-lg"></div>
                <div className="h-4 w-[90%] rounded-lg bg-neutral-600 text-sm"></div>
            </div>
        </div>
    )
}

export default UserLoader