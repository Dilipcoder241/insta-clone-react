import React from 'react'

function Loader() {
  return (
    <div className="flex flex-col bg-neutral-700 w-full h-[70vh] animate-pulse p-4 gap-4 mt-1">
      <div className="relative flex w-64 animate-pulse gap-2">
        <div className="h-12 w-12 rounded-full bg-neutral-800"></div>
        <div className="flex-1">
          <div className="mb-1 h-4 w-3/5 rounded-lg bg-neutral-600 text-lg"></div>
          <div className="h-4 w-[90%] rounded-lg bg-neutral-600 text-sm"></div>
        </div>
      </div>
      <div className="bg-neutral-800/50 w-full h-[60%] animate-pulse rounded-md"></div>
      <div className="flex flex-col gap-2">
        <div className="bg-neutral-600/50 w-full h-4 animate-pulse rounded-md"></div>
        <div className="bg-neutral-600/50 w-4/5 h-4 animate-pulse rounded-md"></div>
        <div className="bg-neutral-600/50 w-full h-4 animate-pulse rounded-md"></div>
        <div className="bg-neutral-600/50 w-2/4 h-4 animate-pulse rounded-md"></div>
      </div>
    </div>

  )
}

export default Loader