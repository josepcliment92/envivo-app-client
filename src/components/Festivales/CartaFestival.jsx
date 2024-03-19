import React from "react";
import { Link } from "react-router-dom";
import Card from "react-bootstrap/Card";

function CartaFestival(props) {
  return (
    <div>
      <Link to={`/festivales/detalle/${props.eachFestival["_id"]}`}>
        <Card>
          <Card.Img
            variant="top"
            src={props.eachFestival["image"]}
            alt={props.eachFestival["name"]}
          />
          <Card.Body>
            <Card.Title>{props.eachFestival["name"]} </Card.Title>
            <Card.Text>
              {`Del ${props.eachFestival["startDate"].slice(0, 10)} al ${props.eachFestival["endDate"].slice(0, 10)}`}{" "}
            </Card.Text>
          </Card.Body>
        </Card>
      </Link>
    </div>
  );
}

export default CartaFestival;
