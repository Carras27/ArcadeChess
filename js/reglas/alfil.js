// /reglas/alfil.js
import { caminoLibre } from "./auxiliares";

// Reglas para los posibles movimientos del alfil.
export function validarAlfil(tablero, fo, co, fd, cd) {
    
    // Calculamos el número de casillas que se moverá en cada eje.
    const df = Math.abs(fd - fo);
    const dc = Math.abs(cd - co);

    // Si no se mueve las mismas casillas en cada eje (diagonalmente), devuelve 'false'.
    if (df !== dc) return false;
    
    // El movimiento será válido si el camino está libre de obstáculos. 
    return caminoLibre(tablero, fo, co, fd, cd);
}