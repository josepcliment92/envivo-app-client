import React from "react";
import { Link } from "react-router-dom";
import Button from "react-bootstrap/Button";

function NotFound() {
  return (
    <div>
      <h2>Parece que ha habido un error...</h2>
      <br />
      <p>
        Lo sentimos, pero es posible que la página que intentas buscar no exista
        o que se haya producido un error temporal a la hora de acceder a ella.
      </p>
      <p>
        ¿Qué puedes hacer? Vuelve a intentarlo en unos minutos. Mientras
        esperas, te animamos a volver a nuestra sección de festivales y explorar
        los mejores planes para los próximos meses.
      </p>
      <p>¡Gracias por tu paciencia!</p>
      <p>👇</p>
      <Link to={"/festivales"}>
        <Button>Vuelve a los Festivales</Button>
      </Link>
    </div>
  );
}

export default NotFound;
