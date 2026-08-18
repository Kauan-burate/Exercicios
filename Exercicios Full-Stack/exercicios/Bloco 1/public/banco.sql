CREATE DATABASE teste_db;


CREATE TABLE tarefas(
	id SERIAL PRIMARY KEY,
	titulo VARCHAR(150),
	concluida VARCHAR(30)
);

INSERT INTO tarefas(titulo, concluida)
VALUES
('Fazer exercicios de programação', 'Sim'),
('Fazer exercicios escola', 'Não'),
('Passar no mercado', 'Sim');


select * from tarefas;