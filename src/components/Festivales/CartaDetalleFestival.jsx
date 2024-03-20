import React from "react";
import Button from "react-bootstrap/esm/Button";
import Card from "react-bootstrap/Card";
import { Link } from "react-router-dom";

function CartaDetalleFestival(props) {
  const festival = props.festival;
  let campingFestival = "";
  const separarArrayArtistas = festival["artists"].join(", ");
  const separarGeneros = festival["genres"].join(", ");

  if (festival["campingArea"] === true) {
    campingFestival = "Sí 🏕️";
  } else campingFestival = "No 🤷‍♂️";

  return (
    <div>
      <Card>
        <Card.Img
          variant="top"
          src={festival["image"]}
          alt={festival["name"]}
        />
        <Card.Body>
          <Card.Title>{festival["name"]}</Card.Title>
          <Card.Text>
            <strong>¿Dónde se celebra?</strong>
            <br />
            {festival["city"]}, {festival["region"]}
          </Card.Text>
          <Card.Text>
            <strong>¿En qué fechas?</strong>
            <br />
            Del {festival["startDate"].slice(0, 10)} al{" "}
            {festival["endDate"].slice(0, 10)}
          </Card.Text>
          <Card.Text>
            <strong>Artistas principales:</strong>
            <br />
            {separarArrayArtistas}
          </Card.Text>
          <Card.Text>
            <strong>Géneros musicales:</strong>
            <br />
            {separarGeneros}
          </Card.Text>
          <Card.Text>
            <strong>Precio base</strong>
            <br />
            {festival["minPrize"]}€
          </Card.Text>
          <Card.Text>
            <strong>¿Podrás disfrutar de camping?</strong>
            <br />
            {campingFestival}
          </Card.Text>
          <Card.Text>
            <strong>Más Información</strong>
            <br />
            {festival["extraInfo"]}
          </Card.Text>
        </Card.Body>
      </Card>
      <Button> Añadir a favoritos </Button> {/*Este botón debería ser visible solo para user y admin*/}
      <Link to={`/festivales/edicion-festival/${festival._id}`}> 
      <Button> Editar Festival </Button> {/*Este botón debería ser visible solo para admin*/}
      </Link>
    </div>
  );
}

export default CartaDetalleFestival;
