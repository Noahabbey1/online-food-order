import React, { createContext, useState, useEffect } from 'react';
import { toaster } from './ui/toaster';

export const FavourContext = createContext();

export const FavourProvider = ({ children }) => {
  const [favourItems, setFavourItems] = useState([]);

    useEffect(() => {
    localStorage.setItem('favourItems', JSON.stringify(favourItems));
  }, [favourItems]);
  
  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem('favourItems')) || [];
    setFavourItems(stored);
  }, []);



  const addToFavour = (dishObj) => {
    const existing = favourItems.find(item => item.id === dishObj.id);
    let updatedFavour;
    if (existing) {
      updatedFavour = favourItems;
    } else {
      updatedFavour = [...favourItems, { ...dishObj }];
    }
    setFavourItems(updatedFavour);
  };

  const removeFromFavour = (itemId) => {
    const updated = favourItems.filter(item => item.id !== itemId);
    setFavourItems(updated);
    toaster.create({
            title: "Removed!",
            description: "Item has been removed!",
            type: "error",
            closable: true,
            })
  };

  const clearFavour = () => {
    setFavourItems([]);
    localStorage.removeItem('favourItems');
     toaster.create({
            title: "Cleared!",
            description: "Items have been cleared",
            type: "error",
            closable: true,
            })
  };

  return (
    <FavourContext.Provider value={{ favourItems, addToFavour, removeFromFavour, clearFavour }}>
      {children}
    </FavourContext.Provider>
  );
};