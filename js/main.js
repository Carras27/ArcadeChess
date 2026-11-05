// /main.js

import { crearTableroInicial, renderizarTablero }
    from "./tablero.js";
import { esMovimientoValido, moverPieza } from "./juego.js";


const tablero = crearTableroInicial();

let casillaSeleccionada = null;
let turnoActual = "blancas";

// Funcion que devuelve True si una pieza es blanca.
function esBlanca(pieza) {
    return pieza === pieza.toUpperCase();
}

function manejarSeleccion(fila, col) {
    const pieza = tablero[fila][col]

    // Si no hay pieza seleccionada
    if (casillaSeleccionada === null) {
        if (pieza === null) { return }
        
        // Obtener el color de la pieza seleccionada.
        const piezaBlanca = esBlanca(pieza)
        // Comprobar si pertenece al jugador actual.
        if ((turnoActual === "blancas" && !piezaBlanca) || (turnoActual === "negras" && piezaBlanca)) {
            return
        }

        casillaSeleccionada = { fila, col }
        renderizarTablero(tablero, manejarSeleccion, casillaSeleccionada);
        return;
    }
    // Si ya hay pieza seleccionada
    else {
        // Guardamos la casilla de origen.
        const filaOrigen = casillaSeleccionada.fila;
        const colOrigen = casillaSeleccionada.col;

        // Si pulsamos la misma casilla, cancelamos la selección.
        if (filaOrigen === fila && colOrigen === col) {
            casillaSeleccionada = null;
        // Si no, la movemos.
        } else {
            if (esMovimientoValido(tablero, filaOrigen, colOrigen, fila, col)) {
                moverPieza(tablero, filaOrigen, colOrigen, fila, col);

                // Limpiar selección.
                casillaSeleccionada = null;

                // Cambiar turno.
                turnoActual = turnoActual === "blancas" ? "negras" : "blancas";
            }
        }
    }
    renderizarTablero(tablero, manejarSeleccion, casillaSeleccionada);
}

renderizarTablero(tablero, manejarSeleccion, casillaSeleccionada);