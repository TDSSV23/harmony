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

    static createPedido(p, callback) {
        let sql = `insert into pedido(id_cliente, nome, end_logradouro, end_numero, end_bairro, end_cidade, end_uf, end_cep)
                values (?, ?, ?, ?, ?, ?, ?, ?)`;



                con.query(sql, [p.id_cliente, p.nome, p.end_logradouro, p.end_numero, p.end_bairro, p.end_cidade, p.end_uf, p.end_cep],
                    async function(err, result){
                if(err)
                    callback(err, null);
                else {
                    let id_pedido = result.insertId
    
                    for (let item of p.itens) { 
                        sql = 'insert into item_pedido(id_pedido, id_produto, quantidade, total) values (?, ?, ?, ?)';
    
                        await query(sql, [id_pedido, item.id_produto, item.quantidade, item.total])
                    }
                }
                callback(null, result);
                });
    }
     // Método para editar um pedido existente
     static editPedido(id, id_cliente, nome, end_logradouro, end_numero, end_bairro, end_cidade, end_uf, end_cep, callback) {
        let sql = `update pedido set id_cliente=?, nome=?, end_logradouro=?, end_numero=?, end_bairro=?, end_cidade=?, end_uf=?, end_cep=? where id_pedido=?`;

        con.query(sql, [ id_cliente, nome, end_logradouro, end_numero, end_bairro, end_cidade, end_uf, end_cep, id], function(err, result) {
            if (err) 
                callback (err, null);
            else
                callback (null, result);
        });
    }

    // Método para remover um pedido
    static removePedido(id, callback) {
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