import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import service from "../services/config.services";

function Login() {

    const navigate = useNavigate();

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [errorMessage, setErrorMessage] = useState(null);
  
    const handleNameChange = (e) => setName(e.target.value);
    const handleEmailChange = (e) => setEmail(e.target.value);
    const handlePasswordChange = (e) => setPassword(e.target.value);
  
    const handleLogin = async (e) => {
      e.preventDefault();
  
      const credentials = {
        name,
        email,
        password,
      };

      try {

        //1. valida credenciales usuario
        const response = await service.post("/auth/login", credentials)

        //2. almacenar el token en localStorage
        localStorage.setItem("authToken", response.data.authToken)

        //3. validar token y actualizar estados de auth del usuario
        await authenticateUser()

        //4. redireccionar a página
        navigate("/perfil") //DECIDIR a qué página quiero redireccionar después del login

      } catch (error) {
        let errorCode = error.response.status
        let errorMessage = error.response.data.message
        if (errorCode = 400) {
            setErrorMessage(errorMessage)
        } else {
            console.log(error) //PENDIENTE: redireccionar a página ERROR
        }
      }



    }


  return (
    <div>
      <h1>Accede a EnVivo</h1>

      <form onSubmit={handleLogin}>
      <label>Nombre:</label>
        <input
          type="text"
          name="name"
          value={name}
          onChange={handleNameChange}
        />

        <br />
        
        <label>Correo Electronico:</label>
        <input
          type="email"
          name="email"
          value={email}
          onChange={handleEmailChange}
        />

        <br />

        <label>Contraseña:</label>
        <input
          type="password"
          name="password"
          value={password}
          onChange={handlePasswordChange}
        />

        <br />

        <p>{errorMessage}</p>

        <button
          type="submit"
        >
          Acceder
        </button>
      </form>
    </div>
  );
}

export default Login;