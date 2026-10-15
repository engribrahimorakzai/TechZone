import React from 'react'
import Carosel from '../components/Carosel'
import MidBanner from '../components/MidBanner'
import Features from '../components/Features'
import Category from '../components/Category'

const Home = () => {
  return (
   <>
   <Carosel/> 
   <Category/>
   <MidBanner/>
    <Features/>
   </>
  )
}

export default Home