import { useState } from "react";
import { User, Menu, X } from "lucide-react";
import logoVivienco from "../assets/hero.png";
import "./Navbar.css";

const ENLACES_MENU = [
  { id: "inicio", texto: "Inicio" },
  { id: "servicios", texto: "Servicios" },
  { id: "bancos", texto: "Bancos aliados" },
  { id: "educacion", texto: "Educación financiera" },
  { id: "subsidios", texto: "Subsidios" },
  { id: "blog", texto: "Blog" },
  { id: "contacto", texto: "Contacto" },
];

function Navbar({ abrirAdmin, seccionActiva = "inicio", cambiarSeccion }) {
  const [menuAbierto, setMenuAbierto] = useState(false);

  const manejarNavegacion = (evento, idSeccion) => {
    evento.preventDefault();
    if (cambiarSeccion) {
      cambiarSeccion(idSeccion);
    }
    setMenuAbierto(false);
  };

  return (
    <nav className="navbar">
      <a
        href="#inicio"
        className="navbar-logo"
        onClick={(e) => manejarNavegacion(e, "inicio")}
      >
        <img
          src={logoVivienco}
          alt="Vivienco - Especialistas en Créditos de Vivienda"
          className="logo-imagen"
        />
      </a>

      <ul className={`navbar-enlaces ${menuAbierto ? "activo" : ""}`}>
        {ENLACES_MENU.map((item) => (
          <li key={item.id}>
            <a
              href={`#${item.id}`}
              className={seccionActiva === item.id ? "enlace-activo" : ""}
              onClick={(e) => manejarNavegacion(e, item.id)}
            >
              {item.texto}
            </a>
          </li>
        ))}
      </ul>

      <div className="navbar-acciones">
        <a
          href="#contacto"
          className="btn-solicitar"
          onClick={(e) => manejarNavegacion(e, "contacto")}
        >
          Solicita tu estudio gratis &rarr;
        </a>
        <button
          className="btn-admin"
          title="Panel de Administración"
          onClick={abrirAdmin}
        >
          <User size={20} />
        </button>
        <button
          className="btn-movil"
          onClick={() => setMenuAbierto(!menuAbierto)}
        >
          {menuAbierto ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>
    </nav>
  );
}

export default Navbar;