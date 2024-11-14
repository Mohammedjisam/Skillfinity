import { createSlice } from "@reduxjs/toolkit";

const adminSlice = createSlice({
  name: "admin",
  initialState: {
    adminDatas: (() => {
      try {
        const storedData = localStorage.getItem("adminDatas");
        return storedData && storedData !== "undefined" ? JSON.parse(storedData) : null;
      } catch (error) {
        console.warn("Error parsing adminDatas from localStorage:", error);
        localStorage.removeItem("adminDatas"); 
        return null;
      }
    })(),
  },
  reducers: {
    addAdmin: (state, action) => {
      state.adminDatas = action.payload;
      localStorage.setItem("adminDatas", JSON.stringify(action.payload));
    },
    logoutAdmin: (state) => {
      state.adminDatas = null;
      localStorage.removeItem("adminDatas");
    },
  },
});

export const { addAdmin, logoutAdmin } = adminSlice.actions;
export default adminSlice.reducer;
