import React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import service from "../../services/config.services";
import Form from "react-bootstrap/Form";
import { FloatingLabel, FormGroup } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import genresArr from "../../utils/genresArr";
import citiesArr from "../../utils/ citiesArr";

function FormFestivales() {
  const [name, setName] = useState("");
  const [image, setImage] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [city, setCity] = useState("");
  const [region, setRegion] = useState("");
  const [artists, setArtists] = useState([]);
  const [genres, setGenres] = useState([]);
  const [minPrize, setMinPrize] = useState(0);
  const [campingArea, setCampingArea] = useState(false);
  const [extraInfo, setExtraInfo] = useState("");

  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    const newFestival = {
      name: name,
      image: image,
      startDate: startDate,
      endDate: endDate,
      city: city,
      region: region,
      artists: artists.split(",").map(genre => genre.trim()),
      genres: genres,
      minPrize: minPrize,
      campingArea: campingArea,
      extraInfo: extraInfo,
    };

    service
      .post("/festivales", newFestival)
      .then((response) => {
        //console.log(response.data) --> cambiar la response en backend para que me de el Id del festival que acabo de crear. ¿cómo?
        navigate(`/festivales/detalle/${response.data._id}`);
      })
      .catch((error) => {
        console.log(error)
      });
  };

  return (
    <div>
      <Form onSubmit={handleSubmit}>
        <FormGroup>
          <Form.Label>Nombre</Form.Label>
          <Form.Control
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </FormGroup>

        <FormGroup>
          <Form.Label>URL de la imagen</Form.Label>
          <Form.Control
            type="url"
            value={image}
            onChange={(e) => setImage(e.target.value)}
          />
        </FormGroup>

        <FormGroup>
          <Form.Label>Fecha de inicio</Form.Label>
          <Form.Control
            type="date"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
          />
        </FormGroup>

        <FormGroup>
          <Form.Label>Fecha de fin</Form.Label>
          <Form.Control
            type="date"
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
          />
        </FormGroup>

        <FormGroup>
          <Form.Label>Ciudad</Form.Label>
          <Form.Select
            type="text"
            placeholder="Ciudad"
            value={city}
            onChange={(e) => setCity(e.target.value)}
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
            onChange={(e) => setRegion(e.target.value)}
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
            placeholder="Sepáralos con comas"
            onChange={(e) => setArtists(e.target.value)}
          />
        </FormGroup>

        <FormGroup>
          <Form.Label>Géneros</Form.Label>
          {genresArr.map((eachGenre) => (
            <div key={`${eachGenre}`} className="mb-3">
              <Form.Check
                type="checkbox"
                id={`${eachGenre}`}
                label={`${eachGenre}`}
                value={eachGenre}
                onClick={(e) => setGenres(e.target.value)}
              />
            </div>
          ))}
        </FormGroup>

        <FormGroup>
          <Form.Label>Precio base</Form.Label>
          <Form.Control
            type="number"
            value={minPrize}
            onChange={(e) => setMinPrize(e.target.value)}
          />
        </FormGroup>

        <FormGroup>
          <Form.Label>¿Cuenta con zona de camping?</Form.Label>
          <Form.Select
            type="text"
            value={campingArea}
            onChange={(e) => setCampingArea(e.target.value)}
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
            onChange={(e) => setExtraInfo(e.target.value)}
          />
        </FormGroup>

        <Button type="submit">Añadir</Button>
      </Form>
    </div>
  );
}

export default FormFestivales;
