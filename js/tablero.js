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
export function renderizarTablero(tablero) {

    // Busca el elemento 'tablero' en el DOM.
    const contenedor = document.getElementById("tablero"); 
    // Borra el estado anterior del tablero.
    contenedor.innerHTML = "";

    let casillaSeleccionada = null;

    // Para cada casilla del tablero:
    for (let fila = 0; fila < 8; fila++) {
        for (let col = 0; col < 8; col++) {

            // Crea un nuevo elemento <div> en el DOM.
            const casilla = document.createElement("div");
            // Le asigna una clase CSS (blancas o negras).
            casilla.classList.add(
                (fila + col) % 2 == 0 ? "blancas" : "negras"
            );

            casilla.dataset.fila = fila;
            casilla.dataset.columna = col;

            // Detectar casilla clicada.
            casilla.addEventListener("click", () => {
                // 'Des-seleccionar' casilla seleccionada previa.
                if (casillaSeleccionada) {
                    casillaSeleccionada.classList.remove("seleccionada");
                }

                // Seleccionar nueva casilla
                casillaSeleccionada = casilla;
                casillaSeleccionada.classList.add("seleccionada");

                console.log("Casilla: ", fila, col)
            })

            // Consulta y guarda el estado del juego.
            const pieza = tablero[fila][col];
            
            // Si hay una pieza en esa casilla:
            if (pieza) {
                // Guarda su nombre en la casilla.
                casilla.textContent = piezas[pieza];
            }

            // La añade al contenedor del DOM.
            contenedor.appendChild(casilla);
        }
    }
}