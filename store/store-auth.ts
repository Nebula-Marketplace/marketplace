import { createSlice } from "@reduxjs/toolkit";
import { v4 as uuidv4 } from "uuid";
import { toast } from "react-toastify";

const initialIsAuth = () => {
  if (typeof window !== "undefined") {
    const item = window?.localStorage.getItem("isAuth");
    return item ? JSON.parse(item) : false;
  }
  return false;
};

export const authSlice = createSlice({
  name: "auth",
  initialState: {
    isAuth: initialIsAuth(),
  },
  reducers: {
    handleLogin: (state, action) => {
      state.isAuth = action.payload;
      // save isAuth in local storage
      if (typeof window !== "undefined") {
        window?.localStorage.setItem("isAuth", JSON.stringify(state.isAuth));
      }
      toast.success("User logged in successfully", {
        position: "top-right",
        autoClose: 1500,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    },
    handleLogout: (state, action) => {
      state.isAuth = action.payload;
      // remove isAuth from local storage
      if (typeof window !== "undefined") {
        window?.localStorage.removeItem("isAuth");
      }
      toast.success("User logged out successfully", {
        position: "top-right",
      });
    },
  },
});

export const { handleLogin, handleLogout } = authSlice.actions;
export default authSlice.reducer;
