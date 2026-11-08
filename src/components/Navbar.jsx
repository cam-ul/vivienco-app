import { useState } from 'react';
import { User, Menu, X } from 'lucide-react';
import logoVivienco from '../assets/hero.png';
import './Navbar.css';

function Navbar({ abrirAdmin }) {
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
        <li><a href="#inicio" onClick={() => setMenuAbierto(false)}>Inicio</a></li>
        <li><a href="#servicios" onClick={() => setMenuAbierto(false)}>Servicios</a></li>
        <li><a href="#bancos" onClick={() => setMenuAbierto(false)}>Bancos aliados</a></li>
        <li><a href="#educacion" onClick={() => setMenuAbierto(false)}>Educación financiera</a></li>
        <li><a href="#subsidios" onClick={() => setMenuAbierto(false)}>Subsidios</a></li>
        <li><a href="#blog" onClick={() => setMenuAbierto(false)}>Blog</a></li>
        <li><a href="#contacto" onClick={() => setMenuAbierto(false)}>Contacto</a></li>
      </ul>

      <div className="navbar-acciones">
        <a href="#contacto" className="btn-solicitar">
          Solicita tu estudio gratis &rarr;
        </a>
        <button
          className="btn-admin"
          title="Panel de Administración"
          onClick={abrirAdmin}
        >
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