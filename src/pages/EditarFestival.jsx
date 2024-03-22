import React from "react";
import EditFormFestivales from "../components/Festivales/EditFormFestivales";
import { useNavigate, useParams } from "react-router-dom";
import { TailSpin } from "react-loader-spinner";
import { useState, useEffect } from "react";
import service from "../services/config.services";

function EditarFestival() {
  const [festival, setFestival] = useState(null);

  const navigate = useNavigate();
  const params = useParams();

  useEffect(() => {
    getFestivalData();
  }, []);

  async function getFestivalData() {
    try {
      const festival = await service.get(`/festivales/${params.festivalId}`);
      setFestival(festival.data);
    } catch (error) {
      console.log(error);
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
      <div>
        <h2>Actualiza el festival</h2>

        <EditFormFestivales festival={festival} />
      </div>
    </div>
  );
}

export default EditarFestival;
