// /reglas/dama.js
import { validarAlfil } from "./alfil.js";
import { validarTorre } from "./torre.js";

// Reglas para posibles movimientos de la dama (reutiliza las reglas de torre y alfil).
export function validarDama(tablero, fo, co, fd, cd) {
    return validarTorre(tablero, fo, co, fd, cd) || validarAlfil(tablero, fo, co, fd, cd);
}