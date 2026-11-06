import { useState } from 'react';
import { User, Menu, X } from 'lucide-react';
import logoVivienco from '../assets/hero.png';
import './Navbar.css';

function Navbar() {
  const [menuAbierto, setMenuAbierto] = useState(false);

  const alternarMenu = () => {
    setMenuAbierto(!menuAbierto);
  };

  return (
    <nav className="navbar">
      <a href="#inicio" className="navbar-logo">
        <img
          src={logoVivienco}
          alt="Vivienco - Especialistas en Créditos de Vivienda"
          className="logo-imagen"
        />
      </a>

      <ul className={`navbar-enlaces ${menuAbierto ? 'activo' : ''}`}>
        <li><a href="#inicio">Inicio</a></li>
        <li><a href="#servicios">Servicios</a></li>
        <li><a href="#bancos">Bancos aliados</a></li>
        <li><a href="#educacion">Educación financiera</a></li>
        <li><a href="#subsidios">Subsidios</a></li>
        <li><a href="#blog">Blog</a></li>
        <li><a href="#contacto">Contacto</a></li>
      </ul>

      <div className="navbar-acciones">
        <a href="#contacto" className="btn-solicitar">
          Solicita tu estudio gratis &rarr;
        </a>
        <button className="btn-admin" title="Panel de Administración">
          <User size={20} />
        </button>
        <button className="btn-movil" onClick={alternarMenu}>
          {menuAbierto ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>
    </nav>
  );
}

export default Navbar;