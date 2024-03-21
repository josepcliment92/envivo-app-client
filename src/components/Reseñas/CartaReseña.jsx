import React from "react";
import { useState, useEffect } from "react";
import Card from "react-bootstrap/Card";
import { Button } from "react-bootstrap";
import EditFormReseñas from "./EditFormReseñas";
import service from "../../services/config.services";
import { useContext } from "react";
import { AuthContext } from "../../context/auth.context";

function CartaReseña(props) {
  const [verFormEditReseñas, setVerFormEditReseñas] = useState(false);
  const [username, setUsername] = useState("");
  const [usernameEmail, setUsernameEmail] = useState("");

  const { userEmail } = useContext(AuthContext);
  const { userRole } = useContext(AuthContext);

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

  useEffect(() => {
    service
      .get(`/resenas/username/${props.eachReseñaId}`)
      .then((response) => {
        setUsername(response.data.user.name);
        setUsernameEmail(response.data.user.email);
      })
      .catch((error) => {
        console.log(error);
      });
  });

  return (
    <div>
      <Card>
        <Card.Body>
          <Card.Title> {username} </Card.Title>
          <Card.Text>
            <strong>Lo que más te ha gustado:</strong>{" "}
            {props.eachReseñaYourFavouriteThing}
          </Card.Text>
          <Card.Text>
            <strong>¿Qué mejorarías?</strong>{" "}
            {props.eachReseñaWhatWouldYouImprove}
          </Card.Text>
          <Card.Text>
            <strong>Opinión Global:</strong> {props.eachReseñaMoreObservations}
          </Card.Text>
          <Card.Text>
            <strong>Puntuación final:</strong> {props.eachReseñaOverallRating}
          </Card.Text>
        </Card.Body>
        {userEmail === usernameEmail || userRole === "admin" ? (
          <Button onClick={handleToggleFormEditReseñas}>Edita la reseña</Button>
        ) : null}
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
