// /reglas/peon.js

// Reglas para los posibles movimientos del peón.
export function validarPeon(tablero, fo, co, fd, cd, esBlanca) {
    // Asignar dirección y fila inicial según el color del peón.
    const direccion = esBlanca ? -1 : 1;
    const filaInicial = esBlanca ? 6 : 1;

    // Calcular la diferencia de casillas entre origen y destino.
    const df = fd - fo;
    const dc = cd - co;


    // Avance recto de UNA casilla (sin comer)
    if (dc === 0 && df === direccion && tablero[fd][cd] === null) return true;

    // Avance doble desde la casilla de salida
    if (dc === 0 && df === 2 * direccion && fo === filaInicial && tablero[fd][cd] === null) {
        return tablero[fo + direccion][cd] == null
    }

    // Captura (en diagonal)
    if (Math.abs(dc) === 1 && df === direccion) {
        return tablero[fd][cd] !== null;
    }

    return false;
}