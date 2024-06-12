show databases;

-- Criar o banco de dados
create database loja;
use loja;

-- Criar tabela Cliente
CREATE TABLE cliente (
    id_cliente INT AUTO_INCREMENT PRIMARY KEY,
    nome VARCHAR(100),
    email VARCHAR(100),
    senha VARCHAR(100),
    tipo VARCHAR(20) DEFAULT 'cliente'
);
show tables;
show columns from cliente;


-- Produtos
CREATE TABLE produtos (
    id_produto INT AUTO_INCREMENT PRIMARY KEY,
    nome VARCHAR(100),
    descricao TEXT,
    preco DECIMAL(10, 2),
    categoria_id INT,
    FOREIGN KEY (categoria_id) REFERENCES categorias(id_categoria)
);
show tables;
show columns from produtos;

-- Pedidos
CREATE TABLE pedidos (
    id_pedido INT AUTO_INCREMENT PRIMARY KEY,
    usuario_id INT,
    data_pedido DATETIME,
    status ENUM ('pendente', 'processando', 'enviado', 'entregue')
);
show tables;
show columns from pedidos;


-- Categorias
CREATE TABLE categorias (
    id_categoria INT AUTO_INCREMENT PRIMARY KEY,
    nome VARCHAR(100)
);
show tables;
show columns from categorias;


-- Popular o banco

insert into produtos (nome, descricao, preco, categoria_id) values (
	'Vestido', 'Tecido tipo algodão orgânico e seda, Tamanho único, Cor azul marinho', 26.90, 1);
    
insert into produtos (nome, descricao, preco, categoria_id) values (
	'Saia', 'Tecido tipo linho misto, Tamanho único, Cor bege claro', 21.90, 2);
    
insert into produtos (nome, descricao, preco, categoria_id) values (
	'Lingerie', 'Tecido tipo renda e microfibra, Tamanho único, Cor vermelho bordô', 29.90, 3);
    
insert into produtos (nome, descricao, preco, categoria_id) values (
	'Camisa', 'Tecido tipo algodão leve, Tamanho único, Cor azul claro listrado', 20.90, 4);


-- SELECT
select * from cliente;
select * from produtos;
select * from pedidos;
select * from categorias;
