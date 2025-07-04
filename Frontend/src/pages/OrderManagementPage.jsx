import React, { useState } from "react"
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import OrderManagement from "../components/OrderManagement"

const OrderManagementpage = () => {
  return (
    <div>
      <Navbar />
      <OrderManagement />
      <Footer />
      {/* Add your menu grid or dish list here */}
    </div>
  )
}
export default OrderManagementpage;