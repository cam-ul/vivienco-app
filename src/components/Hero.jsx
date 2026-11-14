import './Hero.css';
import { UserCheck, ShieldCheck, Landmark, GraduationCap } from 'lucide-react';

function Hero({ cambiarSeccion }) {
  return (
    <section className="hero-seccion" id="inicio">
      <div className="hero-izquierda">
        <h1 className="hero-titulo">
          HACEMOS REALIDAD <br />
          EL SUEÑO DE <span className="texto-dorado">TU HOGAR</span>
        </h1>
        
        <p className="hero-subtitulo">
          Te acompañamos en todo el proceso hipotecario de inicio a fin, con asesoría gratuita, opciones personalizadas y educación financiera.
        </p>

        <div className="hero-cta-grupo">
          <button
            type="button"
            onClick={() => cambiarSeccion("contacto")}
            className="btn-verde-hero"
          >
            Solicita tu estudio gratis <span>&rarr;</span>
          </button>
          <button
            type="button"
            onClick={() => cambiarSeccion("servicios")}
            className="btn-borde-hero"
          >
            Conoce nuestros servicios
          </button>
        </div>

        <div className="hero-beneficios">
          <div className="beneficio-item">
            <UserCheck size={22} strokeWidth={1.5} />
            <span>Asesoría<br />100% gratuita</span>
          </div>
          <div className="beneficio-item">
            <ShieldCheck size={22} strokeWidth={1.5} />
            <span>Acompañamiento<br />de principio a fin</span>
          </div>
          <div className="beneficio-item">
            <Landmark size={22} strokeWidth={1.5} />
            <span>Comparamos por ti<br />entre varios bancos</span>
          </div>
          <div className="beneficio-item">
            <GraduationCap size={22} strokeWidth={1.5} />
            <span>Educación financiera<br />para mejores decisiones</span>
          </div>
        </div>
      </div>

      <div className="hero-derecha">
        <div className="mancha-verde-fondo"></div>
        <img
          src="https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=1000&q=80"
          alt="Casa moderna Vivienco"
          className="foto-casa-hero"
        />
      </div>
    </section>
  );
}

export default Hero;