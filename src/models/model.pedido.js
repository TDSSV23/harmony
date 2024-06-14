import { con, query } from "../config/database.js";

class PedidoModel {

    static getAllPedidos(callback) {
        let sql = `select * from pedido`;

    con.query(sql, function(err, result){
        if (err) {
            callback(err, null);
        } else {
            callback(null, result);
        }
    });
    }

    static createPedido(dados, callback) {
        let sql = `insert into pedido(id_cliente, nome, end_logradouro, end_numero, end_bairro, end_cidade, end_uf, end_cep)
                values (?, ?, ?, ?, ?, ?, ?, ?)`;

                con.query(sql, [ dados.id_cliente, dados.item_pedido],
                    async function(err, result){
                if(err)
                    callback(err, null);
                else{
                    let id_pedido = result.insertId;
        
                        // Itens Pedido
                        for (let item of dados.itens){
                            sql = 'insert into item_pedido(id_cliente, nome, end_logradouro, end_numero, end_bairro, end_cidade, end_uf, end_cep) values (?, ?, ?, ?, ?, ?, ?, ?)';
            
                            await query(sql, [id_cliente, nome, end_logradouro, end_numero, end_bairro, end_cidade, end_uf, end_cep]);
                        }
            
                        callback(null, result);
                    }
                });
    }
     // Método para editar um pedido existente
     static editProduto(dados, callback) {
        let sql = `update pedido set (id_cliente, nome, end_logradouro, end_numero, end_bairro, end_cidade, end_uf, end_cep)`;

        con.query(sql, [(dados.id_cliente, dados.nome, dados.end_logradouro, dados.end_numero, dados.end_bairro, dados.end_cidade, dados.end_uf, dados.end_cep)], function(err, result) {
            if (err) 
                callback (err, null);
            else
                callback (null, result);
        });
    }

    // Método para remover um pedido
    static removeProduto(id, callback) {
        let sql = `delete from pedido where id_pedido=?`;

        con.query(sql, [id], function(err, result){
            if (err)
                callback(err, null)
            else
                callback(null, result)
        });
    }
}

export default PedidoModel;