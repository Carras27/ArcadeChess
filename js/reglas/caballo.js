// /reglas/caballo.js

// El caballo salta, así que es la pieza más simple, no hay que comprobar obstáculos.
export function validarCaballo(tablero, fo, co, fd, cd) {
    // Se calculan el número de filas y columnas del salto.
    const df = Math.abs(fd-fo);
    const dc = Math.abs(cd-co);

    // Si el salto es válido (en L) devolverá 'true'.
    return (df === 2 && dc === 1) || (df === 1 && dc === 2);
}