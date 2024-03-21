import React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import service from "../../services/config.services";
import Form from "react-bootstrap/Form";
import { FormGroup } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import genresArr from "../../utils/genresArr";
import citiesArr from "../../utils/ citiesArr";

function EditFormFestivales(props) {
  const festival = props.festival;
  console.log(festival.artists)
  const navigate = useNavigate();

 // if (festival.artists[0] === "" ) {
  //  festival.artists === festival.artists[0];
 // }

  const [name, setName] = useState(festival.name);
  const [image, setImage] = useState(festival.image);
  const [startDate, setStartDate] = useState(festival.startDate);
  const [endDate, setEndDate] = useState(festival.endDate);
  const [city, setCity] = useState(festival.city);
  const [region, setRegion] = useState(festival.region);
  const [artists, setArtists] = useState(festival.artists.join(", "));
  const [genres, setGenres] = useState(festival.genres);
  const [minPrize, setMinPrize] = useState(festival.minPrize);
  const [campingArea, setCampingArea] = useState(festival.campingArea);
  const [extraInfo, setExtraInfo] = useState(festival.extraInfo);

  const handleSubmit = (e) => {
    e.preventDefault();

    const editFestival = {
      name: name,
      image: image,
      startDate: startDate,
      endDate: endDate,
      city: city,
      region: region,
      artists: artists.split(",").map((genre) => genre.trim()),
      genres: genres,
      minPrize: minPrize,
      campingArea: campingArea,
      extraInfo: extraInfo,
    };

    service
      .put(`/festivales/${festival._id}`, editFestival)
      .then((response) => {
        navigate(`/festivales/detalle/${festival._id}`);
      })
      .catch((error) => {
        navigate("*")
      });
  };

  const handleDelete = () => {
    service.delete(`/festivales/${festival._id}`)
    .then(() => {
        navigate("/")
    })
    .catch((err) => {
        console.log(err)
      //navigate("*")
    })
  }

  const handleName = (e) => {
    let inputValue = e.target.value;
    setName(inputValue);
  };

  const handleImage = (e) => {
    let inputValue = e.target.value;
    setImage(inputValue);
  };

  const handleStartDate = (e) => {
    let inputValue = e.target.value;
    setStartDate(inputValue);
  };

  const handleEndDate = (e) => {
    let inputValue = e.target.value;
    setEndDate(inputValue);
  };

  const handleCity = (e) => {
    let inputValue = e.target.value;
    setCity(inputValue);
  };

  const handleRegion = (e) => {
    let inputValue = e.target.value;
    setRegion(inputValue);
  };

  const handleArtists = (e) => {
    let inputValue = e.target.value;
    setArtists(inputValue);
  };

  const handleGenres = (e) => {
    let inputValue = e.target.value;
    let genresStateClone = JSON.parse(JSON.stringify(genres));

    if (genresStateClone.includes(inputValue)) {
      let repeatedInputValue = genresStateClone.indexOf(inputValue);
      genresStateClone.splice(repeatedInputValue, 1);
    } else {
      genresStateClone.push(inputValue);
    }
    setGenres(genresStateClone);
  };

  const handleMinPrize = (e) => {
    let inputValue = e.target.value;
    setMinPrize(inputValue);
  };

  const handleCampingArea = (e) => {
    let inputValue = e.target.value;
    setCampingArea(inputValue);
  };

  const handleExtraInfo = (e) => {
    let inputValue = e.target.value;
    setExtraInfo(inputValue);
  };

  return (
    <div>
      <Form onSubmit={handleSubmit}>
        <FormGroup>
          <Form.Label>Nombre</Form.Label>
          <Form.Control
            type="text"
            value={name}
            onChange={handleName}
          />
        </FormGroup>

        <FormGroup>
          <Form.Label>URL de la imagen</Form.Label>
          <Form.Control
            type="url"
            value={image}
            onChange={handleImage}
          />
        </FormGroup>

        <FormGroup>
          <Form.Label>Fecha de inicio</Form.Label> 
          <Form.Control
            type="date"
            value={startDate} //quiero que aparezca ya puesta la fecha del festival, de primeras
            onChange={handleStartDate}
          />
        </FormGroup>

        <FormGroup>
          <Form.Label>Fecha de fin</Form.Label>
          <Form.Control
            type="date"
            value={endDate} //quiero que aparezca ya puesta la fecha del festival, de primeras
            onChange={handleEndDate}
          />
        </FormGroup>

        <FormGroup>
          <Form.Label>Ciudad</Form.Label>
          <Form.Select
            type="text"
            placeholder="Ciudad"
            value={city}
            onChange={handleCity}
          >
            {citiesArr.map((eachCity) => (
              <option key={eachCity} value={eachCity}>{eachCity}</option>
            ))}
          </Form.Select>
        </FormGroup>

        <FormGroup>
          <Form.Label>Comunidad Autónoma</Form.Label>
          <Form.Select
            type="text"
            placeholder="Comunidad Autónoma"
            value={region}
            onChange={handleRegion}
          >
            <option value="Andalucía"> Andalucía </option>
            <option value="Aragón"> Aragón </option>
            <option value="Asturias"> Asturias </option>
            <option value="Cantabria"> Cantabria </option>
            <option value="Castilla-La Mancha"> Castilla-La Mancha </option>
            <option value="Castilla y León"> Castilla y León </option>
            <option value="Cataluña"> Cataluña </option>
            <option value="Comunidad Valenciana"> Comunidad Valenciana </option>
            <option value="Extremadura"> Extremadura </option>
            <option value="Galicia"> Galicia </option>
            <option value="Islas Baleares"> Islas Baleares </option>
            <option value="Islas Canarias"> Islas Canarias </option>
            <option value="La Rioja"> La Rioja </option>
            <option value="Madrid"> Madrid </option>
            <option value="Andalucía"> Andalucía </option>
            <option value="Navarra"> Navarra </option>
            <option value="País Vasco"> País Vasco </option>
            <option value="Ceuta"> Ceuta </option>
            <option value="Melilla"> Melilla </option>
          </Form.Select>
        </FormGroup>

        <FormGroup>
          <Form.Label>Artistas principales:</Form.Label>
          <Form.Control
            type="text"
            value={artists}
            //placeholder={festival.artists}
            onChange={handleArtists}
          />
        </FormGroup>

        <FormGroup>
          <Form.Label>Géneros</Form.Label>
          {genresArr.map((eachGenre) => (
            <div key={`${eachGenre}`} className="mb-3">
              <Form.Check
                type="checkbox"
                id={`${eachGenre}`}
                label={`${eachGenre}`} //quiero que aquí aparezcan de primeras marcados los géneros que ya estaban seleccionados
                value={eachGenre}
                onClick={handleGenres}
              />
            </div>
          ))}
        </FormGroup>

        <FormGroup>
          <Form.Label>Precio base</Form.Label>
          <Form.Control
            type="number"
            value={minPrize}
            onChange={handleMinPrize}
          />
        </FormGroup>

        <FormGroup>
          <Form.Label>¿Cuenta con zona de camping?</Form.Label>
          <Form.Select
            type="text"
            value={campingArea}
            onChange={handleCampingArea}
          >
            <option value="false"> No </option>
            <option value="true"> Sí </option>
          </Form.Select>
        </FormGroup>

        <FormGroup>
          <Form.Label>Más información</Form.Label>
          <Form.Control
            as="textarea"
            value={extraInfo}
            onChange={handleExtraInfo}
          />
        </FormGroup>

        <Button type="submit">Actualizar</Button>
      </Form>
      <Button
              variant="danger"
              size="lg"
              onClick={handleDelete}
            >
              Borrar festival
            </Button>
    </div>
  )
}

export default EditFormFestivales;
