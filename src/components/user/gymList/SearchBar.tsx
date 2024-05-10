import React, { useEffect, useState } from "react";

const SearchBar = ({searchHandler}) => {

    const [search,setSearch]=useState('')

    useEffect(()=>{
        searchHandler(search)
    },[search,searchHandler])

  return (

<>
    <div className="flex items-center max-w-md mx-auto bg-black border border-white rounded-lg my-4">
    <div className="w-full">
    <input
        type="search"
        className="w-full py-1 ms-2 px-1 bg-black text-white rounded-full focus:outline-none"
        placeholder="Search..."
        value={search}
        onChange={(e)=>setSearch(e.target.value)}
      />
    </div>
    <div>
      <button
        className={`flex items-center justify-center w-11 h-11 text-white rounded-r-lg `}
      >
        <svg
          className="w-5 h-5 text-white"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
          ></path>
        </svg>
      </button>
    </div>
  </div>
    </>
  );
};

export default SearchBar;
