import React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import service from "../../services/config.services";
import Form from "react-bootstrap/Form";
import { FormGroup } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import genresArr from "../../utils/genresArr";
import citiesArr from "../../utils/ citiesArr";

function FormFestivales() {
  const [name, setName] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [city, setCity] = useState("");
  const [region, setRegion] = useState("");
  const [artists, setArtists] = useState("");
  const [genres, setGenres] = useState([]);
  const [minPrize, setMinPrize] = useState(0);
  const [campingArea, setCampingArea] = useState(false);
  const [extraInfo, setExtraInfo] = useState("");

  const [imageUrl, setImageUrl] = useState(null);
  const [isUploading, setIsUploading] = useState(false); // for a loading animation effect

  const navigate = useNavigate();

  const handleFileUpload = async (event) => {
    // console.log("The file to be uploaded is: ", e.target.files[0]);

    if (!event.target.files[0]) {
      // to prevent accidentally clicking the choose file button and not selecting a file
      return;
    }

    setIsUploading(true); // to start the loading animation

    const uploadData = new FormData(); // images and other files need to be sent to the backend in a FormData
    uploadData.append("image", event.target.files[0]);
    //                   |
    //     this name needs to match the name used in the middleware in the backend => uploader.single("image")

    try {
      const response = await service.post("/upload", uploadData);
      // !IMPORTANT: Adapt the request structure to the one in your proyect (services, .env, auth, etc...)

      setImageUrl(response.data.imageUrl);
      //                          |
      //     this is how the backend sends the image to the frontend => res.json({ imageUrl: req.file.path });

      setIsUploading(false); // to stop the loading animation
    } catch (error) {
      navigate("/not-found");
    }
  };

  const handleGenre = (e) => {
    console.log(e.target.value);
    const genreToAdd = e.target.value;
    let genresStateClone = JSON.parse(JSON.stringify(genres));

    if (genresStateClone.includes(genreToAdd)) {
      let repeatedGenreIndex = genresStateClone.indexOf(genreToAdd);
      genresStateClone.splice(repeatedGenreIndex, 1);
    } else {
      genresStateClone.push(genreToAdd);
    }

    setGenres(genresStateClone);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const newFestival = {
      name: name,
      image: imageUrl,
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
      .post("/festivales", newFestival)
      .then((response) => {
        navigate(`/festivales/detalle/${response.data}`);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div>
      <br />
      <Form onSubmit={handleSubmit}>
        <FormGroup>
          <Form.Label><strong>Nombre</strong></Form.Label>
          <Form.Control
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </FormGroup>
<br />
        <FormGroup>
          <Form.Label><strong>Imagen</strong></Form.Label>
          <Form.Control
            type="file"
            name="image"
            onChange={handleFileUpload}
            disabled={isUploading}
          />
          <br />
        </FormGroup>
        {isUploading ? <h3>Subiendo la imagen...</h3> : null}
        <FormGroup>
          <Form.Label><strong>Fecha de inicio</strong></Form.Label>
          <Form.Control
            type="date"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
          />
        </FormGroup>
        <br />
        <FormGroup>
          <Form.Label><strong>Fecha de fin</strong></Form.Label>
          <Form.Control
            type="date"
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
          />
        </FormGroup>
        <br />
        <FormGroup>
          <Form.Label><strong>Ciudad</strong></Form.Label>
          <Form.Select
            type="text"
            placeholder="Ciudad"
            value={city}
            onChange={(e) => setCity(e.target.value)}
          >
            {citiesArr.map((eachCity) => (
              <option key={eachCity} value={eachCity}>
                {eachCity}
              </option>
            ))}
          </Form.Select>
        </FormGroup>
        <br />
        <FormGroup>
          <Form.Label><strong>Comunidad Autónoma</strong></Form.Label>
          <Form.Select
            type="text"
            placeholder="Comunidad Autónoma"
            value={region}
            onChange={(e) => setRegion(e.target.value)}
          >
            <option> Elige la CCAA </option>
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
            <option value="Navarra"> Navarra </option>
            <option value="País Vasco"> País Vasco </option>
            <option value="Ceuta"> Ceuta </option>
            <option value="Melilla"> Melilla </option>
          </Form.Select>
        </FormGroup>
        <br />
        <FormGroup>
          <Form.Label><strong>Artistas principales</strong></Form.Label>
          <Form.Control
            type="text"
            value={artists}
            placeholder="Sepáralos con comas"
            onChange={(e) => setArtists(e.target.value)}
          />
        </FormGroup>
        <br />
        <FormGroup >
          <Form.Label><strong>Géneros</strong></Form.Label>
          {genresArr.map((eachGenre) => (
            <div key={`${eachGenre}`} className="mb-3" style={{justifyContent: "flex-start"}}>
              <Form.Check 
                type="checkbox"
                id={`${eachGenre}`}
                label={`${eachGenre}`}
                value={eachGenre}
                onClick={handleGenre}
              />
            </div>
          ))}
        </FormGroup>
        <br />
        <FormGroup>
          <Form.Label><strong>Precio base</strong></Form.Label>
          <Form.Control
            type="number"
            value={minPrize}
            onChange={(e) => setMinPrize(e.target.value)}
          />
        </FormGroup>
        <br />
        <FormGroup>
          <Form.Label><strong>¿Cuenta con zona de camping?</strong></Form.Label>
          <Form.Select
            type="text"
            value={campingArea}
            onChange={(e) => setCampingArea(e.target.value)}
          >
            <option value="false"> No </option>
            <option value="true"> Sí </option>
          </Form.Select>
        </FormGroup>
        <br />
        <FormGroup>
          <Form.Label><strong>Más información</strong></Form.Label>
          <Form.Control
            as="textarea"
            value={extraInfo}
            onChange={(e) => setExtraInfo(e.target.value)}
          />
        </FormGroup>
        <br />
        <Button type="submit">Añadir</Button>
      </Form>
    </div>
  );
}

export default FormFestivales;
