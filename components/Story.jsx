function Story() {
  return (
    <div className="circle flex-shrink-0">
        <div className="gradient w-[18vw] h-[18vw] bg-sky-100 rounded-full bg-gradient-to-r from-purple-700 to-orange-500 flex items-center justify-center">
          <div className="inner w-[92%] h-[92%] rounded-full overflow-hidden">
            <img className="w-full h-full object-cover" src="./person.jpg" alt=""/>
          </div>
        </div>
      </div>
  )
}

export default Story
