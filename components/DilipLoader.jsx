import React from 'react'

function DilipLoader() {

  return (
    <div className='text-white w-full h-screen font-mono flex items-center justify-center overflow-hidden'>
        <div>
        <h1 className='text-[5vw] animate-pulse'>Dilip's Site is Loading</h1>
        <div className='linear w-[40vw] mx-auto border-2 animate-ping'></div>
        </div>
    </div>
  )
}

export default DilipLoader