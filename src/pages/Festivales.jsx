import React from "react";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import service from "../services/config.services";
import { TailSpin } from "react-loader-spinner";
import CartaFestival from "../components/Festivales/CartaFestival";
import Button from "react-bootstrap/esm/Button";
import { Link } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../context/auth.context";

function Festivales() {
  const [festivales, setFestivales] = useState(null);
  const navigate = useNavigate();

  const { userRole } = useContext(AuthContext);

  useEffect(() => {
    service
      .get("/festivales")
      .then((response) => {
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

      <div style={{ display: "flex", flexWrap: "wrap" }}>
        {" "}
        {festivales.map((eachFestival) => {
          return (
            <div key={eachFestival["_id"]}>
              <CartaFestival eachFestival={eachFestival} />
            </div>
          );
        })}
      </div>
      <Link to={"/festivales/creacion-festival"}>
        {userRole === "admin" ? (
          <Button> Añade un nuevo festival </Button>
        ) : null}
      </Link>
    </div>
  );
}

export default Festivales;
