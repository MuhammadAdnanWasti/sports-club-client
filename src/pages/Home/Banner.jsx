import React from 'react'

const Banner = () => {
  return (
   <div className="carousel w-full h-[400px] rounded-lg overflow-hidden ">
   
      <div id="slide1" className="carousel-item relative w-full">
        <img
          src="https://i.ibb.co/wZ79DpwS/dean-5yx-Jpt-Tc-Ao-unsplash.jpg"
          className="w-full  object-cover"
          alt="Fresh Food"
        />
        <div className="absolute  w-1/2 md:w-1/4 flex items-center h-full left-0 top-0 bg-black bg-opacity-50 text-white p-6">
          <div>
            <h2 className="text-3xl font-bold">Sports Club</h2>
            {/* <p className="text-lg">Enjoy tasty and healthy food every day.</p> */}
          </div>
        </div>
        <div className="absolute flex justify-between transform -translate-y-1/2 left-5 right-5 bottom-4">
          <a href="#slide3" className="btn btn-circle">❮</a>
          <a href="#slide2" className="btn btn-circle">❯</a>
        </div>
      </div>


      <div id="slide2" className="carousel-item relative w-full">
        <img
          src='https://i.ibb.co/nqg3NKXG/naseem-buras-KDx-Fq4-SWSg-unsplash.jpg'
          className="w-full  object-cover"
          alt="Healthy Meal"
        />
        <div className="absolute w-1/2 md:w-1/4 flex items-center h-full left-0 top-0 bg-black bg-opacity-50 text-white p-6">
          <div>
            <h2 className="text-3xl font-bold">Courts</h2>
           
          </div>
        </div>
        <div className="absolute flex justify-between transform -translate-y-1/2 left-5 right-5 bottom-4">
          <a href="#slide1" className="btn btn-circle">❮</a>
          <a href="#slide3" className="btn btn-circle">❯</a>
        </div>
      </div>


      <div id="slide3" className="carousel-item relative w-full ">
        <img
          src="https://i.ibb.co/MDWbzQj1/publikasi-smkn-1-cibadak-Ecj5-z3cp8-M-unsplash.jpg"
          className="w-full object-cover"
          alt="Family Dining"
        />
        <div className="absolute  w-1/2 md:w-1/4 flex items-center h-full left-0 top-0 bg-black bg-opacity-50 text-white p-6">
          <div>
            <h2 className="text-3xl font-bold">Our Acitivities</h2>
            
          </div>
        </div>
        <div className="absolute flex justify-between transform -translate-y-1/2 left-5 right-5 bottom-4">
          <a href="#slide2" className="btn btn-circle">❮</a>
          <a href="#slide1" className="btn btn-circle">❯</a>
        </div>
      </div>
    </div>
  )
}

export default Banner
