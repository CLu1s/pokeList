import React, { useState } from "react";

const idStyles = {
  fontSize: '12px',
  margin: 'auto'
}
const nameStyles = {
  fontSize: '35px',
  margin: 'auto 12px'
}
const pokeballStyles = {
  display: 'flex', 
  justifyContent: 'center',
  height: '100px'
}

export default () => {
  const [pokemonList, setPokemonList] = useState([]);
  const [pokemonName, setPokemonName] = useState();
  const [messages,setMessages] = useState(false)
  let items;
  function fetchPokemon() {
    fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonName}`, { method: "GET" })
      .then(result => result.json())
      .then(result => {
        const pokemon = {
          id: result.id,
          name: result.name,
          sprites: result.sprites.front_default
        };
        const pokemonArray = [...pokemonList];
        pokemonArray.push(pokemon);
        setPokemonList(pokemonArray);
      });
  }
  function catchPokemon() {
    let pokemonExist = false;
    if (pokemonList.length) {
      pokemonExist = pokemonList.find(item => item.name === pokemonName);
    }
    if (!pokemonExist) {
      fetchPokemon();
      setMessages(false)
    }else{
      setMessages("This Pokemon was already captured try with another.")
    }

  }
  if (pokemonList.length) {
    items = pokemonList.map(item => (
      <div style={pokeballStyles}  key={item.id}>
        <span style={idStyles}>{item.id}</span>
        <span style={nameStyles}>{item.name}</span>
        <span>
          <img src={item.sprites} alt={item.name} />
        </span>
      </div>
    ));
  }

  return (
    <>
       {messages && <h4>{messages}</h4>}
      {pokemonList.length ? items : "No Pokemons captured yet"}
      <input
        type='text'
        placeholder='pokemon to catch'
        onChange={e => setPokemonName(e.target.value)}
      />
      <button onClick={() => catchPokemon()}>Catch!</button>
    </>
  );
};
