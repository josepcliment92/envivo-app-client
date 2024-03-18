import "./App.css";
import { Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Festivales from "./pages/Festivales";
import DetallesFestival from "./pages/DetallesFestival";
import AñadirFestival from "./pages/AñadirFestival"
import EditarFestival from "./pages/EditarFestival";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import Perfil from "./pages/Perfil";
import QuienesSomos from "./pages/QuienesSomos";
import Contacto from "./pages/Contacto";
import NotFound from "./pages/NotFound";
import Error from "./pages/Error";

function App() {
  return (
    <div>
      <Navbar />

      <div>
      <Routes>
        <Route path={"/"} element={ <Home /> } />
        <Route path={"/festivales"} element={ <Festivales /> } />
        <Route path={"/festivales/detalle/:festivalId"} element={ <DetallesFestival /> } />
        <Route path={"/festivales/creacion-festival"} element={ <AñadirFestival /> } />
        <Route path={"/festivales/edicion-festival"} element={ <EditarFestival /> } />
        <Route path={"/registro"} element={ <Signup /> } />
        <Route path={"/acceso"} element={ <Login/> } />
        <Route path={"/perfil"} element={ <Perfil /> } /> 
        <Route path={"/quienes-somos"} element={ <QuienesSomos /> } />
        <Route path={"/contacto"} element={ <Contacto /> } />
        <Route path={"*"} element={ <NotFound /> } /> 
      </Routes>
      </div>
    </div>
  );
}

export default App;
