import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
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
  return (
    <div className="App">
      {/* <Login /> */}
      <Router>
        <Routes>
          <Route path="/" element={<IniciarSesion />} />
          <Route path='/Inicio' element={<Inicio />} />
          <Route path='/realizar-oración' element={<RealizarOracion />} />
          <Route path='/armar-rompecabeza' element={<ArmadorRempecabezas />} />
          <Route path='/encontrar-pares' element={<EncuentraParejas />} />
          <Route path='/asociar-imagenes' element={<AsociaImagenes />} />
          <Route path='/buscar-objetos' element={<ObjetosCotidianos />} />
          <Route path="*" element={<IniciarSesion />} />
        </Routes>
      </Router>


    </div>
  );
};

export default App;
