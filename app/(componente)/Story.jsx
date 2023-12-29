'use client'

import React from 'react'

function Story() {
  return (
    <div className="circle flex-shrink-0">
        <div
          className="gradient w-[18vw] h-[18vw] bg-sky-100 rounded-full bg-gradient-to-r from-purple-700 to-orange-500 flex items-center justify-center">
          <div className="inner w-[92%] h-[92%] rounded-full overflow-hidden">
            <img className="w-full h-full object-cover"
              src="https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?q=80&w=2550&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
              alt=""/>
          </div>
        </div>
      </div>
  )
}

export default Story
