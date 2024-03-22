import { createContext, useState } from "react";
import service from "../services/config.services";
import { useEffect } from "react";

//componente que transmite el contexto
const AuthContext = createContext();

//componente envoltorio con todos los contextos a pasar
function AuthWrapper(props) {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [loggedUserId, setLoggedUserId] = useState(null);
  const [userRole, setUserRole] = useState(null);
  const [userEmail, setUserEmail] = useState(null);

  const authenticateUser = async () => {
    const storedToken = localStorage.getItem("authToken");

    try {
      //verifica que token es válido
      const response = await service.get("/auth/verify");
      //si el token es válido, permitimos acceso
      setIsLoggedIn(true);
      setLoggedUserId(response.data._id);
      setUserRole(response.data.role);
      setUserEmail(response.data.email);
    } catch (error) {
      //el token no es válido o no existe
      setIsLoggedIn(false);
      setLoggedUserId(null);
      setUserRole(null);
      setUserEmail(null);
    }
  };

  const passedContext = {
    isLoggedIn,
    loggedUserId,
    userRole,
    userEmail,
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
