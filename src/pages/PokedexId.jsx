import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import useFetch from "../assets/hooks/useFetch";
import "../assets/components/PokedexId/PokedexId.css";

const PokedexId = () => {
  const [poke, getPoke, isLoading, hasError] = useFetch();
  const param = useParams();
  const [statsPorcettage, setStatsPorcentage] = useState();
  useEffect(() => {
    const url = `https://pokeapi.co/api/v2/pokemon/${param.id}`;
    getPoke(url);
  }, []);
  console.log(poke);
  return (
    <div>
      <div className="cabezal">
        <h1 className="cabezal__tittle">Pokedex</h1>
      </div>
      <div className="idCard poke">
        <div className="pokeCredenciales">
          <div className={poke?.types[0].type.name + " colorBar "}></div>

          <figure className="pokeImg">
            <img
              src={poke?.sprites.other["official-artwork"].front_default}
              alt={poke?.name}
            />
          </figure>

          <h2 className="pokeId">#{poke?.id}</h2>

          <h2 className="pokeIdName ">{`${poke?.name
            .charAt(0)
            .toUpperCase()}${poke?.name.slice(1)}`}</h2>

          <div className="pokeDimensiones">
            <div className="pokeDimensiones__peso">
              <p className="pokeSubTittle">Peso</p>
              <p>{poke?.weight}</p>
            </div>

            <div className="pokeDimensiones__altura">
              <p className="pokeSubTittle">Altura</p>
              <p>{poke?.height}</p>
            </div>
          </div>
          <div className="typeHabilidades pokeSeparacion">
            <div>
              <p className="pokeSubTittle">Tipo</p>
              {poke?.types.map((type) => (
                <span className={poke?.types[0].type.name + " pokeType "} key={type.slot}>{`${type.type.name
                  .charAt(0)
                  .toUpperCase()}${type.type.name.slice(1)} `}</span>
              ))}
            </div>
            <div >
              <p className="pokeSubTittle">Habilidades</p>
              {poke?.abilities.map((ability) => (
                <span className="pokeHabilidad  " key={ability.slot}>{`${ability.ability.name
                  .charAt(0)
                  .toUpperCase()}${ability.ability.name.slice(1)} `}</span>
              ))}
            </div>
          </div>
          <div className="pokeSeparacion statsCard">
            <h3 className="pokeSubTittle pokeSeparacion">Stats</h3>
            {poke?.stats.map((stat) => {
              return (
                <div className="pokeStats" key={stat.stat.name}>
                  <h4>{stat.stat.name.toUpperCase()}</h4>
                  <h5>{stat.base_stat}/150</h5>
                  <div
                    className="stat"
                    style={{ width: (stat.base_stat / 150) * 100 + "%" }}
                  ></div>
                </div>
              );
            })}
          </div>
        </div>

        <div>
          <h3 className="pokeSubTittle pokeSeparacion">Movimientos</h3>
          <div className="pokeMovimiento__container">
            {poke?.moves.map((move) => (
              <div className="pokeMovimiento" key={move.move.name}>
                <span>{move.move.name.toUpperCase()}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PokedexId;
