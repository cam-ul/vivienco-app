import { useState, useEffect } from "react";
import { X, Lock, RefreshCw } from "lucide-react";
import "./PanelAdmin.css";

function PanelAdmin({ cerrarPanel }) {
    const [autenticado, setAutenticado] = useState(false);
    const [correo, setCorreo] = useState("");
    const [password, setPassword] = useState("");
    const [errorLogin, setErrorLogin] = useState("");

    const [solicitudes, setSolicitudes] = useState([]);
    const [cargando, setCargando] = useState(false);

    // Función que consulta las solicitudes reales en MongoDB Atlas
    const obtenerSolicitudes = async () => {
        setCargando(true);
        try {
            const respuesta = await fetch("http://localhost:5000/api/solicitudes");
            const datos = await respuesta.json();
            if (respuesta.ok) {
                setSolicitudes(datos.solicitudes || []);
            }
        } catch (error) {
            console.error("Error al cargar solicitudes:", error);
        } finally {
            setCargando(false);
        }
    };

    useEffect(() => {
        if (autenticado) {
            obtenerSolicitudes();
        }
    }, [autenticado]);

    const manejarLogin = (e) => {
        e.preventDefault();
        if (correo === "admin@vivienco.com" && password === "vivienco2026") {
            setAutenticado(true);
            setErrorLogin("");
        } else {
            setErrorLogin("Credenciales incorrectas. Usa admin@vivienco.com / vivienco2026");
        }
    };

    const formatearMoneda = (valor) => {
        return new Intl.NumberFormat("es-CO", {
            style: "currency",
            currency: "COP",
            maximumFractionDigits: 0,
        }).format(valor);
    };

    return (
        <div className="admin-overlay">
            <div className="admin-modal">
                <div className="admin-encabezado">
                    <h2>Panel Administrativo - Vivienco</h2>
                    <button className="admin-cerrar" onClick={cerrarPanel} title="Cerrar">
                        <X size={22} />
                    </button>
                </div>

                {!autenticado ? (
                    <form className="admin-login" onSubmit={manejarLogin}>
                        <div className="admin-icono-candado">
                            <Lock size={28} />
                        </div>
                        <h3>Acceso para Especialistas</h3>
                        <p>Ingresa tus credenciales para consultar los estudios de crédito.</p>

                        <label>
                            <span>Correo corporativo</span>
                            <input
                                type="email"
                                value={correo}
                                onChange={(e) => setCorreo(e.target.value)}
                                placeholder="admin@vivienco.com"
                                required
                            />
                        </label>

                        <label>
                            <span>Contraseña</span>
                            <input
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                placeholder="••••••••"
                                required
                            />
                        </label>

                        {errorLogin && <p className="admin-error">{errorLogin}</p>}

                        <button type="submit" className="admin-btn-entrar">
                            Ingresar al panel
                        </button>
                    </form>
                ) : (
                    <div className="admin-contenido">
                        <div className="admin-barra-superior">
                            <span>
                                Total de solicitudes registradas: <strong>{solicitudes.length}</strong>
                            </span>
                            <button className="admin-btn-refrescar" onClick={obtenerSolicitudes}>
                                <RefreshCw size={16} /> Actualizar
                            </button>
                        </div>

                        {cargando ? (
                            <p className="admin-estado">Cargando registros desde MongoDB Atlas...</p>
                        ) : solicitudes.length === 0 ? (
                            <p className="admin-estado">No hay solicitudes registradas todavía.</p>
                        ) : (
                            <div className="admin-tabla-contenedor">
                                <table className="admin-tabla">
                                    <thead>
                                        <tr>
                                            <th>Cliente</th>
                                            <th>Contacto</th>
                                            <th>Ingresos</th>
                                            <th>Valor Vivienda</th>
                                            <th>Banco Interés</th>
                                            <th>Etapa</th>
                                            <th>Fecha</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {solicitudes.map((item) => (
                                            <tr key={item._id}>
                                                <td><strong>{item.nombreCompleto}</strong></td>
                                                <td>
                                                    {item.correo}
                                                    <br />
                                                    <small>{item.telefono}</small>
                                                </td>
                                                <td>{formatearMoneda(item.ingresosMensuales)}</td>
                                                <td>{formatearMoneda(item.valorVivienda)}</td>
                                                <td>{item.bancoInteres || "Por definir"}</td>
                                                <td>
                                                    <span className="admin-badge">{item.etapaProceso}</span>
                                                </td>
                                                <td>
                                                    {new Date(item.fechaRegistro).toLocaleDateString("es-CO")}
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
}

export default PanelAdmin;