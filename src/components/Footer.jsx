import React from 'react'
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { Link } from "react-router-dom";

function Footer() {
  return (
    <Navbar
      expand="lg"
      className="bg-body-tertiary"
      sticky="bottom"
      style={{ backgroundColor: "green" }}
    >
      <Container style={{ display: "flex", justifyContent: "flex-end"}}>
        <Nav>
          <Link to={"/contacto"} style={{ margin: "5px", color: "white" }}>
            Contacto
          </Link>
          <Link to={"/quienes-somos"} style={{ margin: "5px", color: "white"  }}>
            Quienes somos
          </Link>
        </Nav>
      </Container>
    </Navbar>
  )
}

export default Footer