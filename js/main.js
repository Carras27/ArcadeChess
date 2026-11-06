// /main.js

import { crearTableroInicial, renderizarTablero }
    from "./tablero.js";
import { esMovimientoLegal, moverPieza, esBlanca, hayJaque} from "./juego.js";


const tablero = crearTableroInicial();

let casillaSeleccionada = null;
let turnoActual = "blancas";

function manejarSeleccion(fila, col) {
    const pieza = tablero[fila][col]

    // Si no hay pieza seleccionada
    if (casillaSeleccionada === null) {
        if (pieza === null) { return }
        
        // Obtener el color de la pieza seleccionada.
        const piezaBlanca = esBlanca(pieza)
        // Comprobar si pertenece al jugador actual.
        const esTurnoDeBlancas = turnoActual === "blancas";
        if (piezaBlanca !== esTurnoDeBlancas) return;

        casillaSeleccionada = { fila, col }
        renderizarTablero(tablero, manejarSeleccion, casillaSeleccionada);
        return;
    }
    // Si ya hay pieza seleccionada
    else {
        // Guardamos la casilla de origen y el color de la pieza.
        const filaOrigen = casillaSeleccionada.fila;
        const colOrigen = casillaSeleccionada.col;
        const colorOrigen = esBlanca(tablero[filaOrigen][colOrigen])

        // Si pulsamos la misma casilla, cancelamos la selección.
        if (filaOrigen === fila && colOrigen === col) {
            casillaSeleccionada = null;
            renderizarTablero(tablero, manejarSeleccion, casillaSeleccionada);
            return;
        }
        
        // Si hay una pieza en la casilla destino
        if (tablero[fila][col] !== null) {
            // Si la pieza es del mismo color, se cambia la selección.
            const colorDestino = esBlanca(tablero[fila][col])
            if (colorOrigen === colorDestino) {
                casillaSeleccionada = { fila, col }
                renderizarTablero(tablero, manejarSeleccion, casillaSeleccionada)
                return;

            }
        }
        // Si no, la movemos
        if (esMovimientoLegal(tablero, filaOrigen, colOrigen, fila, col, turnoActual === "blancas")) {
            moverPieza(tablero, filaOrigen, colOrigen, fila, col);

            // Limpiar selección.
            casillaSeleccionada = null;

            // Cambiar turno.
            turnoActual = turnoActual === "blancas" ? "negras" : "blancas";

            // Comprobar si el movimiento genera un jaque.
            if (hayJaque(tablero, turnoActual === "blancas")) {
                console.log("¡Jaque a las " + turnoActual + "!")  
            }
        }

    renderizarTablero(tablero, manejarSeleccion, casillaSeleccionada);
    }
}
renderizarTablero(tablero, manejarSeleccion, casillaSeleccionada);