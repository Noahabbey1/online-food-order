import React, { createContext, useState, useEffect } from "react";

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentUser, setCurrentUser] = useState(()=>{
    const storedUser = localStorage.getItem('currentUser');
    return storedUser ? JSON.parse(storedUser) : null;
  }); // upon refresh we don't want to lose the current user




  useEffect(() => {
    fetchUsers();
  }, []);

  // ✅ Fetch all users
  const fetchUsers = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await fetch("http://127.0.0.1:5000/api/users");
      if (!response.ok) throw new Error(`Error fetching users (${response.status})`);
      const data = await response.json();
      setUsers(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };



  // ✅ Add new user
  const addUser = async (newUser) => {
    try {
      const response = await fetch(`http://127.0.0.1:5000/api/users`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newUser),
      });
      if (!response.ok) throw new Error(`Error creating user (${response.status})`);
      const createdUser = await response.json();
      setUsers((prev) => [...prev, createdUser]);
    } catch (err) {
      setError(err.message);
    }
  };

  // ✅ Remove a user
  const removeUser = async (userId) => {
    try {
      const response = await fetch(`http://127.0.0.1:5000/api/users${userId}`, {
        method: "DELETE",
      });
      if (!response.ok) throw new Error(`Error deleting user (${response.status})`);
      setUsers((prev) => prev.filter((user) => user.id !== userId));
    } catch (err) {
      setError(err.message);
    }
  };

  // ✅ Update a user
  const updateUser = async (userId, updatedFields) => {
    try {
      const response = await fetch(`http://127.0.0.1:5000/api/users${userId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updatedFields),
      });
      if (!response.ok) throw new Error(`Error updating user (${response.status})`);
      const updatedUser = await response.json();

      setUsers((prev) =>
        prev.map((user) => (user.id === userId ? updatedUser : user))
      );
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <UserContext.Provider value={{ users, loading, error, fetchUsers, addUser, removeUser, updateUser, currentUser, setCurrentUser }}>
      {children}
    </UserContext.Provider>
  );
};