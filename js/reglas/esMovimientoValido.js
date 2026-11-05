// /reglas/esMovimientoValido.js
import { validarTorre } from "./torre.js";
import { validarRey } from "./rey.js";
import { validarAlfil } from "./alfil.js";
import { validarCaballo } from "./caballo.js";
import { validarPeon } from "./peon.js";
import { validarDama } from "./dama.js";

// Función que valida (o inválida) cualquier posible movimiento.
export function esMovimientoValido(tablero, fo, co, fd, cd) {
    // Primero se consultan reglas que afectan a todas las piezas por igual.
    if (!dentroDelTablero(fd, cd)) return false; // No moverse fuera del tablero.                
    if (fo === fd && co === cd) return false; // No moverse al mismo sitio.
    if (esPiezaDelMismoColor(tablero, fo, co, fd, cd)) return false; // No comer piezas del mismo color.


    // Ahora se consultan reglas que afectan distintamente a cada tipo de pieza.
    const tipo = pieza.toLowerCase(); // Se guarda el tipo en minúscula para tratar de la misma manera a piezas iguales de distinto color.
    const esBlanca = pieza === pieza.toUpperCase(); // Se guarda el color de la pieza, necesario para validar los movimientos de los peones.

    switch (tipo) {
        case "p": return validarPeon(tablero, fo, co, fd, cd, esBlanca);
        case "n": return validarCaballo(tablero, fo, co, fd, cd);
        case "b": return validarAlfil(tablero, fo, co, fd, cd);
        case "r": return validarTorre(tablero, fo, co, fd, cd);
        case "q": return validarDama(tablero, fo, co, fd, cd);
        case "k": return validarRey(tablero, fo, co, fd, cd);
        default:  return false;
    }
}