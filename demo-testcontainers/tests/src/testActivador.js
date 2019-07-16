'use strict';

const app = require('../../activador.js');
const chai = require('chai');
const fs = require('fs');
const path = require("path");
const expect = chai.expect;
const PSQL = require('./testPostgresql');
const event = JSON.parse(fs.readFileSync(path.resolve(__dirname, '../resources/event.json'), 'UTF-8'));

describe('test servicio de activacion hash qr', function () {
    it('verifica http response esperado', async () => {
        const container = await PSQL.iniciar();
        try {                        
            // se activa con el primer request
            const activado = await app.activar(event);
            expect(activado.statusCode).to.equal(201);
            // los siguientes no se pueden activar
            const noactivado = await app.activar(event);
            expect(noactivado.statusCode).to.equal(500);
        } finally {
            await PSQL.detener(container);
        }
    })
});