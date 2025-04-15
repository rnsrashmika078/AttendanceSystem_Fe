import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  //   movies: [
  //     { id: 1, name: "Spider Man" },
  //     { id: 2, name: "Harry Potter" },
  //   ],
  width: 512,
  toggle: false,
  isDarkMode: false,
  tailWindSize: "",
  activeItem: "Dashboard",
  isSubMenuOpen: false,
  nextCard: 1,
  isOnline:false,
};
const CommonSlicer = createSlice({
  name: "commonSlicer",
  initialState,
  reducers: {
    // addMovie: (state, action) => {
    //   const newMovie = {
    //     id: state.movies[state.movies.length - 1] + 1,
    //     name: action.payload,
    //   };
    //   state.movies.push(newMovie)
    // },
    // removeMovie: (state, action) => {},
    setWidth: (state, action) => {
      const newState = action.payload;
      state.width = newState;
    },
    setToggle: (state, action) => {
      const newState = action.payload;
      state.toggle = newState;
    },
    setIsDarkMode: (state, action) => {
      const newState = action.payload;
      state.isDarkMode = newState;
    },
    setTailWindSize: (state, action) => {
      state.tailWindSize = action.payload;
    },
    setActiveItem: (state, action) => {
      state.activeItem = action.payload;
    },
    setIsSubMenuOpen: (state, action) => {
      state.isSubMenuOpen = action.payload;
    },
    setNextCard: (state, action) => {
      state.nextCard = action.payload;
    },
    setIsOnline: (state,action) => {
      state.isOnline = action.payload;
    }
  },
});

export const {
  setWidth,
  setToggle,
  setIsDarkMode,
  setTailWindSize,
  setActiveItem,
  setIsSubMenuOpen,
  setNextCard,
  setIsOnline
} = CommonSlicer.actions;

export default CommonSlicer.reducer;
