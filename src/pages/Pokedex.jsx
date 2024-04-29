import React, { useEffect, useRef, useState } from "react";
import useFetch from "../assets/hooks/useFetch";
import { useSelector } from "react-redux";
import PokeCard from "../assets/components/pokedex/PokeCard";
import "../assets/components/pokedex/Pokedex.css";

const Pokedex = () => {
  const [pokemon, getPokemon, isLoading, hasError] = useFetch();
  const trainer = useSelector((store) => store.trainerName);
  const [pokeInput, setPokeInput] = useState("");
  const pokeBusqueda = useRef();
  const QuantityPoke = useRef();
  const [theme, setTheme] = useState("☀️")
  const [colorTheme, setColorTheme] = useState("white")
  

  const [url, setUrl] = useState(`https://pokeapi.co/api/v2/pokemon?limit=10`);

  useEffect(() => {
    getPokemon(url);
    console.log(pokemon);
  }, [url]);

  const handlePokeBusqueda = (event) => {
    event.preventDefault();
    setPokeInput((pokeBusqueda.current.value));
    pokeBusqueda.current.value = "";
  };

  const pokeFilter = (poke) => {
    const perName = poke.name.includes(pokeInput);
    return perName;
  };

  const handleNextPageButton = () => {
    if (pokemon?.next !== null) {
      setUrl(pokemon.next);
      window.scrollTo(0, 0);
    } else {
      alert("No hay Paginas hacia adelante");
    }
  };
  const handlePreviusPageButton = () => {
    if (pokemon?.previous !== null) {
      setUrl(pokemon.previous);
      window.scrollTo(0, 0);
    } else {
      alert("No hay Paginas hacia atras");
    }
  };
  const handleQuantityPoke = (event) => {
    event.preventDefault();
    if (QuantityPoke.current.value === 10) {
      setUrl(`https://pokeapi.co/api/v2/pokemon?limit=10`);
    } else {
      setUrl(
        `https://pokeapi.co/api/v2/pokemon?limit=${QuantityPoke.current.value}`
      );
      QuantityPoke.current.value = "";
    }
  };
  const handleTheme = (event) => {
    event.preventDefault();
    if (theme === "☀️") {
      setTheme("🌙")
      setColorTheme("black")
    } else {
      setTheme("☀️")
      setColorTheme("white")
    }
    const pokeTheme = document.getElementsByClassName("cabezal")
    for (let i = 0; i < pokeTheme.length; i++) {
      pokeTheme[i].classList.toggle("pokeTheme");
    }
    const textElement = document.getElementsByClassName("bienvenida__text")
    for (let i = 0; i < textElement.length; i++) {
      textElement[i].classList.toggle("darkText")
    }
    const elementos = document.getElementsByClassName("theme")
      for (let i = 0; i < elementos.length; i++) {
        elementos[i].classList.toggle('darkT');
      }
  }



  return (
    <div className="pokedex theme">
      <div className="cabezal">
        <h1 className="cabezal__tittle">Pokedex</h1>
        <button style={{ background: colorTheme }} className="themeSwitch" onClick={handleTheme}>{theme}</button>
      </div>

      <p className="bienvenida__">
        <span className="bienvenida">{`Bienvenido ${trainer}`}</span>

        <span className="bienvenida__text">
          , Aqui puedes buscar tu Pokemon Favotiro
        </span>
      </p>
      
      <form className="busqueda" onSubmit={handlePokeBusqueda}>
        <input className="theme" ref={pokeBusqueda} type="text" placeholder="Inserta el nombre del pokemon"/>
        <button className="theme" type="submit">Enviar</button>
      </form>


      <div className="results">
        {hasError && <p>Error</p>}
        {isLoading && <p>Loading</p>}
        {pokemon?.results.filter(pokeFilter).map((poke) => {
          return <PokeCard key={poke.url} poke={poke}></PokeCard>;
        })}
      </div>
      <div className="paginacion">
        <button className="theme" onClick={handlePreviusPageButton}>Previous Page</button>
        <button className="theme" onClick={handleNextPageButton}>Next Page</button>
      </div>
      <div className="pokeCantidad">
        <span>Cantidad a mostrar</span>
        <form onSubmit={handleQuantityPoke}>
          <input
            ref={QuantityPoke}
            type="number"
            min={"1"}
            max={"50"}
            placeholder="Default: 10"
            className="theme"
          />
          <button className="theme" type="submit">Enviar</button>
        </form>
      </div>
     <br /><br /><br /><br /><br />
    </div>
  );
};

export default Pokedex;
