import React from 'react'
import { useContext } from "react"
import { AuthContext } from "../context/auth.context"
import { Navigate } from "react-router-dom"

//solo se usa en páginas, no en componentes anidados.chequear que el usuario está logueado y entonces renderizar la página
function IsAdmin(props) {

  const { userRole } = useContext(AuthContext)

  if (userRole === "admin") {
    return props.children // la pagina
  } else {
    // ya no puedes acceder, redireccionamos a una pagina publica como /login
    return <Navigate to="/festivales"/>
  }

}

export default IsAdmin