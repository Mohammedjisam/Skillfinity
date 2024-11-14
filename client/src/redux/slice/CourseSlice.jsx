import { createSlice } from "@reduxjs/toolkit";

const courseSlice = createSlice({
  name: "course",
  initialState: {
    courseDatas: (() => {
      try {
        const storedData = localStorage.getItem("courseDatas");
        return storedData ? JSON.parse(storedData) : [];
      } catch (error) {
        console.warn("Error parsing courseData from localStorage:", error);
        localStorage.removeItem("courseDatas"); 
        return []; 
      }
    })(),
  },
  reducers: {
    addCourse: (state, action) => {
      state.courseDatas.push(action.payload);
      localStorage.setItem("courseDatas", JSON.stringify(state.courseDatas));
    },
    updateCourse: (state, action) => {
      const { id, title, description } = action.payload;
      const course = state.courseDatas.find((course) => course.id === id);
      if (course) {
        course.title = title;
        course.description = description;
        localStorage.setItem("courseDatas", JSON.stringify(state.courseDatas));
      }
    },
    setCourses: (state, action) => {
      state.courseDatas = action.payload;
      localStorage.setItem("courseDatas", JSON.stringify(action.payload));
    },
    deleteCourse: (state, action) => {
      state.courseDatas = state.courseDatas.filter((course) => course.id !== action.payload);
      localStorage.setItem("courseDatas", JSON.stringify(state.courseDatas));
    },
    clearCourses: (state) => {
      state.courseDatas = [];
      localStorage.removeItem("courseDatas");
    },
  },
});

export const { addCourse, updateCourse, deleteCourse, clearCourses, setCourses } = courseSlice.actions;
export default courseSlice.reducer;
