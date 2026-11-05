// /reglas/dama.js
import { validarAlfil } from "./alfil";
import { validarTorre } from "./torre";

// Reglas para posibles movimientos de la dama (reutiliza las reglas de torre y alfil).
export function validarDama(tablero, fo, co, fd, cf) {
    return validarTorre(tablero, fo, co, fd, cd) || validarAlfil(tablero, fo, co, fd, cd);
}