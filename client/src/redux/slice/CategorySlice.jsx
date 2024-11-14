import { createSlice } from "@reduxjs/toolkit";

const categorySlice = createSlice({
  name: "category",
  initialState: {
    categoryDatas: (() => {
      try {
        const storedData = localStorage.getItem("categoryDatas");
        return storedData ? JSON.parse(storedData) : [];
      } catch (error) {
        console.warn("Error parsing categoryData from localStorage:", error);
        localStorage.removeItem("categoryDatas"); 
        return []; 
      }
    })(),
  },
  reducers: {
    addCategory: (state, action) => {
      state.categoryDatas.push(action.payload);
      localStorage.setItem("categoryDatas", JSON.stringify(state.categoryDatas));
    },
    updateCategory: (state, action) => {
      const { id, name, description } = action.payload;
      const category = state.categoryDatas.find((cat) => cat.id === id);
      if (category) {
        category.name = name;
        category.description = description;
        localStorage.setItem("categoryDatas", JSON.stringify(state.categoryDatas));
      }
    },
    setCategories: (state, action) => {
      state.categoryDatas = action.payload;
      localStorage.setItem("categoryDatas", JSON.stringify(action.payload));
    },
    deleteCategory: (state, action) => {
      state.categoryDatas = state.categoryDatas.filter((cat) => cat.id !== action.payload);
      localStorage.setItem("categoryDatas", JSON.stringify(state.categoryDatas));
    },
    clearCategories: (state) => {
      state.categoryDatas = [];
      localStorage.removeItem("categoryDatas");
    },
  },
});

export const { addCategory, updateCategory, deleteCategory, clearCategories,setCategories } = categorySlice.actions;
export default categorySlice.reducer;
