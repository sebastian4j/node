CREATE SCHEMA machines;
CREATE TABLE machines.operador (
            id serial NOT NULL,
            nombre varchar(80) NOT NULL,
            apellido varchar(80) NOT NULL,
            rut varchar(13) NOT NULL,
            telefono varchar(60) NOT NULL,
            email varchar(60) NULL,
            perfil int4 NULL,
            cliente int4 NOT NULL,
            created timestamptz NOT NULL DEFAULT now(),
            createdby int4 NULL,
            edited timestamptz NULL,
            editedby int4 NULL,
            empresa int4 NULL,
            cg varchar(20) NULL DEFAULT ''::character varying(20),
            codigo int8 NULL,
            fecha_control_licencia timestamp NULL,
            direccion bpchar(60) NULL,
            numero_licencia bpchar(20) NULL,
            codigo_a int4 NULL,
            clase varchar(20) NULL,
            fecha_inicio_licencia date NULL,
            CONSTRAINT operador_pkey PRIMARY KEY (id),
            CONSTRAINT rut_cliente_unique UNIQUE (rut, cliente)
        );
create table machines.operador_qr (
            hash varchar,
            operador int4,
            nulo boolean,
            activado boolean,
            fecha_activado timestamptz,
            fecha_nulo timestamptz,
            fecha_creacion timestamptz default now(),
            id_movil varchar,
            constraint pk_op_qr primary key (hash, operador),
            constraint fk_operador foreign key (operador) references machines.operador (id)
        );
INSERT INTO machines.operador (id, nombre, apellido, rut, telefono, email, perfil,
             cliente, created, createdby, edited, editedby, empresa, cg, codigo, fecha_control_licencia,
              direccion, numero_licencia, codigo_a, clase, fecha_inicio_licencia) VALUES(4110, 'qwerty', 
              'ytrewq', '1-9', 'ddd', 'savila@node.js', NULL, 123, '2019-05-17 12:14:42.368', 
              NULL, NULL, NULL, NULL, '', 0, '2019-05-18 00:00:00.000', 'dir', '135', 12454, NULL, NULL);
INSERT INTO machines.operador_qr (hash, operador, nulo, activado, fecha_activado, fecha_nulo, fecha_creacion, id_movil) 
values ('bdgtra', 4110, false, false, null, null, now(), null);
INSERT INTO machines.operador_qr (hash, operador, nulo, activado, fecha_activado, fecha_nulo, fecha_creacion, id_movil) 
values ('bdgtrb', 4110, false, false, null, null, now(), null);
INSERT INTO machines.operador_qr (hash, operador, nulo, activado, fecha_activado, fecha_nulo, fecha_creacion, id_movil) 
values ('bdgtrc', 4110, false, true, null, null, now(), null);
