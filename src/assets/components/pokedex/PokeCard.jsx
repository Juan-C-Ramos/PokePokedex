import React, { useEffect } from "react";
import useFetch from "../../hooks/useFetch";
import "./PokeCard.css";
import { useNavigate } from "react-router-dom";

const PokeCard = ({ poke }) => {
  const [pokeInfo, getPokeInfo] = useFetch();
  const navigate = useNavigate();

  useEffect(() => {
    getPokeInfo(poke.url);
  }, []);

  const handlePokeCard = () => {
    navigate(`/pokedex/${pokeInfo.id}`);
  };

  return (
    <div
      onClick={handlePokeCard}
      className={pokeInfo?.types[0].type.name + " pokeCard"}
    >
      <figure className="pokeFoto">
        <img className="pokeFotoImg"
          src={pokeInfo?.sprites.other["official-artwork"].front_default}
          alt={poke.name}
        />
      </figure>
      <div className="pokeInfo theme">
        <div>
          <h2 className="pokeName">{`${pokeInfo?.name.charAt(0).toUpperCase()}${pokeInfo?.name.slice(
            1
          )}`}</h2>
          <p className="types">
            {pokeInfo?.types.map((type) => (
              <span className={type.type.name + " type"} key={type.slot}>{`${type.type.name
                .charAt(0)
                .toUpperCase()}${type.type.name.slice(1)} `}</span>
            ))}
          </p>
        </div>

        <br />

        <div className="stats">
          {pokeInfo?.stats.map(
            (stat) =>
              !stat.stat.name.includes("-") && (
                <div key={stat.stat.name}>
                  <span className="stat__name">{stat.stat.name.toUpperCase()}</span>
                  <p className="stat__value">{stat.base_stat}</p>
                </div>
              )
          )}
        </div>
      </div>
    </div>
  );
};

export default PokeCard;
