import { useEffect, useState } from "react";
import "./index.css";
import { PokemonCards } from "./PokemonCards";

export const Pokemon = () => {
  const [pokemon, setPokemon] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [search, setSearch] = useState("");
  const [types, setTypes] = useState([]);
  const [selectedType, setSelectedType] = useState("all");

  const API = "https://pokeapi.co/api/v2/pokemon?limit=150";

  const fetchTypes = async () => {
    try {
      const res = await fetch("https://pokeapi.co/api/v2/type");
      const data = await res.json();
      setTypes(data.results);
    } catch (error) {
      console.log("Error fetching types:", error);
    }
  };

  useEffect(() => {
    fetchPokemon();
    fetchTypes();
  }, []);

  const fetchPokemon = async () => {
    try {
      const res = await fetch(API);
      const data = await res.json();
      //   console.log(data);

      const detailedPokemonData = data.results.map(async (curPokemon) => {
        const res = await fetch(curPokemon.url);
        const data = await res.json();
        return data;
      });
      //   console.log(detailedPokemonData);

      const detailedResponses = await Promise.all(detailedPokemonData);
      console.log(detailedResponses);
      setPokemon(detailedResponses);
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
      setError(error);
    }
  };

  useEffect(() => {
    fetchPokemon();
  }, []);

  //search functionality

  const filteredPokemon = pokemon.filter((curPokemon) => {
    const matchesSearch = curPokemon.name
      .toLowerCase()
      .includes(search.toLowerCase());

    const matchesType =
      selectedType === "all" ||
      curPokemon.types.some((t) => t.type.name === selectedType);

    return matchesSearch && matchesType;
  });

  if (loading) {
    return (
      <div className="loader-container">
        <div className="loader"></div>
        <h2>Loading Pokémon...</h2>
      </div>
    );
  }

  if (error) {
    return (
      <div>
        <h1>{error.message}</h1>
      </div>
    );
  }

  return (
    <>
      <section className="container">
        <header>
          <h1> Gotta Catch'em All </h1>
        </header>
        <div className="pokemon-search">
          <input
            type="text"
            placeholder="Search Pokémon"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <select
            className="pokemon-filter"
            value={selectedType}
            onChange={(e) => setSelectedType(e.target.value)}
          >
            <option value="all">All Types</option>
            {types.map((type) => (
              <option key={type.name} value={type.name}>
                {type.name}
              </option>
            ))}
          </select>
        </div>

        <div>
          <ul className="cards">
            {/* {pokemon.map((curPokemon) => { */}
            {filteredPokemon.map((curPokemon) => (
              <PokemonCards key={curPokemon.id} pokemonData={curPokemon} />
            ))}
          </ul>
        </div>
      </section>
    </>
  );
};
