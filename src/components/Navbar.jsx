
import React from "react";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { Link } from "react-router-dom";

function MainNavbar() {
  return (
    <Navbar
      expand="lg"
      className="bg-body-tertiary"
      sticky="top"
      style={{ backgroundColor: "green" }}
    >
      <Container style={{ display: "flex", justifyContent: "flex-start"}}>
        <Nav>
          <Link to={"/"} style={{ margin: "5px", color: "white" }}>
            Home
          </Link>{" "}
          <Link to={"/festivales"} style={{ margin: "5px", color: "white"  }}>
            Festivales
          </Link>
          <Link to={"/registro"} style={{ margin: "5px", color: "white"  }}>
            Registro
          </Link>
          <Link to={"/acceso"} style={{ margin: "5px", color: "white" }}>
            Acceso
          </Link>
          <Link to={"/perfil"} style={{ margin: "5px", color: "white"  }}>
            Perfil
          </Link>
        </Nav>
      </Container>
    </Navbar>
  );
}

export default MainNavbar;
