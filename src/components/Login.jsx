// src/components/Login.jsx
import React, { useState } from 'react';
import './Login.css'; // Para estilos opcionales
import imageLogin from '../assets/image_login.svg'; // Importar la imagen

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleLogin = (e) => {
    e.preventDefault();
    // Aquí puedes agregar lógica para validar el login
    if (username === 'admin' && password === '12345') {
      alert('Login successful!');
    } else {
      setError('Invalid credentials');
    }
  };

  return (
    <div className="login-container">
      {/* Div para la imagen */}
      <div className="image-login">
        <img src={imageLogin} alt="Login Illustration" />
      </div>

      {/* Div para el formulario de login */}
      <div className="form-container">
        <h2>INICIO DE SESION</h2>
        <form onSubmit={handleLogin}>
          <div>
            <label htmlFor="username">Nombre de usuario</label>
            <input
              type="text"
              id="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
              placeholder="Nombre de usuario"
            />
          </div>
          <div>
            <label htmlFor="password">Contraseña</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              placeholder="Contraseña"
            />
          </div>
          {error && <p className="error">{error}</p>}
          <button type="submit">INICIAR SESION</button>
        </form>
      </div>
    </div>
  );
};

export default Login;
