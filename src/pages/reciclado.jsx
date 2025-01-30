import React, { useState } from "react";

const Login = () => {
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();

    const data = {
      user_name: userName,
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
        setMessage(`Bienvenido! ID de usuario: ${result.idusuario}`);
      } else {
        setMessage(result.message);
      }
    } catch (error) {
      console.error("Error en la solicitud:", error);
      setMessage("Hubo un problema al conectar con el servidor.");
    }
  };

  return (
    <div>
      <h2>Iniciar sesión</h2>
      <form onSubmit={handleLogin}>
        <input
          type="text"
          placeholder="Nombre de usuario"
          value={userName}
          onChange={(e) => setUserName(e.target.value)}
        />
        <input
          type="password"
          placeholder="Contraseña"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type="submit">Iniciar sesión</button>
      </form>
      <p>{message}</p>
    </div>
  );
};

export default Login;
