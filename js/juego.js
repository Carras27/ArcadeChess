// /juego.js
import { validarTorre } from ".reglas/torre.js";
import { validarRey } from ".reglas/rey.js";
import { validarAlfil } from ".reglas/alfil.js";
import { validarCaballo } from ".reglas/caballo.js";
import { validarPeon } from ".reglas/peon.js";
import { validarDama } from ".reglas/dama.js";
import { dentroDelTablero, esPiezaDelMismoColor } from "./reglas/auxiliares";


// Funcion que devuelve 'true'' si una pieza es blanca.
function esBlanca(pieza) {
    return pieza === pieza.toUpperCase();
}


// Mueve la pieza de una casilla a otra.
export function moverPieza(tablero, fo, co, fd, cd) {
    const pieza = tablero[fo][co];

    if (!pieza) return false;

    const capturada = tablero[fd][cd]; // 'null' si no captura
    tablero[fd][cd] = pieza;
    tablero[fo][co] = null;

    // Devuelve la pieza que hace el movimiento y la pieza capturada, si la hay.
    return {pieza, capturada};
}

// Función que valida (o inválida) cualquier posible movimiento antes de realizarlo.
export function esMovimientoValido(tablero, fo, co, fd, cd) {
    // Primero se consultan reglas que afectan a todas las piezas por igual.
    if (!dentroDelTablero(fd, cd)) return false; // No moverse fuera del tablero.                
    if (fo === fd && co === cd) return false; // No moverse al mismo sitio.
    if (esPiezaDelMismoColor(tablero, fo, co, fd, cd)) return false; // No comer piezas del mismo color.


    // Ahora se consultan reglas que afectan distintamente a cada tipo de pieza.
    const pieza = tablero[fo][co];
    const tipo = pieza.toLowerCase(); // Se guarda el tipo en minúscula para tratar de la misma manera a piezas iguales de distinto color.
    const esBlanca = esBlanca(pieza); // Se guarda el color de la pieza, necesario para validar los movimientos de los peones.

    switch (tipo) {
        case "p": return validarPeon(tablero, fo, co, fd, cd, esBlanca);
        case "n": return validarCaballo(tablero, fo, co, fd, cd);
        case "b": return validarAlfil(tablero, fo, co, fd, cd);
        case "r": return validarTorre(tablero, fo, co, fd, cd);
        case "q": return validarDama(tablero, fo, co, fd, cd);
        case "k": return validarRey(tablero, fo, co, fd, cd);
        default:  return false;
    }
}

// Función para comprobar si existe estado de jaque.
export function hayJaque(tablero, esBlanca) {
    // Buscamos la posición del rey en jaque.
    let posRey = null;
    bucle: for (let f = 0; f < 8; f++) {
        for (let c = 0; c < 8; c++) {
            if ((tablero[f][c] === "k" && !esBlanca) || (tablero[f][c] === "K" && esBlanca)){
                posRey = { fila: f, col: c };
                break bucle; // Tras encontrar al rey en jaque, sale de los bucles.
            }
        }
    }

    // Si no hay rey (a priori, imposible) no hay jaque.
    if (!posRey) {
        console.warn("Rey no encontrado", esBlanca ? "blanco" : "negro");
        return false;
    }

    // Recorrer el tablero comprobando piezas enemigas
    for (let f = 0; f < 8; f++) {
        for (let c = 0; c < 8; c++) {
            const pieza = tablero[f][c];
            if (!pieza) continue; // Ante casilla sin piezas, sigue buscando.
            const piezaEsBlanca = esBlanca(pieza)
            if (piezaEsBlanca === esBlanca) continue; // Ante piezas del mismo color, sigue buscando.

            // Encontrada una pieza enemiga, comprobar si amenaza al rey.
            if (esMovimientoValido(tablero, f, c, posRey.fila, posRey.col)) {
                return true; // Jaque.
            }
        }
    }
}

export function hayJaqueMate() {
    return false;
}
