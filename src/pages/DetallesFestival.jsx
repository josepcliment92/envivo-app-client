import React from "react";
import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import service from "../services/config.services";
import { TailSpin } from "react-loader-spinner";
import CartaDetalleFestival from "../components/Festivales/CartaDetalleFestival";
import Button from "react-bootstrap/esm/Button";
import ReseñasSeccion from "../components/Reseñas/ReseñasSeccion"

function DetallesFestival() {
  const [festival, setFestival] = useState(null);
  const [reseñas, setReseñas] = useState([]);

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
      //console.log(festival.data);
    } catch (error) {
      navigate("*");
    }
  }

  async function getReseñasData() {
    try {
      const reseña = await service.get(`/resenas/${params.festivalId}`);
      setReseñas(reseña.data); //esto nos da un array de objetos, cada objeto es una reseña
      //console.log(reseña.data)
    } catch (error) {
      navigate("*");
    }
  }

  if (festival === null) {
    return (
      <div style={{ display: "flex", justifyContent: "center" }}>
        <TailSpin color={"white"} size={500} />
      </div>
    );
  }

  return (
    <div>
      <CartaDetalleFestival festival={festival}/>

      <Button> Añadir a favoritos </Button> {/*Este botón debería ser visible solo para user y admin*/}
      <Button> Editar Festival </Button> {/*Este botón debería ser visible solo para admin*/}

      <ReseñasSeccion />
    </div>
  );
}

export default DetallesFestival;
