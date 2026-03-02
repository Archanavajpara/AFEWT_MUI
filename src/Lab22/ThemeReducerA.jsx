import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { toggleTheme } from "./ThemeSlice";

function ThemeReducerA() {
  const theme = useSelector((state) => state.theme.mode);
  const dispatch = useDispatch();

  const appStyle = {
    height: "100vh",
    backgroundColor: theme === "light" ? "#ffffff" : "#222222",
    color: theme === "light" ? "#000000" : "#ffffff",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "column",
  };

  return (
    <div style={appStyle}>
      <h1>{theme.toUpperCase()} MODE</h1>
      <button onClick={() => dispatch(toggleTheme())}>
        Toggle Theme
      </button>
    </div>
  );
}

export default ThemeReducerA;