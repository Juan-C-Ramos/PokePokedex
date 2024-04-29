import React, { useRef } from 'react'
import { useDispatch } from 'react-redux';
import { setTrainerName } from '../store/slices/trainerName.slice.js';
import { useNavigate } from 'react-router-dom';
import "../assets/components/Home/Home.css"

const Home = () => {
    const textInput = useRef();
    const disPatch = useDispatch();

    const navigate = useNavigate();

    const handleSubmit = (event) => {
        event.preventDefault();
        disPatch(setTrainerName(textInput.current.value.trim()))
        textInput.current.value = "";
        navigate('/pokedex');
        

    }
  return (
    <div className='home'>
      <h1 className='tittle'>Pokédex</h1>
      <div className='login'>
        <h1>Hola entrenador</h1>
        <h2>Para iniciar escribe tu nombre</h2>
        <form className='login__form' onSubmit={handleSubmit}>
          <input className='input__login' ref={textInput} type="text" name="name" id="name" />
          <button className='login__button' type="submit">  Empezar</button>
        </form>
      </div>
    </div>
  )
}

export default Home
