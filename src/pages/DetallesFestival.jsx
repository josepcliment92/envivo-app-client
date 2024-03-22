import React from "react";
import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import service from "../services/config.services";
import { TailSpin } from "react-loader-spinner";
import CartaDetalleFestival from "../components/Festivales/CartaDetalleFestival";
import Button from "react-bootstrap/esm/Button";
import FormReseñas from "../components/Reseñas/FormReseñas";
import CartaReseña from "../components/Reseñas/CartaReseña";
import Card from "react-bootstrap/Card";
import { useContext } from "react";
import { AuthContext } from "../context/auth.context";

function DetallesFestival() {
  const [festival, setFestival] = useState(null);
  const [reseñas, setReseñas] = useState([]);
  const [verFormReseñas, setVerFormReseñas] = useState(false);

  const { userRole } = useContext(AuthContext);

  const navigate = useNavigate();
  const params = useParams();

  useEffect(() => {
    getFestivalData();
    getReseñasData();
  }, []);

  async function getFestivalData() {
    try {
      const festival = await service.get(`/festivales/${params.festivalId}`);
      setFestival(festival.data);
    } catch (error) {
      navigate("*");
    }
  }

  async function getReseñasData() {
    try {
      const reseñas = await service.get(`/resenas/${params.festivalId}`);
      setReseñas(reseñas.data);
    } catch (error) {
      navigate("*");
    }
  }

  const handleToggleFormReseñas = () => {
    setVerFormReseñas(!verFormReseñas);
  };

  if (festival === null) {
    return (
      <div style={{ display: "flex", justifyContent: "center" }}>
        <TailSpin color={"white"} size={500} />
      </div>
    );
  }

  return (
    <div>
      <CartaDetalleFestival festival={festival} />

      <div
        style={{
          marginTop: "20px",
          textAlign: "center",
        }}
      >
        <Card>
          <Card.Body className="d-grid gap-2">
            <div style={{ display: "flex", justifyContent: "center" }}>
              {userRole === "user" || userRole === "admin" ? (
                <Button
                  style={{
                    width: "350px",
                  }}
                  onClick={handleToggleFormReseñas}
                >
                  ¡Danos tu opinión del festival!
                </Button>
              ) : null}
            </div>
            {verFormReseñas && (
              <FormReseñas
                festivalId={festival._id}
                getFestivalData={getFestivalData}
                getReseñasData={getReseñasData}
                handleToggleFormReseñas={handleToggleFormReseñas}
              />
            )}
          </Card.Body>
        </Card>
      </div>

      <div>
        <hr />
        {reseñas.map((eachReseña) => (
          <CartaReseña
            eachReseñaYourFavouriteThing={eachReseña.yourFavouriteThing}
            eachReseñaWhatWouldYouImprove={eachReseña.whatWouldYouImprove}
            eachReseñaMoreObservations={eachReseña.moreObservations}
            eachReseñaOverallRating={eachReseña.overallRating}
            eachReseñaId={eachReseña._id}
            eachReseña={eachReseña}
            key={eachReseña._id}
            setReseñas={setReseñas}
            getReseñasData={getReseñasData}
            reseñas={reseñas}
          />
        ))}
      </div>
    </div>
  );
}

export default DetallesFestival;
