import React from "react";
import Button from "react-bootstrap/esm/Button";
import Card from "react-bootstrap/Card";
import { Link } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../../context/auth.context";

function CartaDetalleFestival(props) {
  const festival = props.festival;
  let campingFestival = "";
  const separarArrayArtistas = festival["artists"].join(", ");
  const separarGeneros = festival["genres"].join(", ");

  const { userRole } = useContext(AuthContext);

  const initialStartDate = festival["startDate"].slice(0, 10);
  const initialEndDate = festival["endDate"].slice(0, 10);

  if (festival["campingArea"] === true) {
    campingFestival = "Sí 🏕️";
  } else campingFestival = "No 🤷‍♂️";

  return (
    <div >
      <div style={{display: "flex", justifyContent: "center"}}>
      <Card style={{ maxHeight: "1800px", width: "600px" }}>
        <div>
          <Card.Img style={{
            width: "100%",
            maxHeight: "700px",
            height: "100%",
            objectFit: "cover",
          }}
            variant="top"
            src={festival["image"]}
            alt={festival["name"]}
          />
          <Card.Body style={{
          }}>
            <Card.Title>{festival["name"]}</Card.Title>
            <Card.Text>
              <strong>¿Dónde se celebra?</strong>
              <br />
              {festival["city"]}, {festival["region"]}
            </Card.Text>
            <Card.Text>
              <strong>¿En qué fechas?</strong>
              <br />
              Del {initialStartDate} al {initialEndDate}
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
        </div>
      </Card>
      </div>
      <div >
      <Link to={`/festivales/edicion-festival/${festival._id}`}>
        {userRole === "admin" ? <Button style={{ margin: "20px"}}> Editar Festival </Button> : null}
      </Link>
      </div>
    </div>
  );
}

export default CartaDetalleFestival;
