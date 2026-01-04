'use client'

import { useState,useEffect } from "react";
import Image from "next/image";
import { Search } from "lucide-react";

interface SearchBoxProps  {
    onSearch: (query: string) => void; 
      initialValue?: string;
}

export default function SearchBox({onSearch, initialValue= ''}:SearchBoxProps)
{
    const [query, setQuery] = useState(initialValue);
    const [debouncedQuery, setDebouncedQuery] = useState(initialValue);


useEffect(()=> {
    const timer = setTimeout(()=>{
        setDebouncedQuery(query);
    },300);

    return()=> {
        clearTimeout(timer);
    };
},[query]);

useEffect(()=>{
    onSearch(debouncedQuery);
}, [debouncedQuery, onSearch]);

  const handleClear = () => {
    setQuery('');
  };

  return (
    <div className="w-full">
        <div className="relative">
            <input type="text" 
            value={query}
            onChange={(e)=>setQuery(e.target.value)}
            placeholder="Search products by name or description..."
            className="w-full px-4 py-2 pl-10 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            aria-label="Search products"
            />

            <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
            <Search size={18} />
            </div>

            {query &&(
                <button
                onClick={handleClear}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                aria-label="Clear search"
                type="button">
                    X 
                </button>
            )}
        </div>
        {query && (
            <p className="text-sm text-gray-500 mt-1">
                Searching for: <span className="font-medium">"{query}"</span>
            </p>
        )}
    </div>
  );}