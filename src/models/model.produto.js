import { con } from "../config/database.js";

class ProdutoModel {

    // Método para obter todos os usuarios
    static getAllProdutos(callback) {
        let sql = `select * from produto`;
    
        con.query(sql, function (err, result){
            if (err)
                callback(err, null);
            else
                callback(null, result);
        });
    }

    // Método para criar um novo usuário
    static createProduto(nome, descricao, preco, callback) {

        let sql = `insert into produto (nome, descricao, preco) values (?, ?, ?)`;
        
        con.query(sql, [nome, descricao, preco], function(err, result){
            if (err)
                callback(err, null);
            else
                callback(null, result);
        });
    }

    // Método para editar um usuário existente
    static editProduto(id, nome, descricao, preco, callback) {
        let sql = `update produto set nome=?, descricao=?, preco=? where id_produto=?`;

        con.query(sql, [ nome, descricao, preco, id ], function(err, result) {
            if (err) 
                callback (err, null);
            else
                callback (null, result);
        });
    }

    // Método para remover um usuário
    static removeProduto(id, callback) {
        let sql = `delete from produto where id_produto=?`;

        con.query(sql, [id], function(err, result){
            if (err)
                callback(err, null)
            else
                callback(null, result)
        });
    }

}

export default ProdutoModel;