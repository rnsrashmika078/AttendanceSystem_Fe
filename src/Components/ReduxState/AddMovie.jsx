import React, { useState } from "react";
import { addMovie } from "./MovieSlice";
import { useDispatch } from "react-redux";
function AddMovie() {
  const [newMovie, setNewMovie] = useState("");
  const dispatch = useDispatch();

  const handleoOnChange = (value) => {
    setNewMovie(value);
  };
  const handleAddMovie = () => {
    if (newMovie) {
      dispatch(addMovie(newMovie));
      setNewMovie("");
    }
  };
  return (
    <div className="flex flex-col">
      <input
        className="border-1 border-gray-500 w-1/2 m-auto rounded-2xl p-1 placeholder:text-center text-center"
        value={newMovie}
        placeholder="Enter new Movies name"
        onChange={(e) => handleoOnChange(e.target.value)}
      />
      <button
        className="border-1 border-amber-600 w-1/3 m-auto bg-red-500 text-white my-2"
        onClick={handleAddMovie}
      >
        Add Movie
      </button>
    </div>
  );
}

export default AddMovie;
