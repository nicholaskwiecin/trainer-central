'use client'
import Link from 'next/link';
import React, { useState, useEffect } from 'react';

interface PokemonSearchProps {
    initialSearchList?: {name: string, url: string}[];
    searchCount?: number;
}
const PokemonSearch = ({initialSearchList,searchCount}:PokemonSearchProps) => {
    const [pokemon, setPokemon] = useState(initialSearchList);
    const [count, setCount] = useState(searchCount);


    return (
        <div>
            <h3 className="dark:text-white m-4"> Results: {count} </h3>
            {pokemon?.map((pokemon) => 
            <div className="flex dark:text-white m-4 text-center rounded border-2 border-sky-500"> 
            <div className="flex-auto p-2">{pokemon.name[0].toUpperCase() + pokemon.name.slice(1)}</div>
            <Link className="flex-initial p-2 transition ease-in-out hover:bg-sky-900" href={`/pokedex/pokemon/${pokemon.name}`}>More</Link>
            </div>)}
        </div>
    );
};

export default PokemonSearch;
