import { useEffect, useState } from "react";

export function TarjetaUsuario({ usuario, esPremiun, onActivar }) {
    const [editando, setEditando] = useState(false);
    const [apodo, setApodo] = useState();

    const manejarCambio = (e) => {
        setApodo(e.target.value);
    }
}

return (
    <div>
        <h2>{usuario.nombre}</h2>
        {esPremiun ? <span>Vip</span> : <button onClick={onActivar}>Activar premiun</button>}
        <input type="text" value={apodo} onChange={manejarCambio} />
    </div>
)
