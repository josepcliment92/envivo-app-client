import React from "react";
import { useState } from "react";
import Card from "react-bootstrap/Card";
import { Button } from "react-bootstrap";
import EditFormReseñas from "./EditFormReseñas";
import service from "../../services/config.services";

function CartaReseña(props) {
  const [verFormEditReseñas, setVerFormEditReseñas] = useState(false);

  const handleToggleFormEditReseñas = () => {
    setVerFormEditReseñas(!verFormEditReseñas);
  };

  const handleDelete = () => {
    service
      .delete(`resenas/${props.eachReseñaId}`)
      .then(() => {
        props.getReseñasData();
      })
      .catch((err) => {
        console.log(err); //PULIR ESTO, QUE SALTE ALGÚN MENSAJE
      });
  };

  return (
    <div>
      <Card>
        <Card.Body>
          <Card.Title> Nombre Usuario </Card.Title>
          {/*llamada al backend para popular el nombre del user. tenemos su id. Como idea*/}
          <Card.Text>
            <strong>Lo que más te ha gustado:</strong>{" "}
            {props.eachReseñaYourFavouriteThing}
          </Card.Text>
          <Card.Text>
            <strong>¿Qué mejorarías?</strong>{" "}
            {props.eachReseñaWhatWouldYouImprove}
          </Card.Text>
          <Card.Text>
            <strong>Opinión Global:</strong>{" "}
            {props.eachReseñaMoreObservations}
          </Card.Text>
          <Card.Text>
            <strong>Puntuación final:</strong> {props.eachReseñaOverallRating}
          </Card.Text>
        </Card.Body>
        <Button onClick={handleToggleFormEditReseñas}>Edita tu reseña</Button>
        <br />
        {verFormEditReseñas === true ? (
          <div>
            <EditFormReseñas
              yourFavouriteThing={props.eachReseña.yourFavouriteThing}
              whatWouldYouImprove={props.eachReseña.whatWouldYouImprove}
              moreObservations={props.eachReseña.moreObservations}
              overallRating={props.eachReseña.overallRating}
              reseñaId={props.eachReseñaId}
              //setReseñas={props.setReseñas}
              getReseñasData={props.getReseñasData}
              handleToggleFormEditReseñas={props.handleToggleFormEditReseñas}
            />
            <Button onClick={handleDelete}> Borra la reseña </Button>
          </div>
        ) : null}
      </Card>
    </div>
  );
}

export default CartaReseña;
