import React, { useEffect, useState } from 'react';
import CartMenu from '../components/CartMenu';
import Footer from '../components/Footer';
import Navbar from '../components/Navbar';
import FavourMenu from '../components/FavourMenu';

const FavourPage = () => {
  const {users, setUsers} = useState([]);
  const [favourItems, setFavourItems] = useState([]);

  useEffect(() => {
    const storedItems = JSON.parse(localStorage.getItem('favourItems')) || [];
    setFavourItems(storedItems);
  }, []);

  return (
    <>
      <Navbar setUsers={setUsers} />
      <FavourMenu favourItems={favourItems} />
      <Footer />
    </>
  );
};

export default FavourPage;