import React, { createContext, useState, useEffect } from "react";

export const MenuContext = createContext();

export const MenuProvider = ({ children }) => {
  const [menu, setMenu] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchMenu();
  }, []);

  // ✅ Fetch all menu items
  const fetchMenu = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await fetch("http://127.0.0.1:5000/api/menu-items");
      if (!response.ok) throw new Error(`Error fetching menu (${response.status})`);
      const data = await response.json();
      setMenu(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  // ✅ Add new item
  const addItem = async (newItem) => {
    try {
      const formData = new FormData();
      for (const key in newItem) {
        if (newItem[key] !== undefined && newItem[key] !== null) {
          formData.append(key, newItem[key]);
        }
      }

      const response = await fetch(`http://127.0.0.1:5000/api/menu-items`, {
        method: "POST",
        body: formData,
      });
      if (!response.ok) throw new Error(`Error creating item (${response.status})`);
      await fetchMenu(); // this refresh the data
      const createdItem = await response.json();
      setMenu((prev) => [...prev, createdItem]);
    } catch (err) {
      setError(err.message);
    }
  };

  // ✅ Update an item
  const updateItem = async (itemId, updatedFields) => {
    try {
      const formData = new FormData();
      for (const key in updatedFields) {
        if (updatedFields[key] !== undefined && updatedFields[key] !== null) {
          formData.append(key, updatedFields[key]);
        }
      }

      const response = await fetch(`http://127.0.0.1:5000/api/menu-items/${itemId}`, {
        method: "PATCH",
        body: formData,
      });
      if (!response.ok) throw new Error(`Error updating item (${response.status})`);
      await fetchMenu();
      const updatedItem = await response.json();

      setMenu((prev) =>
        prev.map((item) => (item.id === itemId ? updatedItem : item))
      );
    } catch (err) {
      setError(err.message);
    }
  };

  // ✅ Remove an item
  const removeItem = async (itemId) => {
    try {
      const response = await fetch(`http://127.0.0.1:5000/api/menu-items/${itemId}`, {
        method: "DELETE",
      });
      if (!response.ok) throw new Error(`Error deleting item (${response.status})`);
      setMenu((prev) => prev.filter((item) => item.id !== itemId));
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <MenuContext.Provider value={{menu,loading,error,fetchMenu,addItem,updateItem,removeItem, setMenu }}>
      {children}
    </MenuContext.Provider>
  );
};