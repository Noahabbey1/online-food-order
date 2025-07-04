import React from "react"
import Navbar from "../components/Navbar"
import Footer from "../components/Footer"
import MainMenuGrid from "../components/MainMenuGrid"


const Menu = () => {
  return (
    <div>
      <Navbar />
      <MainMenuGrid />
      <Footer />
      {/* Add your menu grid or dish list here */}
    </div>
  )
}

export default Menu