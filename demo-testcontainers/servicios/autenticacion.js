'use strict'
const { log } = require("util");

/**
 * obtiene los datos de autenticación de los headers esperados.
 */
class Autenticacion {
    /**
     * instancia la clase con el evento que tiene que ser analizado desde aws
     * 
     * @param event evento recibido desde aws. Tiene que cumplir con:
     * 
     *  {   ...
     *      headers: {
     *          ...
     *          Authorization: Basic aW1laTpiZGd0cmE=
     *          ...
     *      }
     *      ...
     *  }
     */
    constructor(event) {
        this.ev = event
        /** tendra [idmovil, hashqr] */
        this.auth = Buffer.from(event.headers.Authorization.split(' ')[1], 'base64').toString('utf-8').split(':');
        if (this.auth.length !== 2) {
            throw new Error('No se puede obtener el campo de autenticación');
        }
    }
    
    /**
     * permite validar si el identificador del movil y el QR son validos.
     * 
     * el id del movil tiene un solo QR que tiene que estar activado, si es el recibido
     * se considera activo, en otro caso es no valido
     * 
     * @param {object} idQr contiene el id y el qr que tiene que ser validado.
     * 
     * @example {id: string, qr: string}
     * 
     */
    esAutenticado(idQr) {
        // TODO
        return false;
    }

    /**
     * obtiene el hash del qr enviado en la autenticación.
     */
    obtenerQR() {
        return this.auth[1];
    }

    /**
     * obtiene el id del movil que viene en la autenticación.
     */
    obtieneIdMovil() {
        return this.auth[0];
    }
}
module.exports = Autenticacion;
