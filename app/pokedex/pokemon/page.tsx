import PokemonSearch from '@/components/pokemonSearch';
import React from 'react';

const Page = async () => {

    const initialList: {count: number, results: {name: string, url: string}[]} = await (await fetch('https://pokeapi.co/api/v2/pokemon')).json();
    return (
            <PokemonSearch initialSearchList={initialList.results} searchCount={initialList.count} />
    );
};

export default Page;
