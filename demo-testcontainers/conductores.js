'use strict'

const Conductor = require('./dominio/conductor');
const dummy = new Conductor('Sebastián Ávila A.', '1-9', 'savila@node.js');

/**
 * metodos relacionados con los conductores.
 */
exports.conductor = async (event, ctx) => {
    return {
        statusCode: 200,
        body: JSON.stringify(dummy)
    };
}
