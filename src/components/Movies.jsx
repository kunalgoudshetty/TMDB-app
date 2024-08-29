import React from "react";
import MovieCard from "./MovieCard";
import { useEffect, useState } from "react";
import axios from "axios";
import Pages from "./pages";

function Movies() {
  const [movies, setMovie] = useState([]);
  const [pageNo, setpageNo] = useState(1);
  function handleNext() {
    setpageNo(pageNo + 1);
  }
  function handlePrevious() {
    if (pageNo === 1) {
      setpageNo(pageNo);
    } else {
      setpageNo(pageNo - 1);
    }
  }

  useEffect(() => {
    axios
      .get(
        `https://api.themoviedb.org/3/trending/movie/day?api_key=2c528dfd80de27cb6771ded1a59a50b1&language=en-US&page=${pageNo}`
      )
      .then((res) => setMovie(res.data.results));
  }, [pageNo]);

  return (
    <div>
      <h1 className="text-2xl text-center font-bold m-5">Trending Movies</h1>
      <div className="flex justify-evenly gap-5 flex-wrap">
        {movies.map((movieObj,index) => {
          return (
            <MovieCard
               key={index}
              name={movieObj.title}
              posterpath={movieObj.poster_path}
              movieObject={movieObj}
             
           
              
            />
          );
        })}
      </div>
      <Pages
        NextpageFn={handleNext}
        PreviouspageFn={handlePrevious}
        pageNumber={pageNo}
      />
    </div>
  );
}

export default Movies;
