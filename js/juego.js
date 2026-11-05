// /juego.js

// Mueve la pieza de una casilla a otra.
export function moverPieza(tablero, filaOrigen, colOrigen, filaDestino, colDestino) {
    const pieza = tablero[filaOrigen][colOrigen];

    if (!pieza) return false;

    tablero[filaDestino][colDestino] = pieza;
    tablero[filaOrigen][colOrigen] = null;

    return true;
}

// Antes de realizar un movimiento, comprueba si es válido o no.
export function esMovimientoValido(tablero, filaOrigen, colOrigen, filaDestino, colDestino) {
    return true;
}

