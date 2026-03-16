import React, { useState } from "react";
import { Provider, useSelector, useDispatch } from "react-redux";
import { configureStore, createSlice } from "@reduxjs/toolkit";

/* Slice */
const appSlice = createSlice({
  name: "app",
  initialState: {
    items: [],
    isAuth: false
  },
  reducers: {
    login: (state, action) => {
      const { user, pass } = action.payload;
      if (user === "archana" && pass === "123456") {
        state.isAuth = true;
      } else {
        alert("Invalid Login");
      }
    },
    logout: (state) => {
      state.isAuth = false;
    },
    addItem: (state, action) => {
      state.items.push(action.payload);
    },
    deleteItem: (state, action) => {
      state.items.splice(action.payload, 1);
    },
    updateItem: (state, action) => {
      const { index, value } = action.payload;
      state.items[index] = value;
    }
  }
});

const { login, logout, addItem, deleteItem, updateItem } = appSlice.actions;

/* Store */
const store = configureStore({
  reducer: appSlice.reducer
});

/* Login Component */
function Login() {
  const dispatch = useDispatch();
  const [user, setUser] = useState("");
  const [pass, setPass] = useState("");

  return (
    <div>
      <h2>Login</h2>

      <input placeholder="Username" onChange={(e)=>setUser(e.target.value)} />
      <br/>

      <input type="password" placeholder="Password" onChange={(e)=>setPass(e.target.value)} />
      <br/>

      <button onClick={()=>dispatch(login({user, pass}))}>
        Login
      </button>
    </div>
  );
}

/* CRUD Component */
function Crud() {
  const [text,setText] = useState("");
  const items = useSelector(state=>state.items);
  const dispatch = useDispatch();

  return (
    <div>
      <h2>CRUD Operations</h2>

      <input value={text} onChange={(e)=>setText(e.target.value)} />
      <button onClick={()=>{dispatch(addItem(text)); setText("");}}>
        Add
      </button>

      <ul>
        {items.map((item,i)=>(
          <li key={i}>
            {item}

            <button onClick={()=>dispatch(deleteItem(i))}>
              Delete
            </button>

            <button onClick={()=>{
              const v = prompt("Enter new value");
              dispatch(updateItem({index:i,value:v}));
            }}>
              Update
            </button>

          </li>
        ))}
      </ul>
    </div>
  );
}

/* Main Component */
function Main(){
  const auth = useSelector(state=>state.isAuth);
  const dispatch = useDispatch();

  return (
    <div>
      {auth ? (
        <>
          <button onClick={()=>dispatch(logout())}>Logout</button>
          <Crud/>
        </>
      ) : (
        <Login/>
      )}
    </div>
  );
}

/* App */
export default function crud1(){
  return(
    <Provider store={store}>
      <Main/>
    </Provider>
  );
}