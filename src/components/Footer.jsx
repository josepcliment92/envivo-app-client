import React from "react";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { Link } from "react-router-dom";

function Footer() {
  return (
    <Navbar
      expand="lg"
      className="bg-body-tertiary"
      bg="dark"
      data-bs-theme="dark"
      fixed="bottom"
    >
      <Container style={{ display: "flex", justifyContent: "flex-end" }}>
        <Nav>
          <Link
            to={"/contacto"}
            style={{ margin: "5px", color: "white", textDecoration: "none" }}
          >
            Contacto
          </Link>
          <Link
            to={"/quienes-somos"}
            style={{ margin: "5px", color: "white", textDecoration: "none" }}
          >
            Quienes somos
          </Link>
        </Nav>
      </Container>
    </Navbar>
  );
}

export default Footer;
