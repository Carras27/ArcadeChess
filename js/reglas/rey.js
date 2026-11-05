// /reglas/rey.js

// Reglas para los posibles movimientos del rey.
export function validarRey(tablero, fo, co, fd, cd) {
    // Calculamos el número de casillas que realizará el movimiento en cada eje.
    df = Math.abs(fd - fo);
    dc = Math.abs(cd - co);

    // Si trata de moverse dos casillas o más en cualquier eje, movimiento inválido.
    if (df > 1 || dc > 1) return false;

    return true;
}