
CREATE DATABASE cardapio_db;

CREATE TABLE categorias (
    id   SERIAL PRIMARY KEY,
    nome VARCHAR(50) NOT NULL
);

CREATE TABLE pratos (
    id           SERIAL PRIMARY KEY,
    nome         VARCHAR(100) NOT NULL,
    descricao    TEXT,
    preco        DECIMAL(10,2) NOT NULL,
    disponivel   BOOLEAN DEFAULT true,
    categoria_id INTEGER REFERENCES categorias(id)
);

INSERT INTO categorias (nome) VALUES
    ('Entradas'),
    ('Pratos Principais'),
    ('Sobremesas'),
    ('Bebidas');

INSERT INTO pratos (nome, descricao, preco, disponivel, categoria_id) VALUES
    ('Bruschetta',        'Pão tostado com tomate e manjericão', 18.90, true,  1),
    ('Carpaccio',         'Fatias finas de carne com molho especial', 32.90, true, 1),
    ('Frango Grelhado',   'Filé de frango com legumes',          45.90, true,  2),
    ('Salmão ao Molho',   'Salmão grelhado com molho de ervas',  68.90, false, 2),
    ('Risoto de Cogumelo','Risoto cremoso com cogumelos frescos', 52.90, true,  2),
    ('Pudim de Leite',    'Pudim tradicional com calda de caramelo',16.90,true, 3),
    ('Sorvete Artesanal', '3 bolas de sorvete artesanal',        14.90, true,  3),
    ('Suco Natural',      'Suco de fruta fresca',                 9.90, true,  4),
    ('Água com Gás',      'Água mineral com gás 500ml',           6.90, true,  4);