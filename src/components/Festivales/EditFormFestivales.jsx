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
  const navigate = useNavigate();

  const [name, setName] = useState(festival.name);
  const [imageUrl, setImageUrl] = useState(festival.image);
  const [startDate, setStartDate] = useState(festival.startDate.slice(0, 10));
  const [endDate, setEndDate] = useState(festival.endDate.slice(0, 10));
  const [city, setCity] = useState(festival.city);
  const [region, setRegion] = useState(festival.region);
  const [artists, setArtists] = useState(festival.artists.join(", "));
  const [genres, setGenres] = useState(festival.genres);
  const [minPrize, setMinPrize] = useState(festival.minPrize);
  const [campingArea, setCampingArea] = useState(festival.campingArea);
  const [extraInfo, setExtraInfo] = useState(festival.extraInfo);

  const [isUploading, setIsUploading] = useState(false)

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

  const handleSubmit = (e) => {
    e.preventDefault();

    const editFestival = {
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
        console.log(err) //cambiarlo por un mensaje o un navigate
    })
  }

  const handleName = (e) => {
    let inputValue = e.target.value;
    setName(inputValue);
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
      <br />
      <Form onSubmit={handleSubmit}>
        <FormGroup>
          <Form.Label><strong>Nombre</strong></Form.Label>
          <Form.Control
            type="text"
            value={name}
            onChange={handleName}
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
        {isUploading ? <h3>... uploading image</h3> : null}
        <FormGroup>
          <Form.Label><strong>Fecha de inicio</strong></Form.Label> 
          <Form.Control
            type="date"
            value={startDate}
            onChange={handleStartDate}
          />
        </FormGroup>
        <br />
        <FormGroup>
          <Form.Label><strong>Fecha de fin</strong></Form.Label>
          <Form.Control
            type="date"
            value={endDate} 
            onChange={handleEndDate}
          />
        </FormGroup>
        <br />
        <FormGroup>
          <Form.Label><strong>Ciudad</strong></Form.Label>
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
        <br />
        <FormGroup>
          <Form.Label><strong>Comunidad Autónoma</strong></Form.Label>
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
        <br />
        <FormGroup>
          <Form.Label><strong>Artistas principales</strong></Form.Label>
          <Form.Control
            type="text"
            value={artists}
            onChange={handleArtists}
          />
        </FormGroup>
        <br />
        <FormGroup>
          <Form.Label><strong>Géneros</strong></Form.Label>
          {genresArr.map((eachGenre) => (
            <div key={`${eachGenre}`} className="mb-3">
              <Form.Check
                type="checkbox"
                id={`${eachGenre}`}
                label={`${eachGenre}`}
                value={eachGenre}
                onClick={handleGenres}
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
            onChange={handleMinPrize}
          />
        </FormGroup>
        <br />
        <FormGroup>
          <Form.Label><strong>¿Cuenta con zona de camping?</strong></Form.Label>
          <Form.Select
            type="text"
            value={campingArea}
            onChange={handleCampingArea}
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
            onChange={handleExtraInfo}
          />
        </FormGroup>
        <br />
        <Button type="submit">Actualizar</Button>
      </Form>
      <br />
      <Button
              variant="danger"
              onClick={handleDelete}
            >
              Borrar festival
            </Button>
    </div>
  )
}

export default EditFormFestivales;
