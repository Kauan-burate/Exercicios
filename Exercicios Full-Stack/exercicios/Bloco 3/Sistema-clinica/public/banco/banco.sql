CREATE DATABASE clinica_db;

CREATE TABLE especialidades (
    id   SERIAL PRIMARY KEY,
    nome VARCHAR(80) NOT NULL
);

CREATE TABLE medicos (
    id               SERIAL PRIMARY KEY,
    nome             VARCHAR(100) NOT NULL,
    crm              VARCHAR(20) UNIQUE NOT NULL,
    especialidade_id INTEGER REFERENCES especialidades(id)
);

CREATE TABLE consultas (
    id         SERIAL PRIMARY KEY,
    paciente   VARCHAR(100) NOT NULL,
    medico_id  INTEGER REFERENCES medicos(id),
    data_hora  TIMESTAMP NOT NULL,
    status     VARCHAR(20) DEFAULT 'agendada'
        CHECK (status IN ('agendada', 'realizada', 'cancelada')),
    observacao TEXT
);

INSERT INTO especialidades (nome) VALUES
    ('Clínica Geral'),
    ('Cardiologia'),
    ('Dermatologia'),
    ('Ortopedia'),
    ('Pediatria');

INSERT INTO medicos (nome, crm, especialidade_id) VALUES
    ('Dr. Carlos Mendes',   'CRM-12345', 1),
    ('Dra. Ana Ferreira',   'CRM-23456', 2),
    ('Dr. Paulo Oliveira',  'CRM-34567', 3),
    ('Dra. Maria Santos',   'CRM-45678', 4),
    ('Dr. João Costa',      'CRM-56789', 5);

INSERT INTO consultas (paciente, medico_id, data_hora, status) VALUES
    ('Lucas Alves',    1, '2025-09-01 09:00', 'agendada'),
    ('Fernanda Lima',  2, '2025-09-01 10:00', 'agendada'),
    ('Roberto Nunes',  1, '2025-09-02 14:00', 'realizada'),
    ('Camila Rocha',   3, '2025-09-03 11:00', 'cancelada'),
    ('Thiago Martins', 4, '2025-09-04 15:30', 'agendada');