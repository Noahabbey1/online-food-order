import React, { useState } from "react"
import Navbar from "../components/Navbar"
import Footer from "../components/Footer"
import UpdateMenuForm from "../components/updateMenuForm";
import { MenuContext } from "@chakra-ui/react";
import { useContext } from "react";

const UpdateMenu = () => {
  const [selectedMenu, setSelectedMenu] = useState(null)
  // const {setMenu} = useContext(MenuContext)
  return (
    <div>
      <Navbar />
        <UpdateMenuForm menuObj={selectedMenu}  onClose={() => setSelectedMenu(null)} />
      <Footer />
      {/* Add your menu grid or dish list here */}
    </div>
  )
}

export default UpdateMenu