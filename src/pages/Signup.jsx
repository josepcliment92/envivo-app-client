import { useState } from "react";
import { useNavigate } from "react-router-dom";
import service from "../services/config.services";
import { Button, Form } from "react-bootstrap";
import { FormLabel, FormControl } from "react-bootstrap";

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

    try {
      await service.post("/auth/signup", newUser);
      navigate("/acceso");
    } catch (error) {
      let errorCode = error.response.status;
      let errorMessage = error.response.data.message;
      if ((errorCode = 400)) {
        setErrorMessage(errorMessage);
      } else {
        navigate("/not-found");
      }
    }
  };

  return (
    <div>
      <h1>Regístrate en EnVivo</h1>
      <Form onSubmit={handleSignup}>
        <FormLabel> Nombre </FormLabel>
        <FormControl
          type="text"
          name="name"
          value={name}
          onChange={handleNameChange}
        />

        <br />

        <FormLabel> Email </FormLabel>
        <FormControl
          type="email"
          name="email"
          value={email}
          onChange={handleEmailChange}
        />

        <br />

        <FormLabel> Contraseña </FormLabel>
        <FormControl
          type="password"
          name="password"
          value={password}
          onChange={handlePasswordChange}
        />

        <br />

        <p>{errorMessage}</p>

        <Button type="submit">Registrarse</Button>
      </Form>
    </div>
  );
}

export default Signup;
