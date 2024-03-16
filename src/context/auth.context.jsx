import { createContext, useState } from "react";
import axios from "axios";
import { useEffect } from "react";

//componente que transmite el contexto
const AuthContext = createContext();

//componente envoltorio con todos los contextos a pasar

function AuthWrapper(props) {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [loggedUserId, setLoggedUserId] = useState(null);
  const [userRole, setUserRole] = useState(null);

  const authenticateUser = async () => {
    const storedToken = localStorage.getItem("authToken");

    try {
      //verifica que token es válido
      const response = await axios.get(
        "http://localhost:5005/api/auth/verify",
        { headers: { authorization: `Bearer ${storedToken}` } }
      );

      //si el token es válido, permitimos acceso
      setIsLoggedIn(true);
      setLoggedUserId(response.data._id);
      setUserRole(response.data.role);
    } catch (error) {
      //el token no es válido o no existe
      setIsLoggedIn(false);
      setLoggedUserId(null);
      setUserRole(null);
    }
  };

  const passedContext = {
    isLoggedIn,
    loggedUserId,
    userRole,
    authenticateUser,
  };

  useEffect(() => {
    authenticateUser();
  }, []);

  return (
    <AuthContext.Provider value={passedContext}>
      {props.children}
    </AuthContext.Provider>
  );
}

export { AuthContext, AuthWrapper };
