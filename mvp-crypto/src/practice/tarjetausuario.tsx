import { useEffect, useState } from "react";
import type { ChangeEvent } from "react";

interface Usuario {
    id: number;
    nombre: string;
    edad: number;
}

interface TarjetaUsuarioProps {
    usuario: Usuario;
    esPremiun: boolean;
    onActivar: () => void;
}

export function TarjetaUsuario({ usuario, esPremiun, onActivar }: TarjetaUsuarioProps) {
    const [editando, setEditando] = useState(false);
    const [apodo, setApodo] = useState("");

    const manejarCambio = (e: ChangeEvent<HTMLInputElement>) => {
        setApodo(e.target.value);
    };

    return (
        <div>
            <h2>{usuario.nombre}</h2>
            {esPremiun ? <span>Vip</span> : <button onClick={onActivar}>Activar premiun</button>}
            <input type="text" value={apodo} onChange={manejarCambio} />
        </div>
    )
}