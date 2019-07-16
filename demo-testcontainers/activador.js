/**
 * se encarga de la activacion de un código QR asociado a un id de móvil.
 */

'use strict'

const { log } = require("util");
const BD = require('./servicios/baseDatos');
const RP = require('./util/respuestas');
const Auth = require('./servicios/autenticacion');


exports.activar = async (event, ctx) => {
    const clientesql = new BD();
    let response = RP.error();

    try {
        const auth = new Auth(event);
        if (await clientesql.puedeSerActivadoQR(auth.obtenerQR()) && 
            await clientesql.activarQR(auth.obtenerQR(), auth.obtieneIdMovil())) {
            response = RP.okSinContenido();
        } else {
            response = RP.error('el código no puede ser activado');
        }
    } catch (e) {
        log(e);
        response = RP.error(e.message);
    } finally {
        clientesql.cerrar();
    }
    return response;
}
