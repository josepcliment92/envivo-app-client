import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import { Route, Routes } from "react-router-dom";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import Festivales from "./pages/Festivales";
import DetallesFestival from "./pages/DetallesFestival";
import AñadirFestival from "./pages/AñadirFestival";
import EditarFestival from "./pages/EditarFestival";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import QuienesSomos from "./pages/QuienesSomos";
import Contacto from "./pages/Contacto";
import NotFound from "./pages/NotFound";
import MainNavbar from "./components/Navbar";
//import IsPrivate from "./components/IsPrivate";
import IsAdmin from "./components/IsAdmin";

function App() {
  return (
    <div>
      <MainNavbar />

      <div>
        <Routes>
          <Route path={"/"} element={<Home />} />
          <Route path={"/festivales"} element={<Festivales />} />
          <Route
            path={"/festivales/detalle/:festivalId"}
            element={<DetallesFestival />}
          />
          <Route
            path={"/festivales/creacion-festival"}
            element={
              <IsAdmin>
                <AñadirFestival />
              </IsAdmin>
            }
          />
          <Route
            path={"/festivales/edicion-festival/:festivalId"}
            element={
              <IsAdmin>
                <EditarFestival />
              </IsAdmin>
            }
          />
          <Route path={"/registro"} element={<Signup />} />
          <Route path={"/acceso"} element={<Login />} />
          <Route path={"/quienes-somos"} element={<QuienesSomos />} />
          <Route path={"/contacto"} element={<Contacto />} />
          <Route path={"*"} element={<NotFound />} />
        </Routes>
      </div>

      <Footer />
    </div>
  );
}

export default App;
