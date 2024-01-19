import PokemonDetails from "@/components/pokemonDetails";
import { headers } from "next/headers";
import React from 'react';

const Pokemon = async ({
    params: { id },
  }: {
    params: { id: string }
  }) => {

        console.log(id)
    const pokemonDetails: {
        name: string;
        height: number;
        base_experience: number;
        weight: number;
    } = await (await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`)).json();
    return (
        <PokemonDetails details={pokemonDetails} />
    );
};

export default Pokemon;
