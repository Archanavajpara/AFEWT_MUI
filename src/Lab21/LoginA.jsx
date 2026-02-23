import React, { createContext, useState, useContext } from "react";

// 1️⃣ Create Auth Context
const AuthContext = createContext();

// 2️⃣ Auth Provider
function AuthProvider({ children }) {
  const [user, setUser] = useState(null);

  const login = (username) => {
    setUser({ name: username });
  };

  const logout = () => {
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

// 3️⃣ Login Component
function Login() {
  const { login } = useContext(AuthContext);
  const [username, setUsername] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    login(username);
    setUsername("");
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Login</h2>
      <input
        type="text"
        placeholder="Enter name"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        required
      />
      <button type="submit">Login</button>
    </form>
  );
}

// 4️⃣ Dashboard Component
function Dashboard() {
  const { user, logout } = useContext(AuthContext);

  return (
    <div>
      <h2>Welcome, {user.name} 🎉</h2>
      <button onClick={logout}>Logout</button>
    </div>
  );
}

// 5️⃣ Main App
function App() {
  const { user } = useContext(AuthContext);

  return (
    <div style={{ padding: "20px" }}>
      <h1>Auth Context Example</h1>
      {user ? <Dashboard /> : <Login />}
    </div>
  );
}

// 6️⃣ Wrap App with Provider
export default function LoginA() {
  return (
    <AuthProvider>
      <App />
    </AuthProvider>
  );
}