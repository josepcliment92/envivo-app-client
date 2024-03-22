import React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Form from "react-bootstrap/Form";
import { FormGroup, FormLabel, FormControl } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import service from "../../services/config.services";

function FormReseñas(props) {
  const [yourFavouriteThing, setYourFavouriteThing] = useState("");
  const [whatWouldYouImprove, setWhatWouldYouImprove] = useState("");
  const [moreObservations, setMoreObservations] = useState("");
  const [overallRating, setOverallRating] = useState(0);

  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    const newReseña = {
      festival: props.festivalId,
      yourFavouriteThing: yourFavouriteThing,
      whatWouldYouImprove: whatWouldYouImprove,
      moreObservations: moreObservations,
      overallRating: overallRating,
    };
    service
      .post(`/resenas/${props.festivalId}`, newReseña)
      .then((response) => {
        //console.log(response.data)
        props.getReseñasData();
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div>
      <Form onSubmit={handleSubmit} style={{ marginTop: "20px" }}>
        <FormGroup>
          <FormLabel>
            <strong>¿Qué es lo que más te ha gustado?</strong>
          </FormLabel>
          <FormControl
            type="text"
            value={yourFavouriteThing}
            onChange={(e) => setYourFavouriteThing(e.target.value)}
          />
        </FormGroup>
        <br />
        <FormGroup>
          <FormLabel>
            <strong>¿Hay algo que se pueda mejorar?</strong>
          </FormLabel>
          <FormControl
            type="text"
            value={whatWouldYouImprove}
            onChange={(e) => setWhatWouldYouImprove(e.target.value)}
          />
        </FormGroup>
        <br />
        <FormGroup>
          <FormLabel>
            <strong>Opinión global del festival</strong>
          </FormLabel>
          <FormControl
            type="text"
            value={moreObservations}
            onChange={(e) => setMoreObservations(e.target.value)}
          />
        </FormGroup>
        <br />
        <FormGroup>
          <Form.Label>
            <strong>Tu puntuación</strong>
          </Form.Label>
          <Form.Select
            type="number"
            placeholder="Puntúa del 1 al 10"
            value={overallRating}
            onChange={(e) => setOverallRating(e.target.value)}
          >
            <option value="1"> 1 </option>
            <option value="2"> 2 </option>
            <option value="3"> 3 </option>
            <option value="4"> 4 </option>
            <option value="5"> 5 </option>
            <option value="6"> 6 </option>
            <option value="7"> 7 </option>
            <option value="8"> 8 </option>
            <option value="9"> 9 </option>
            <option value="10"> 10 </option>
          </Form.Select>
        </FormGroup>
        <Button style={{ marginTop: "20px" }} type="submit">
          Enviar
        </Button>
      </Form>
    </div>
  );
}

export default FormReseñas;
