import React from "react"
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import {CartProvider} from "./components/CartContext"
import { UserProvider } from "./components/UserContext"
import { MenuProvider } from "./components/MenuContext"
import { FavourProvider } from "./components/FavourContext"
import HomePage from "./pages/HomePage"
import Menu from "./pages/Menu"
import Cart from "./pages/Cart"
import SignUp from "./pages/SignUp"
import SignIn from "./pages/SignIn"
import AdminMenu from "./pages/AdminMenu"
import UpdateMenu from "./pages/UpdateMenu"
import FavourPage from "./pages/FavourPage"
import { Toaster } from "../src/components/ui/toaster";
import CheckOut from "./pages/CheckOut"
import OrderHistory from "./pages/OrderHistory"
import OrderManagementpage from "./pages/OrderManagementPage"



function App() {
  return (
  <UserProvider>
   <CartProvider> 
    <MenuProvider>
    <FavourProvider>
    <Router>
      <Routes>  
        <Route path="/" element={<HomePage />} />
        <Route path="/menu" element={<Menu />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/signin" element={<SignIn />} />
        <Route path="/adminmenu" element={<AdminMenu />} />
        <Route path="/updatemenu" element={<UpdateMenu />} />
        <Route path="/favourpage" element={<FavourPage />} />
        <Route path="/checkout" element={<CheckOut />} />
        <Route path="/orders" element={<OrderHistory />} />
        <Route path="/ordermanagementpage" element={<OrderManagementpage />} />

         {/* <Dialog.Viewport /> */}
      </Routes>
    </Router>
    <Toaster />
    </FavourProvider>
  </MenuProvider>
  </CartProvider>
</UserProvider>
  
  )
}

export default App
