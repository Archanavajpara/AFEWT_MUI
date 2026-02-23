// Create a UserContext that stores name & email. Display data in multiple components.
import React, { createContext, useState, useContext } from "react";

// Create Context
const UserContext = createContext();

// Create Provider Component
function UserProvider({ children }) {
  const [user, setUser] = useState({
    name: "Archana",
    email: "archana@email.com",
  });

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
}

// First Component
function Profile() {
  const { user } = useContext(UserContext);

  return (
    <div>
      <h2>Profile Component</h2>
      <p>Name: {user.name}</p>
      <p>Email: {user.email}</p>
    </div>
  );
}

// Second Component
function Dashboard() {
  const { user } = useContext(UserContext);

  return (
    <div>
      <h2>Dashboard Component</h2>
      <p>Welcome, {user.name}!</p>
      <p>Your email is {user.email}</p>
    </div>
  );
}

export default function MultiContext() {
  return (
    <UserProvider>
      <div>
        <Profile />
        <Dashboard />
      </div>
    </UserProvider>
  );
}