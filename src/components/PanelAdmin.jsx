import { useState, useEffect } from "react";
import { X, Lock, RefreshCw } from "lucide-react";
import "./PanelAdmin.css";

const ETAPAS_CREDITO = [
    "1. Estudio de crédito",
    "2. Recolección de documentos",
    "3. Radicado en banco",
    "4. Crédito aprobado",
    "5. Avalúo y estudio de títulos",
    "6. Desembolsado",
];

function PanelAdmin({ cerrarPanel }) {
    const [autenticado, setAutenticado] = useState(false);
    const [correo, setCorreo] = useState("");
    const [password, setPassword] = useState("");
    const [errorLogin, setErrorLogin] = useState("");

    const [solicitudes, setSolicitudes] = useState([]);
    const [cargando, setCargando] = useState(false);

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

    const cambiarEtapa = async (id, nuevaEtapa) => {
        setSolicitudes((anteriores) =>
            anteriores.map((item) =>
                item._id === id ? { ...item, etapaProceso: nuevaEtapa } : item
            )
        );

        try {
            let respuesta = await fetch(`http://localhost:5000/api/solicitudes/${id}`, {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ etapaProceso: nuevaEtapa }),
            });

            if (!respuesta.ok) {
                respuesta = await fetch(`http://localhost:5000/api/solicitudes/${id}/etapa`, {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ etapaProceso: nuevaEtapa }),
                });
            }
        } catch (error) {
            console.error("Error al conectar con el backend:", error);
        }
    };

    useEffect(() => {
        if (autenticado) {
            obtenerSolicitudes();
        }
    }, [autenticado]);

    const manejarLogin = async (e) => {
        e.preventDefault();
        setErrorLogin("");

        try {
            const respuesta = await fetch("http://localhost:5000/api/admin/login", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ correo, password }),
            });

            const datos = await respuesta.json();

            if (respuesta.ok && datos.autenticado) {
                setAutenticado(true);
                setErrorLogin("");
            } else {
                setErrorLogin("Acceso denegado. Verifica tus credenciales.");
            }
        } catch (error) {
            setErrorLogin("No se pudo conectar con el servidor de autenticación.");
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
                        <p>Ingresa tus credenciales para gestionar los estudios de crédito.</p>

                        <label>
                            <span>Usuario o correo autorizado</span>
                            <input
                                type="email"
                                value={correo}
                                onChange={(e) => setCorreo(e.target.value)}
                                placeholder="Ingresa tu usuario asignado"
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
                                            <th>Etapa del Proceso</th>
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
                                                    <select
                                                        className="admin-select-etapa"
                                                        value={item.etapaProceso}
                                                        onChange={(e) => cambiarEtapa(item._id, e.target.value)}
                                                    >
                                                        {ETAPAS_CREDITO.map((etapa) => (
                                                            <option key={etapa} value={etapa}>
                                                                {etapa}
                                                            </option>
                                                        ))}
                                                    </select>
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