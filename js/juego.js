// juego.js
import { validarTorre } from "./reglas/torre.js";
import { validarRey } from "./reglas/rey.js";
import { validarAlfil } from "./reglas/alfil.js";
import { validarCaballo } from "./reglas/caballo.js";
import { validarPeon } from "./reglas/peon.js";
import { validarDama } from "./reglas/dama.js";
import { dentroDelTablero, esPiezaDelMismoColor } from "./reglas/auxiliares.js";
import { ejecutarEnroque, validarEnroque, deshacerEnroque } from "./reglas/enroque.js";


// Funcion que devuelve 'true'' si una pieza es blanca.
export function esBlanca(pieza) {
    return pieza === pieza.toUpperCase();
}


// Mueve la pieza de una casilla a otra.
export function moverPieza(tablero, fo, co, fd, cd, blancas, estadoEnroque) {
    const pieza = tablero[fo][co];

    if (!pieza) return false;

    const capturada = tablero[fd][cd]; // 'null' si no captura
    tablero[fd][cd] = pieza;
    tablero[fo][co] = null;

    const estado = blancas ? estadoEnroque.blancas : estadoEnroque.negras;

    if (pieza.toLowerCase() === "k") estado.reyMovido = true;
    else if(pieza.toLowerCase() === "r" && co == 7) estado.torreDerechaMovida = true;
    else if (pieza.toLowerCase() === "r" && co == 0 ) estado.torreIzquierdaMovida = true;
    
    // Devuelve la pieza que hace el movimiento y la pieza capturada, si la hay.
    return {pieza, capturada};
}

// Función que comprueba la validez de cualquier posible movimiento antes de realizarlo.
export function esMovimientoValido(tablero, fo, co, fd, cd, estadoEnroque = null) {
    // Primero se consultan reglas que afectan a todas las piezas por igual.
    if (!dentroDelTablero(fd, cd)) return false; // No moverse fuera del tablero.                
    if (fo === fd && co === cd) return false; // No moverse al mismo sitio.
    if (esPiezaDelMismoColor(tablero, fo, co, fd, cd)) return false; // No comer piezas del mismo color.


    // Ahora se consultan reglas que afectan distintamente a cada tipo de pieza.
    const pieza = tablero[fo][co];
    const tipo = pieza.toLowerCase(); // Se guarda el tipo en minúscula para tratar de la misma manera a piezas iguales de distinto color.
    const blanca = esBlanca(pieza); // Se guarda el color de la pieza, necesario para validar los movimientos de los peones.
    switch (tipo) {
        case "p": return validarPeon(tablero, fo, co, fd, cd, blanca);
        case "n": return validarCaballo(tablero, fo, co, fd, cd);
        case "b": return validarAlfil(tablero, fo, co, fd, cd);
        case "r": return validarTorre(tablero, fo, co, fd, cd);
        case "q": return validarDama(tablero, fo, co, fd, cd);
        case "k":
            // Si el rey intenta mover 2 casillas, se comprueba el enroque.
            if (Math.abs(cd - co) === 2 && estadoEnroque) {
                return validarEnroque(tablero, fo, co, fd, cd, blanca, estadoEnroque)
            }
            // Si no, hace una validación normal.
            return validarRey(tablero, fo, co, fd, cd);
        default:  return false;
    }
}

// Función que comprueba si tras un movimiento ocurriría un jaque al propio rey, invalidándolo.
export function esMovimientoLegal(tablero, fo, co, fd, cd, esBlancaTurno, estadoEnroque = null) {
    if (!esMovimientoValido(tablero, fo, co, fd, cd, estadoEnroque)) return false;

    // Comprueba si el movimiento es un enroque.
    let pieza     = tablero[fo][co];
    const esEnroque = pieza?.toLowerCase() === "k" && Math.abs(cd - co) === 2;

    let capturada; // Para el caso de no enroque.

    // Simula el movimiento.
    if (esEnroque) {
        ejecutarEnroque(tablero, fo, co, fd, cd);
    } else {
        pieza = tablero[fo][co];
        capturada = tablero[fd][cd];
        tablero[fd][cd] = pieza;
        tablero[fo][co] = null;
    }

    // Comprueba el jaque en el nuevo estado del tablero.
    const quedaEnJaque = hayJaque(tablero, esBlancaTurno);

    // Deshace el movimiento.
    if (esEnroque) {
        deshacerEnroque(tablero, fo, co, fd, cd);
    } else {
        tablero[fo][co] = pieza;
        tablero[fd][cd] = capturada;
    }
    // Devuelve la legalidad del movimiento.
    return !quedaEnJaque;
}

// Función para comprobar si existe estado de jaque.
export function hayJaque(tablero, blanca) {
    // Buscamos la posición del rey en jaque.
    let posRey = null;
    bucle: for (let f = 0; f < 8; f++) {
        for (let c = 0; c < 8; c++) {
            if ((tablero[f][c] === "k" && !blanca) || (tablero[f][c] === "K" && blanca)){
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
            if (piezaEsBlanca === blanca) continue; // Ante piezas del mismo color, sigue buscando.

            // Encontrada una pieza enemiga, comprobar si amenaza al rey.
            if (esMovimientoValido(tablero, f, c, posRey.fila, posRey.col)) {
                return true; // Jaque.
            }
        }
    }
    return false;
}


// Comprueba si existe algún movimiento legal para uno de los jugadores. En caso de que no, habrá perdido.
export function tieneAlgunMovimientoLegal(tablero, blanca) {
    // Comprueba todas las piezas.
    for (let fo = 0; fo < 8; fo++) {
        for (let co = 0; co < 8; co++) {
            const pieza = tablero[fo][co];
            if (!pieza) continue; // Si no hay pieza en la casilla, sigue.
            if (esBlanca(pieza) !== blanca) continue; // Si la pieza es del rival, sigue.

            // Comprueba todos los movimientos posibles para cada pieza.
            for (let fd = 0; fd < 8; fd++) {
                for (let cd = 0; cd < 8; cd++) {
                    if (esMovimientoLegal(tablero, fo, co, fd, cd, blanca)) {
                        return true;
                    }
                }
            }
        }
    }
    return false;
}

// Comprobar si hay jaque mate.
export function hayJaqueMate(tablero, blanca) {
    return hayJaque(tablero, blanca) && !tieneAlgunMovimientoLegal(tablero, blanca);
}

// Comprobar si hay rey ahogado.
export function hayAhogado(tablero, blanca) {
    return !hayJaque(tablero, blanca) && !tieneAlgunMovimientoLegal(tablero, blanca);
}

// Calcula la recompensa tras capturar una pieza.
export function calcularRecompensa(piezaCapturada, blanca, racha) {
    if (!blanca) return 0;

    let recompensa = 0;
    switch (piezaCapturada?.toLowerCase()) {
        case "p": recompensa = 1; break;
        case "n": recompensa = 4; break;
        case "b": recompensa = 3; break;
        case "r": recompensa = 5; break;
        case "q": recompensa = 8; break;
        default: return 0;
    }

    return recompensa + racha*2; // Incrementa la recompensa por cada pieza capturada consecutivamente.
}

// Comprueba que el jugador pueda comprar un producto.
export function puedeComprar(dirus, precio) {
    return dirus >= precio;
}
