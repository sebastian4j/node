'use strict'
/**
 * respuestas predefinidas para los servicios.
 */
class Respuestas {
    /**
     * response el codigo http 201 como status code.
     */
    static okSinContenido() {
        return {
            statusCode: 201
        };
    }

    /**
     * envia el error 500 con el mensaje de error.
     */
    static error(mensaje) {
        return {
            statusCode: 500,
            body: mensaje
        };
    }
}

module.exports = Respuestas;