import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import service from "../services/config.services";

function Signup() {
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState(null);

  const handleNameChange = (e) => setName(e.target.value);
  const handleEmailChange = (e) => setEmail(e.target.value);
  const handlePasswordChange = (e) => setPassword(e.target.value);

  const handleSignup = async (e) => {
    e.preventDefault();

    const newUser = {
      name,
      email,
      password,
    };

    //contactar backend para registrar información

    try {
      await service.post("/auth/signup", newUser);
      navigate("/login")

    } catch (error) {
        let errorCode = error.response.status
        let errorMessage = error.response.data.message
        if (errorCode = 400) {
            setErrorMessage(errorMessage)
        } else {
            console.log(error) //PENDIENTE: redireccionar a página ERROR
        }
    }
  };

  return (
    <div>
      <h1>Regístrate en EnVivo</h1>
      <form onSubmit={handleSignup}>
        <label> Nombre: </label>
        <input
          type="text"
          name="name"
          value={name}
          onChange={handleNameChange}
        />

        <br />

        <label> Email: </label>
        <input
          type="email"
          name="email"
          value={email}
          onChange={handleEmailChange}
        />

        <br />

        <label> Contraseña: </label>
        <input
          type="password"
          name="password"
          value={password}
          onChange={handlePasswordChange}
        />

        <br />

        <p>{errorMessage}</p>

        <button type="submit">Registarse</button>
      </form>
    </div>
  );
}

export default Signup;
