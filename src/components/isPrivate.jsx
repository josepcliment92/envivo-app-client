import React from "react";
import { useContext } from "react";
import { AuthContext } from "../context/auth.context";
import { Navigate } from "react-router-dom";

//Solo se usa en páginas, no en componentes anidados. Chequear que el usuario está logueado y entonces renderizar la página
function IsPrivate(props) {
  const { isLoggedIn } = useContext(AuthContext);

  if (isLoggedIn === true) {
    return props.children;
  } else {
    return <Navigate to="/acceso" />;
  }
}

export default IsPrivate;
