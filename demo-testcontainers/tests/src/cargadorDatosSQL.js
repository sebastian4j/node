'use strict';
const fs = require('fs');
const path = require('path');
/**
 * carga los datos para la base de datos.
 */
class CargadorDatosPruebas {
    /** carga los datos del archivo bd.sql. */
    static async cargar(clienteSQL) {
        const scripts = fs.readFileSync(path.resolve(__dirname, '../resources/bd.sql'), 'utf-8')
            .split(";");
        for (const script of scripts) {
            await clienteSQL.query(script);
        }
    }
}

module.exports = CargadorDatosPruebas;
