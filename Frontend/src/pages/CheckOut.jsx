import React, { useContext } from "react"
import Navbar from "../components/Navbar"
import Footer from "../components/Footer"
import CheckOutMenu from "../components/CheckOutMenu"
import { CartContext } from "../components/CartContext"

const CheckOut = () => {
  

  return (
    <div>
      {/* <Navbar /> */}
      {/* {activeItems.map(item => (
        <CheckOutMenu key={item.id} checkOutItems={item} />
      ))} */}
      < CheckOutMenu />

      <Footer />
    </div>
  );
}

export default CheckOut