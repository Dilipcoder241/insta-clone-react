function Story({url}) {
  return (
    <div className="circle flex-shrink-0">
        <div className="gradient w-[18vw] h-[18vw] md:w-[4.5vw] md:h-[4.5vw] bg-sky-100 rounded-full bg-gradient-to-r from-purple-700 to-orange-500 flex items-center justify-center">
          <div className="inner w-[92%] h-[92%] rounded-full overflow-hidden bg-black p-[2px]">
            <img className="w-full h-full object-cover rounded-full" src={url ||"/user.png"} alt=""/>
          </div>
        </div>
      </div>
  )
}

export default Story
