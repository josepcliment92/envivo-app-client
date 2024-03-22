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
          <Card.Title style={{ textDecoration: "underline" }}>
            {" "}
            {username}{" "}
          </Card.Title>
          <Card.Text>
            <strong>Lo que más te ha gustado:</strong> <br />
            {props.eachReseñaYourFavouriteThing}
          </Card.Text>
          <Card.Text>
            <strong>¿Qué mejorarías?</strong> <br />
            {props.eachReseñaWhatWouldYouImprove}
          </Card.Text>
          <Card.Text>
            <strong>Opinión Global:</strong>
            <br />
            {props.eachReseñaMoreObservations}
          </Card.Text>
          <Card.Text>
            <strong>Puntuación final:</strong>
            <br />
            {props.eachReseñaOverallRating}
          </Card.Text>
        </Card.Body>
        <div style={{ justifyContent: "center" }}>
          {userEmail === usernameEmail || userRole === "admin" ? (
            <Button
              onClick={handleToggleFormEditReseñas}
              style={{ width: "320px" }}
            >
              Edita la reseña
            </Button>
          ) : null}
        </div>
        <br />
        {verFormEditReseñas === true ? (
          <div>
            <EditFormReseñas
              yourFavouriteThing={props.eachReseña.yourFavouriteThing}
              whatWouldYouImprove={props.eachReseña.whatWouldYouImprove}
              moreObservations={props.eachReseña.moreObservations}
              overallRating={props.eachReseña.overallRating}
              reseñaId={props.eachReseñaId}
              getReseñasData={props.getReseñasData}
              handleToggleFormEditReseñas={props.handleToggleFormEditReseñas}
            />
            <Button variant="danger" style={{marginBottom: "15px"}}onClick={handleDelete}> Borra la reseña </Button>
          </div>
        ) : null}
      </Card>
    </div>
  );
}

export default CartaReseña;
