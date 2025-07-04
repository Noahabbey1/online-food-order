import React, { useEffect, useState } from 'react';
import CartMenu from '../components/CartMenu';
import Footer from '../components/Footer';
import Navbar from '../components/Navbar';

const Cart = () => {
  const {users, setUsers} = useState([]);
  const [cartItems, setCartItems] = useState([]);

  useEffect(() => {
    const storedItems = JSON.parse(localStorage.getItem('cartItems')) || [];
    setCartItems(storedItems);
  }, []);

  return (
    <>
      <Navbar setUsers={setUsers} />
      <CartMenu cartItems={cartItems} />
      <Footer />
    </>
  );
};

export default Cart;