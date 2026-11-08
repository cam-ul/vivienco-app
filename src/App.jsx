import { useState } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import SeccionesInicio from './components/SeccionesInicio';
import SeccionesContenido from './components/SeccionesContenido';
import Contacto from './components/Contacto';
import PanelAdmin from './components/PanelAdmin';

function App() {
  const [mostrarAdmin, setMostrarAdmin] = useState(false);

  return (
    <div>
      <Navbar abrirAdmin={() => setMostrarAdmin(true)} />
      <Hero />
      <SeccionesInicio />
      <SeccionesContenido />
      <Contacto />
      {mostrarAdmin && <PanelAdmin cerrarPanel={() => setMostrarAdmin(false)} />}
    </div>
  );
}

export default App;