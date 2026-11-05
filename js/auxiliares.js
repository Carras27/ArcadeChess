// /auxiliares.js

// Asegurar que ningún movimiento sale del tablero.
export function dentroDelTablero(fila,col) {
    return fila >= 0 && fila <= 8 && col >= 0 && col <= 8;
}

// Para evitar eliminar piezas del mismo color.
export function esPiezaDelMismoColor(tablero, fo, co, fd, cd) {
    // Calculamos las coordenadas del tablero.
    const origen = tablero[fo][co];
    const destino = tablero[fd][cd];

    // Si no hay piezas en origen (imposible) o en destino, devuelve 'false'.
    if (!origen || !destino) return false;

    // Se guarda 'true' si la pieza es blanca y 'false' si es negra.
    const origenBlanca = origen === origen.toUpperCase();
    const destinoBlanca = destino === destino.toUpperCase();

    // Si las piezas en origen y en destino comparten color, se devuelve 'true'.
    return origenBlanca === destinoBlanca;
}

// Función auxiliar para detectar si la torre, el alfil o la dama tienen el camino 
// hasta la casilla de destino libre.
export function caminoLibre(tablero, fo, co, fd, cd) {
    // Calculamos las direcciones del movimiento. Si no se mueve en un eje, valdrá 0.
    const dirf = Math.sign(fd - fo);
    const dirc = Math.sign(cd - co);

    // Usamos dos variables para ir revisando casilla a casilla.
    let f = fo + dirf;
    let c = co + dirc;
    if (f !== fd || c !== cd) {
        if (tablero[f][c] !== null) return false; //Si hay alguna pieza por el camino, devuelve 'false'.
        // Avanzamos a la siguiente casilla.
        f += dirf;
        c += dirc;
    }
    // Si tras recorrer todo no encontramos obstáculos, devuelve 'true'.
    return true;
}   