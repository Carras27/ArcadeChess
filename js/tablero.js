// /tablero.js

import { piezas } from "./piezas.js";

// Genera el estado inicial de cada posición del tablero.
export function crearTableroInicial() {
    return [
        ["r", "n", "b", "q", "k", "b", "n", "r"],
        ["p", "p", "p", "p", "p", "p", "p", "p"],
        [null, null, null, null, null, null, null, null], // Las casillas vacías se representan con 'null'.
        [null, null, null, null, null, null, null, null],
        [null, null, null, null, null, null, null, null],
        [null, null, null, null, null, null, null, null],
        ["P", "P", "P", "P", "P", "P", "P", "P"],
        ["R", "N", "B", "Q", "K", "B", "N", "R"]
    ];
}

// Dibujar el tablero de ajedrez.
export function renderizarTablero(tablero, manejarSeleccion, casillaSeleccionada, turno, dirus) {
    // Busca el elemento 'tablero' en el DOM.
    const contenedor = document.getElementById("tablero"); 
    // Borra el estado anterior del tablero.
    contenedor.innerHTML = "";

    // Para cada casilla del tablero:
    for (let fila = 0; fila < 8; fila++) {
        for (let col = 0; col < 8; col++) {

            // Crea un nuevo elemento <div> en el DOM.
            const casilla = document.createElement("div");
            // Le asigna una clase CSS (blancas o negras).
            casilla.classList.add(
                (fila + col) % 2 == 0 ? "blancas" : "negras"
            );

            // Si hay una casilla seleccionada, y es la que está pintando, la pinta verde.
            if (casillaSeleccionada && casillaSeleccionada.fila === fila && casillaSeleccionada.col === col) {
                casilla.classList.add("seleccionada");
            }

            
            // Consulta y guarda el estado del juego.
            const pieza = tablero[fila][col];
            // Si hay una pieza en esa casilla:
            if (pieza) {
                // Guarda su nombre en la casilla.
                casilla.textContent = piezas[pieza]
            }

            // Detectar casilla clicada.
            casilla.addEventListener("click", () => {
                manejarSeleccion(fila, col)
            })

            // La añade al contenedor del DOM.
            contenedor.appendChild(casilla);
        }
    }
    document.getElementById("turno-num").textContent = turno;
    document.getElementsByClassName("texto-monedas")[0].textContent = dirus;
}