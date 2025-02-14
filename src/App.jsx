import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import './App.css';

// - - - - - - - - - - -  R U T A S - - - - - - - - - - -
import IniciarSesion from './pages/IniciarSesion';
import Inicio from './pages/Inicio';

import RealizarOracion from './pages/Juegos/1-Observa RealizaOracion';
import ArmadorRempecabezas from './pages/Juegos/2-ArmadoresConAcciones';
import EncuentraParejas from './pages/Juegos/3-EncuentraParejas';
import AsociaImagenes from './pages/Juegos/4-AsociacionImagenes';
import ObjetosCotidianos from './pages/Juegos/5-ObjetosCotidianos';

const App = () => {
  const [id, setId] = useState(localStorage.getItem('idusuario'));

  useEffect(() => {
    setId(localStorage.getItem('idusuario'));
  }, [id]);

  const login = (userData) => {
    setId(userData)
  };

  const CerrarSesion = (userData) => {
    setId(null)
    localStorage.removeItem('idusuario');
  };

  useEffect(() => {
    const handleUnload = () => {
      localStorage.removeItem('idusuario');
      setId(null);
    };

    window.addEventListener("beforeunload", handleUnload);

    return () => {
      window.removeEventListener("beforeunload", handleUnload);
    };
  }, []);

  return (
    <div className="App">
      {id === null ? (
        <>
          <Routes>
            <Route path='/' element={<IniciarSesion login={login} />}></Route>
            <Route path='*' element={<Navigate to="/"></Navigate>}></Route>
          </Routes>
        </>
      ) : (
        <Routes>
          <Route path="/" element={<Inicio CerrarSesion={CerrarSesion} />} />
          <Route path='/realizar-oración' element={<RealizarOracion />} />
          <Route path='/armar-rompecabeza' element={<ArmadorRempecabezas />} />
          <Route path='/encontrar-pares' element={<EncuentraParejas />} />
          <Route path='/asociar-imagenes' element={<AsociaImagenes />} />
          <Route path='/buscar-objetos' element={<ObjetosCotidianos />} />
          <Route path="*" element={<Inicio CerrarSesion={CerrarSesion} />} />
        </Routes>
      )}
    </div>
  );
};

export default App;
