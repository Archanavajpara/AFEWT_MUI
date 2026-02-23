import React, { createContext, useState, useContext } from "react";

// 1️⃣ Create Context
const ThemeContext = createContext();

// 2️⃣ Provider Component
function ThemeProvider({ children }) {
  const [theme, setTheme] = useState("light");

  const toggleTheme = () => {
    setTheme(theme === "light" ? "dark" : "light");
  };

  const themeStyles = {
    backgroundColor: theme === "light" ? "#ffffff" : "#222222",
    color: theme === "light" ? "#000000" : "#ffffff",
    minHeight: "100vh",
    padding: "20px",
    transition: "0.3s"
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      <div style={themeStyles}>{children}</div>
    </ThemeContext.Provider>
  );
}

// 3️⃣ Header Component
function Header() {
  const { theme, toggleTheme } = useContext(ThemeContext);

  return (
    <div>
      <h2>Current Theme: {theme}</h2>
      <button onClick={toggleTheme}>
        Toggle Theme
      </button>
    </div>
  );
}

// 4️⃣ Content Component
function Content() {
  return (
    <div>
      <h3>Welcome to the Application</h3>
      <p>This layout theme changes for the entire app.</p>
    </div>
  );
}

 export default function ThemeContextB() {
  return (
    <ThemeProvider>
      <Header />
      <Content />
    </ThemeProvider>
  );
}