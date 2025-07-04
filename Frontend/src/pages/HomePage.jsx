import React from 'react'
import Navbar from '../components/Navbar'
import ImageSlider from '../components/ImageSlider'
import MenuGrid from '../components/MenuGrid'
import RecGrid from '../components/RecGrid'
import Footer from '../components/Footer'



function HomePage() {

  return (
    <>
    <Navbar />
    <ImageSlider />
    <MenuGrid />
    <RecGrid />
    <Footer/>
    </>
    
  )
}

export default HomePage