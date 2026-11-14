import { useState } from "react";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import SeccionesInicio, { TarjetasBancosAliados } from "./components/SeccionesInicio";
import SeccionesContenido from "./components/SeccionesContenido";
import Contacto from "./components/Contacto";
import PanelAdmin from "./components/PanelAdmin";
import AsistenteIA from "./components/AsistenteIA";
import logoVivienco from "./assets/hero.png";

function App() {
  const [mostrarAdmin, setMostrarAdmin] = useState(false);
  const [seccionActiva, setSeccionActiva] = useState("inicio");

  const cambiarSeccion = (nuevaSeccion) => {
    setSeccionActiva(nuevaSeccion);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="app-contenedor">
      <Navbar
        seccionActiva={seccionActiva}
        cambiarSeccion={cambiarSeccion}
        abrirAdmin={() => setMostrarAdmin(true)}
      />

      <main>
        {seccionActiva === "inicio" && (
          <>
            <Hero cambiarSeccion={cambiarSeccion} />
            <SeccionesInicio
              seccionActiva="inicio"
              cambiarSeccion={cambiarSeccion}
            />
          </>
        )}

        {seccionActiva === "servicios" && (
          <SeccionesInicio
            seccionActiva="servicios"
            cambiarSeccion={cambiarSeccion}
          />
        )}

        {seccionActiva === "bancos" && <TarjetasBancosAliados />}

        {(seccionActiva === "bancos" ||
          seccionActiva === "educacion" ||
          seccionActiva === "subsidios" ||
          seccionActiva === "blog") && (
            <SeccionesContenido
              seccionActiva={seccionActiva}
              cambiarSeccion={cambiarSeccion}
            />
          )}

        {seccionActiva === "contacto" && <Contacto />}
      </main>

      <footer className="pie-pagina">
        <a
          href="#inicio"
          onClick={(e) => {
            e.preventDefault();
            cambiarSeccion("inicio");
          }}
        >
          <img
            src={logoVivienco}
            alt="Vivienco - Especialistas en Créditos de Vivienda"
            style={{
              height: "54px",
              width: "auto",
              objectFit: "contain",
              marginBottom: "10px",
              background: "#ffffff",
              padding: "6px 14px",
              borderRadius: "10px",
            }}
          />
        </a>
        <p className="pie-pagina__derechos">
          © 2026 Vivienco · Especialistas en Crédito Hipotecario y Leasing Habitacional en Colombia.
        </p>
      </footer>

      <AsistenteIA />

      {mostrarAdmin && (
        <PanelAdmin cerrarPanel={() => setMostrarAdmin(false)} />
      )}
    </div>
  );
}

export default App;