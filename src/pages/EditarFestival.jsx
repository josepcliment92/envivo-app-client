import React from "react";
import EditFormFestivales from "../components/Festivales/EditFormFestivales";

function EditarFestival() {
  //const festival = props.festival;
  return (
    <div>
      <div>
        <h2>Actualiza el festival</h2>

        <EditFormFestivales /> {/* aquí pasar como props la información del festival, tenemos su Id en la URL*/}
      </div>
    </div>
  );
}

export default EditarFestival;
