import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import logoInicio from '/assets/iconos/logoInicio.svg';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import './IniciarSesion.css';
import Modal from '../components/ModalCredenciales';


const LoginForm = () => {
    const navigate = useNavigate();
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [openModal, setOpenModal] = useState(false);
    const [message, setMessage] = useState(false);
    const [showPassword, setShowPassword] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();

        const data = {
            user_name: username,
            password: password,
        };

        try {
            const response = await fetch("https://afhasiajuegos.tech/login.php", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(data),
            });

            const result = await response.json();

            if (result.message === "Login exitoso") {
                localStorage.setItem('idusuario', result.idusuario)
                setOpenModal(true);
                setMessage(true)
                setTimeout(() => {
                    navigate('/Inicio');
                  }, 2400); 
            } else {
                setOpenModal(true);
                setMessage(false);
                setTimeout(() => {
                    setOpenModal(false);
                  }, 1600); 
            }
        } catch (error) {
            console.error("Error en la solicitud:", error);
            setMessage("Hubo un problema al conectar con el servidor.");
        }
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
                            <div className="password-container">
                                <input
                                    type={showPassword ? 'text' : 'password'}  // Cambiar tipo de input según el estado
                                    id="password"
                                    className="input"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    placeholder="Contraseña"
                                    required
                                />
                                <button
                                    type="button"
                                    className="eye-icon"
                                    onClick={() => setShowPassword(!showPassword)}  // Cambiar el estado para mostrar/ocultar
                                >
                                    {!showPassword ? <FaEyeSlash /> : <FaEye />}
                                </button>
                            </div>
                        </div>
                        <button type="submit" className="button">INICIAR SESIÓN</button>
                    </form>
                </div>
                <div>
                    {openModal && (
                        <>
                            {message === true ? (
                                <Modal text={`Has iniciado sesión correctamente. ¡Bienvenido/a ${username}!`} type={'success'} />
                            ) : (
                                <Modal text={"Credenciales incorrectas. Intenta nuevamente."} />
                            )}
                        </>
                    )}
                </div>
            </div>
        </div>
    );
};

export default LoginForm;
