import React from 'react'
import { Link } from "react-router-dom";
import img from "../assets/img/envivo-home.png"

function Home() {
  return (
    <div>
      <Link to={"/festivales"}>
      <img style={{width: "1280px"}} src={img} alt="homeImg"/>
      </Link>

    </div>
  )
}

export default Home