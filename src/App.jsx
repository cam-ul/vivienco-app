import { useState, useEffect } from "react";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import SeccionesInicio, { TarjetasBancosAliados } from "./components/SeccionesInicio";
import SeccionesContenido from "./components/SeccionesContenido";
import Contacto from "./components/Contacto";
import PanelAdmin from "./components/PanelAdmin";
import AsistenteIA from "./components/AsistenteIA";
import "./App.css";

function App() {
  // Estado para saber en qué pestaña estamos y si el panel admin está abierto
  const [mostrarAdmin, setMostrarAdmin] = useState(false);
  const [seccionActiva, setSeccionActiva] = useState("inicio");

  // Despierta el servidor de Render en segundo plano al entrar a la página
  useEffect(() => {
    fetch("https://vivienco-backend.onrender.com/api/solicitudes").catch(() => {});
  }, []);

  // Cambia de pestaña y sube el scroll al inicio
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
          className="pie-pagina__marca"
          onClick={(e) => {
            e.preventDefault();
            cambiarSeccion("inicio");
          }}
        >
          <span className="pie-pagina__logo">VIVIENCO</span>
          <span className="pie-pagina__subtitulo">
            Especialistas en Créditos de Vivienda
          </span>
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