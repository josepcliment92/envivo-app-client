import React from 'react'
import homeImg from "../assets/img/home-image.jpg"
import { Link } from "react-router-dom";

function Home() {
  return (
    <div>
      <Link to={"/festivales"}>
      <img style={{width: "1280px"}} src={homeImg} alt="homeImg"/>
      </Link>

    </div>
  )
}

export default Home