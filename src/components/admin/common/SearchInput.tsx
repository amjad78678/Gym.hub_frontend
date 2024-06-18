import React, { useState } from 'react'

const SearchInput = ({search,setSearch}) => {
  return (
    <div className="my-2 flex sm:flex-row flex-col">
    <div className="block relative">
      <span className="h-full absolute inset-y-0 left-0 flex items-center pl-2">
        <svg
          viewBox="0 0 24 24"
          className="h-4 w-4 fill-current text-gray-200"
        >
          <path d="M10 4a6 6 0 100 12 6 6 0 000-12zm-8 6a8 8 0 1114.32 4.906l5.387 5.387a1 1 0 01-1.414 1.414l-5.387-5.387A8 8 0 012 10z"></path>
        </svg>
      </span>
      <input
        placeholder="Search"
        className="appearance-none rounded-r rounded-l sm:rounded-l-none border border-gray-400 border-b block pl-8 pr-6 py-2 w-full bg-black text-sm placeholder-gray-200 text-white focus:bg-white focus:placeholder-gray-600 focus:text-gray-700 focus:outline-none"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
    </div>
  </div>
  )
}

export default SearchInput