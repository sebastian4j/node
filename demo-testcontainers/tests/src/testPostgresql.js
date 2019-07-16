const { GenericContainer } = require("testcontainers");
const { Duration, TemporalUnit } = require("node-duration");
const BD = require('../../servicios/baseDatos');
const cargador = require('./cargadorDatosSQL');

/**
 * se encarga de iniciar y detener la instancia de pruebas de postgresql.
 */
class TestPostgreSQL {
    /**
     * inicia la instancia de postgres en el contenedor.
     */
    static async iniciar() {
        const container = await new GenericContainer("postgres")
            .withExposedPorts(5432)
            .withStartupTimeout(new Duration(10000, TemporalUnit.SECONDS))
            .start();
        process.env.postgresurl =
            `postgresql://postgres:@${container.getContainerIpAddress()}:${container.getMappedPort(5432)}/postgres`;
        const clientesql = new BD();
        await cargador.cargar(clientesql);
        clientesql.cerrar();
        return container;
    }

    /**
     * detiene la instancia recibida.
     */
    static detener(container) {
        container.stop();
    }
}

module.exports = TestPostgreSQL;