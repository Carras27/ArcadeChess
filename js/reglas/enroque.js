// /reglas/enroque.js

import { hayJaque } from "../juego.js";

// Comprueba si hacer un enroque en el estado actual es legal. El origen será 
export function validarEnroque (tablero, fo, co, fd, cd, esBlanca, estadoEnroque) {
    
    // El rey debe moverse dos casillas en horizontal.
    if (fo !== fd) return false;
    if (Math.abs(cd - co) !== 2) return false;

    // Determinar la dirección del enroque.
    const esCorto = cd > co;
    const colTorre = esCorto ? 7 : 0;
    const filaInicial = esBlanca ? 7 : 0;

    // El rey debe estar en su casilla inicial.
    if (fo !== filaInicial || co !== 4) return false;

    // La torre debe estar en su casilla inicial.
    const torre = esBlanca ? "R" : "r";
    if (tablero[filaInicial][colTorre] !== torre) return false;

    // Las dos piezas no deben haberse movido antes.
    const estado = esBlanca ? estadoEnroque.blancas : estadoEnroque.negras;
    if (estado.reyMovido) return false;
    if (esCorto && estado.torreDerechaMovida) return false;
    if (!esCorto && estado.torreIzquierdaMovida) return false;

    // Las casillas entre rey y torre deben estar vacías.
    const direccion = esCorto ? 1 : -1;
    for (let c = co + direccion; c !== colTorre; c+= direccion) {
        if (tablero[fo][c] !== null) return false;
    }

    // El rey no puede estar en posición de jaque.
    if (hayJaque(tablero, esBlanca)) return false;

    // El rey no puede pasar o terminar por una casilla en jaque.
    const rey = esBlanca ? "K" : "k";
    const reyOriginal = tablero[fo][co];

    // Simularemos cada nueva posición para comprobar jaques por el camino.
    for (let c = co + direccion; c += direccion;) {
        // Simular nueva posición del rey.
        tablero[fo][co] = null;
        tablero[fo][c] = rey;

        const atascado = hayJaque(tablero, esBlanca);

        // Recuperar la posición inicial.
        tablero[fo][c] = null;
        tablero[fo][co] = reyOriginal;

        if (atascado) return false;
        if (c === cd) break; // Si ya comprobamos todas las posiciones, salimos del bucle;
    }

    // Si se superan todas las comprobaciones, el enroque es legal;
    return true;
}

// Ejecuta el enroque previamente validado.
export function ejecutarEnroque (tablero, fo, co, fd, cd) {
    const esCorto = cd > co; // Si el rey va hacia la derecha, enroque corto.

    // Mover el rey
    const rey = tablero[fo][co];
    tablero[fo][co] = null;
    tablero[fd][cd] = rey;

    // Mover la torre
    const colTorreOrigen = esCorto ? 7 : 0;
    const colTorreDestino = esCorto ? cd - 1 : cd + 1;
    const torre = tablero[fo][colTorreOrigen];
    console.log(esCorto, colTorreDestino)
    tablero[fo][colTorreDestino] = torre;
    tablero[fo][colTorreOrigen] = null;   
}


 // Deshace un enroque, restaurando rey y torre a sus casillas originales.
 // Se usa en la simulación de esMovimientoLegal.
export function deshacerEnroque(tablero, fo, co, fd, cd) {
    const esCorto = cd > co;

    // Devuelve la torre.
    const colTorreOrigen  = esCorto ? 7 : 0;
    const colTorreDestino = esCorto ? cd - 1 : cd + 1;

    const torre = tablero[fo][colTorreDestino];
    tablero[fo][colTorreDestino] = null;
    tablero[fo][colTorreOrigen]  = torre;

    // Devuelve al rey.
    const rey = tablero[fd][cd];
    tablero[fd][cd] = null;
    tablero[fo][co] = rey;
}