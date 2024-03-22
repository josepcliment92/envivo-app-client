import React from "react";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { Link } from "react-router-dom";
import { useContext } from "react"
import { AuthContext } from "../context/auth.context"

function MainNavbar() {

  const { userRole } = useContext(AuthContext)

  return (
    <Navbar
      expand="lg"
      className="bg-body-tertiary"
      fixed="top"
      bg="dark"
      data-bs-theme="dark"
      style={{ backgroundColor: "green" }}
    >
      <Container style={{ display: "flex", justifyContent: "flex-start"}}>
        <Nav>
          <Link to={"/"} style={{ margin: "5px", color: "white", textDecoration: "none" }}>
            EnVivo
          </Link>{" "}
          <Link to={"/festivales"} style={{ margin: "5px", color: "white", textDecoration: "none" }}>
            Festivales
          </Link>
          {/*{userRole === "user" || userRole === "admin" ? null : ( */}
            <Link to={"/registro"} style={{ margin: "5px", color: "white", textDecoration: "none" }}>
              Registro
            </Link>
          {/*)}*/}
          <Link to={"/acceso"} style={{ margin: "5px", color: "white", textDecoration: "none" }}>
            Acceso
          </Link>
        </Nav>
      </Container>
    </Navbar>
  );
}

export default MainNavbar;
