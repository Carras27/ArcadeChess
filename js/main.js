import { crearTableroInicial, renderizarTablero }
    from "./tablero.js";
import { moverPieza } from "./juego.js";


const tablero = crearTableroInicial();

let casillaSeleccionada = null;

function manejarSeleccion(fila, col) {
    // Si no hay pieza seleccionada, se selecciona una casilla.
    if (casillaSeleccionada === null) {
        if (tablero[fila][col] !== null) {
            casillaSeleccionada = { fila, col };
        }
        renderizarTablero(tablero, manejarSeleccion, casillaSeleccionada);
        return;
    }
    // Si hay pieza seleccionada, la movemos a la nueva casilla.
    const movida = moverPieza(tablero, casillaSeleccionada.fila, casillaSeleccionada.col, fila, col);
    casillaSeleccionada = null;
    renderizarTablero(tablero, manejarSeleccion, casillaSeleccionada);
}

renderizarTablero(tablero, manejarSeleccion, casillaSeleccionada);