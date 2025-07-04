import React, { useState } from "react"
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import OrderHistoryPage from "../components/OrderHistoryPage";

const OrderHistory = () => {
  return (
    <div>
      <Navbar />
      <OrderHistoryPage />
      <Footer />
      {/* Add your menu grid or dish list here */}
    </div>
  )
}
export default OrderHistory;