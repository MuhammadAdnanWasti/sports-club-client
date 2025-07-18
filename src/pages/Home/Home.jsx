import React from 'react'
import Banner from './Banner'
import AboutClub from './AboutClub'
import LocationSection from './LocationSection'
import Coupon from './Coupon'

const Home = () => {
  return (
    <div className='mt-7 flex flex-col items-center justify-center gap-7'>
      <Banner></Banner>
      <AboutClub></AboutClub>
      <LocationSection></LocationSection>
      <Coupon></Coupon>
    </div>
  )
}

export default Home
