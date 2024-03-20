import React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Form from "react-bootstrap/Form";

function FormReseñas() {
  const [yourFavouriteThing, setYourFavouriteThing] = useState("");
  const [whatWouldYouImprove, setWhatWouldYouImprove] = useState("");
  const [moreObservations, setMoreObservations] = useState("");
  const [overallRating, setOverallRating] = useState(0);

  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    const newReseña = {
      festival: xx, //PENDIENTE, TRAER INFO CON PROPS
      yourFavouriteThing: yourFavouriteThing,
      whatWouldYouImprove: whatWouldYouImprove,
      moreObservations: moreObservations,
      overallRating: overallRating,
    };
    service
      .post("/resenas/:festivalId", newReseña)
      .then((response) => {
        console.log(response.data); //comprobar que es el ID del festival
        navigate(`/festivales/detalle/${response.data}`);
        setYourFavouriteThing;
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div>
      <Form onSubmit={handleSubmit}>
        <FormGroup>
          <FormLabel>¿Qué es lo que más te ha gustado?</FormLabel>
          <FormControl
            type="text"
            value={yourFavouriteThing}
            onChange={(e) => setYourFavouriteThing(e.target.value)}
          />
        </FormGroup>

        <FormGroup>
          <FormLabel>¿Hay algo que se pueda mejorar?</FormLabel>
          <FormControl
            type="text"
            value={whatWouldYouImprove}
            onChange={(e) => setWhatWouldYouImprove(e.target.value)}
          />
        </FormGroup>

        <FormGroup>
          <FormLabel>Opinión global del festival</FormLabel>
          <FormControl
            type="text"
            value={moreObservations}
            onChange={(e) => setMoreObservations(e.target.value)}
          />
        </FormGroup>

        <FormGroup>
          <Form.Label>Tu puntuación</Form.Label>
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
        <Button type="submit">Enviar</Button>
      </Form>
    </div>
  );
}

export default FormReseñas;
