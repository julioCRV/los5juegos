import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import logoInicio from '../assets/iconos/logoInicio.svg'
import './IniciarSesion.css'; // Importa el archivo CSS

const LoginForm = () => {
    const navigate = useNavigate();
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        // console.log('Nombre de Usuario:', username);
        // console.log('Contraseña:', password);
        navigate('/Inicio')
    };

    return (
        <div className="login-container">
        <div className='ContenedorPrincipal'>
            <div className='div1'>
                <img src={logoInicio} className='imagen' alt="Logo" />
            </div>
            <div className='div2'>

                <h1 className="title">INICIO DE SESIÓN</h1>
                <form onSubmit={handleSubmit} >
                    <div className="form-group">
                        <label htmlFor="username" className="label">Nombre de usuario</label>
                        <input
                            type="text"
                            id="username"
                            className="input"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            placeholder="Nombre de usuario"
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="password" className="label">Contraseña</label>
                        <input
                            type="password"
                            id="password"
                            className="input"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder="Contraseña"
                            required
                        />
                    </div>
                    <button type="submit" className="button">INICIAR SESIÓN</button>
                </form>

            </div>
        </div>
        </div>
    );
};

export default LoginForm;
