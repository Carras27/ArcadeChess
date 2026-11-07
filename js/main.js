// main.js

import { crearTableroInicial, renderizarTablero }
    from "./tablero.js";
import { esMovimientoLegal, moverPieza, esBlanca, hayJaque, hayJaqueMate, hayAhogado} from "./juego.js";
import { ejecutarEnroque } from "./reglas/enroque.js";

const tablero = crearTableroInicial();

// Variable para manejar la selección de casilla.
let casillaSeleccionada = null;
// Variable para manejar a quién le toca mover.
let turnoActual = "blancas";
// Variable para manejar el estado de la partida
let partidaTerminada = false;
// Variable para manejar la validez del enroque.
// Detecta si el rey o las torres ya realizaron algún movimiento durante la partida.
let estadoEnroque = {
    blancas: { reyMovido: false, torreIzquierdaMovida: false, torreDerechaMovida: false },
    negras:  { reyMovido: false, torreIzquierdaMovida: false, torreDerechaMovida: false }
}


function manejarSeleccion(fila, col) {
    const pieza = tablero[fila][col]

    if (partidaTerminada) return; // Si la partida se terminó, los clicks no funcionan.

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
        const fo = casillaSeleccionada.fila;
        const co = casillaSeleccionada.col;
        const colorOrigen = esBlanca(tablero[fo][co])

        // Si pulsamos la misma casilla, cancelamos la selección.
        if (fo === fila && co === col) {
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
        if (esMovimientoLegal(tablero, fo, co, fila, col, turnoActual === "blancas", estadoEnroque)) {
            // Primero, miramos si es un movimiento normal o un enroque.
            const piezaMovida = tablero[fo][co];
            const esEnroque = piezaMovida.toLowerCase() === "k" && Math.abs(col - co) === 2;

            if (esEnroque) {
                ejecutarEnroque(tablero, fo, co, fila, col);
            } else {
                moverPieza(tablero, fo, co, fila, col);
            }

            // Limpiar selección.
            casillaSeleccionada = null;

            // Cambiar turno.
            turnoActual = turnoActual === "blancas" ? "negras" : "blancas";

            // Comprobar si el movimiento genera un jaque mate (fin de la partida) o un jaque.
            if (hayJaqueMate(tablero, turnoActual === "blancas")) {
                renderizarTablero(tablero, manejarSeleccion, casillaSeleccionada);
                mensaje.textContent = "¡Jaque mate! Ganan las " + (turnoActual ? "blancas" : "negras");
                return;
            }
            else if (hayAhogado(tablero, turnoActual === "blancas")) {
                renderizarTablero(tablero, manejarSeleccion, casillaSeleccionada);
                mensaje.textContent = "Tablas por ahogado";
                return;
            }
            else if (hayJaque(tablero, turnoActual === "blancas")) {
                alert("¡Jaque!");
            }
        }

    renderizarTablero(tablero, manejarSeleccion, casillaSeleccionada);
    }
}
renderizarTablero(tablero, manejarSeleccion, casillaSeleccionada);