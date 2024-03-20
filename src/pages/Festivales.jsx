import React from "react";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import service from "../services/config.services";
import { TailSpin } from "react-loader-spinner";
import CartaFestival from "../components/Festivales/CartaFestival";
import BuscadorFestivales from "../components/Festivales/BuscadorFestivales"
import Button from "react-bootstrap/esm/Button";
import { Link } from "react-router-dom";

function Festivales() {
  const [festivales, setFestivales] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    service
      .get("/festivales")
      .then((response) => {
        //console.log(response.data)
        setFestivales(response.data);
      })
      .catch((error) => {
        navigate("*");
      });
  }, []);

  if (festivales === null) {
    return (
      <div style={{ display: "flex", justifyContent: "center" }}>
        <TailSpin color={"white"} size={500} />
      </div>
    );
  }

  return (
    <div>
      <h2>Festivales</h2>
      <BuscadorFestivales />
      
      <div> {festivales.map((eachFestival) => {
        return (
          <div key={eachFestival["_id"]}> 
          <CartaFestival eachFestival={eachFestival} />
          </div>
        )
      })}
      </div>
      <Link to={"/festivales/creacion-festival"}> 
      <Button > Añade un nuevo festival </Button> {/* este botón debería ser solo accesible para admin */}
      </Link>
    </div>
  );
}

export default Festivales;
