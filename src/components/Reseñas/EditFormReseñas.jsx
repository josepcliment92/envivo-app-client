import React from 'react'
import service from '../../services/config.services';
import Form from "react-bootstrap/Form";
import { FormGroup, FormLabel, FormControl } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import { useState } from "react";


function EditFormReseñas(props) {

  const [yourFavouriteThing, setYourFavouriteThing] = useState(props.yourFavouriteThing);
  const [whatWouldYouImprove, setWhatWouldYouImprove] = useState(props.whatWouldYouImprove);
  const [moreObservations, setMoreObservations] = useState(props.moreObservations);
  const [overallRating, setOverallRating] = useState(props.overallRating);

  

  const handleSubmit = (e) => {
    e.preventDefault();

    const editReseña = {
      yourFavouriteThing: yourFavouriteThing,
      whatWouldYouImprove: whatWouldYouImprove,
      moreObservations: moreObservations,
      overallRating: overallRating
    };
    service.patch(`/resenas/${props.reseñaId}`, editReseña)
    .then(() => {
      props.getReseñasData()
      props.handleToggleFormEditReseñas(false)
    })
    .catch((err) => {
      console.log(err) //DEJAR MENSAJE
    })
  }

  const handleFavouriteThing = (e) => {
    let inputValue = e.target.value;
    setYourFavouriteThing(inputValue);
  };

  const handleImprove = (e) => {
    let inputValue = e.target.value;
    setWhatWouldYouImprove(inputValue);
  };

  const handleMoreObservations = (e) => {
    let inputValue = e.target.value;
    setMoreObservations(inputValue);
  };

  const handleOverallRating = (e) => {
    let inputValue = e.target.value;
    setOverallRating(inputValue);
  };

  return (
    <div>
      <Form onSubmit={handleSubmit}>
        <FormGroup>
          <FormLabel>¿Qué es lo que más te ha gustado?</FormLabel>
          <FormControl
            type="text"
            value={yourFavouriteThing}
            onChange={handleFavouriteThing}
          />
        </FormGroup>

        <FormGroup>
          <FormLabel>¿Hay algo que se pueda mejorar?</FormLabel>
          <FormControl
            type="text"
            value={whatWouldYouImprove}
            onChange={handleImprove}
          />
        </FormGroup>

        <FormGroup>
          <FormLabel>Opinión global del festival</FormLabel>
          <FormControl
            type="text"
            value={moreObservations}
            onChange={handleMoreObservations}
          />
        </FormGroup>

        <FormGroup>
          <Form.Label>Tu puntuación</Form.Label>
          <Form.Select
            type="number"
            placeholder="Puntúa del 1 al 10"
            value={overallRating}
            onChange={handleOverallRating}
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
  )
}

export default EditFormReseñas