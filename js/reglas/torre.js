// /reglas/torre.js
import { caminoLibre } from "../auxiliares";

// Reglas para los posibles movimientos de la torre.
export function validarTorre(tablero, fo, co, fd, cd) {

    // Si se intenta mover por la fila y la columna al mismo tiempo, movimiento inválido.
    if (fo !== fd && co !== cd ) return false;

    // El movimiento será válido si el camino está libre de obstáculos. 
    return caminoLibre(tablero, fo, co, fd, cd);
}