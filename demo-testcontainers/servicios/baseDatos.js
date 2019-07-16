'use strict';

const { Pool } = require('pg');

/**
 * operaciones relacionadas con la base de datos.
 */
class BaseDatos {
    constructor() {
        this.pool = new Pool({
            connectionString: process.env.postgresurl, max: 1
        });

        this.pool.on('error', (err, client) => {
            console.error(err, client);
            throw new Error('error con la base de datos');
        })
    }

    /**
     * valida que el qr esté no nulo y no activado.
     * 
     * @param {string} hashqr contenido del hashqe que se necesita validar
     */
    async puedeSerActivadoQR(hashqr) {
        const cliente = await this.pool.connect();
        let res = false;
        try {
            res = await cliente.query('select (not nulo and not activado) disponible from machines.operador_qr where hash = $1', [hashqr]);
        } finally {
            cliente.release();
        }
        return res.rows[0].disponible;
    }

    /**
     * activa el código qr asociandolo al id del movil y anula todos los otros si existen.
     * 
     * @param {string} hashqr hash leido desde el qr
     * @param {string} idmovil identificación del movil que lee el qr
     */
    async activarQR(hashqr, idmovil) {
        const cliente = await this.pool.connect();
        let res = false;
        try {
            await cliente.query('BEGIN');
            res = await cliente.query(
                `update machines.operador_qr set activado = true, fecha_activado = now() , id_movil = $1 
                 where hash = $2 and nulo = false and activado = false`,
                [idmovil, hashqr]);
            if (res.rowCount !== 1) {
                throw new Error('no se pudo realizar la activacion QR');
            }
            res = await cliente.query(
                `update machines.operador_qr set nulo = true, activado = false, fecha_nulo = now() where operador = (
                    select operador from machines.operador_qr where hash = $1) and hash != $1`,
                [hashqr]);
            await cliente.query('COMMIT')
        } catch (e) {
            await cliente.query('ROLLBACK');
            throw e;
        } finally {
            cliente.release();
        }
        return res;
    }

    /**
     * ejecuta la query indicada (sin argumentos).
     * 
     * @param {string} sql {query que tiene que ser insertada
     */
    async query(sql) {
        let res;
        const cliente = await this.pool.connect();
        try {
            res = await cliente.query(sql);
        } finally {
            cliente.release();
        }
        return res;
    }

    /** cierra el pool de conexiones. */
    cerrar() {
        this.pool.end();
    }
}

module.exports = BaseDatos;
