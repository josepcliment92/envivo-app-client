import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import service from "../services/config.services";
import { AuthContext } from "../context/auth.context";
import { Button, Form } from "react-bootstrap";
import { FormLabel, FormControl } from "react-bootstrap";

function Login() {

  const { authenticateUser } = useContext(AuthContext)  
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
        console.log(error)
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

      <Form onSubmit={handleLogin}>
      <FormLabel>Nombre:</FormLabel>
        <FormControl
          type="text"
          name="name"
          value={name}
          onChange={handleNameChange}
        />

        <br />
        
        <FormLabel>Correo Electronico:</FormLabel>
        <FormControl
          type="email"
          name="email"
          value={email}
          onChange={handleEmailChange}
        />

        <br />

        <FormLabel>Contraseña:</FormLabel>
        <FormControl
          type="password"
          name="password"
          value={password}
          onChange={handlePasswordChange}
        />

        <br />

        <p>{errorMessage}</p>

        <Button
          type="submit"
        >
          Acceder
        </Button>
      </Form>
    </div>
  );
}

export default Login;
