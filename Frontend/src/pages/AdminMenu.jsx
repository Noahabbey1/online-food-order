import React, { useState } from "react"
import Navbar from "../components/Navbar"
import Footer from "../components/Footer"
import UpdateMenuGrid from "../components/UpdateMenuGrid"
import UpdateMenuForm from "../components/updateMenuForm";

const AdminMenu = () => {
  const [selectedMenu, setSelectedMenu] = useState(null)
  return (
    <div>
      <Navbar />
      <UpdateMenuGrid onEdit={setSelectedMenu} />
      <Footer />
      {/* Add your menu grid or dish list here */}
    </div>
  )
}

export default AdminMenu