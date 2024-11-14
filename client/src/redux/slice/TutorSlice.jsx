import { createSlice } from "@reduxjs/toolkit";

const tutorSlice = createSlice({
  name: "tutor",
  initialState: {
    tutorDatas: (() => {
      try {
        const storedData = localStorage.getItem("tutorDatas");
        return storedData ? JSON.parse(storedData) : null;
      } catch (error) {
        console.warn("Error parsing tutorDatas from localStorage:", error);
        localStorage.removeItem("tutorDatas"); 
        return null;
      }
    })(),
  },
  reducers: {
    addTutor: (state, action) => {
      state.tutorDatas = action.payload;
      localStorage.setItem("tutorDatas", JSON.stringify(action.payload));
    },
    logoutTutor: (state) => {
      state.tutorDatas = null;
      localStorage.removeItem("tutorDatas");
    },
    updateTutor: (state, action) => {
      if (state.tutorDatas) {
        state.tutorDatas = { ...state.tutorDatas, ...action.payload };
        localStorage.setItem("tutorDatas", JSON.stringify(state.tutorDatas));
      }
    },
  },
});

export const { addTutor, logoutTutor, updateTutor } = tutorSlice.actions;
export default tutorSlice.reducer;