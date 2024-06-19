import { con } from "../src/config/database.js";

class ItemPedidoModel {

    // Método para obter todos os usuarios
    static getAllItemPedidos(callback) {
        let sql = `select * from item_pedido`;
    
        con.query(sql, function (err, result){
            if (err)
                callback(err, null);
            else
                callback(null, result);
        });
    }

    // Método para criar um novo usuário
    static createItemPedido(id_item, id_pedido, id_produto, quantidade, total, callback) {
        
        let sql = `insert into item_pedido id_item, id_pedido, id_produto, quantidade, total
                values (?, ?, ?, ?, ?)`;
        
        con.query(sql, [id_item, id_pedido, id_produto, quantidade, total], function(err, result){
            if (err)
                callback(err, null);
            else
                callback(null, result);
        });
    }

    // Método para editar um usuário existente
    static editItemPedido(id, id_item, id_pedido, id_produto, quantidade, total) {
        let sql = `update produto set id_pedido=?, id_produto=?, quantidade=?, total=? where id_item=?`;

        con.query(sql, [ id_item, id_pedido, id_produto, quantidade, total, id ], function(err, result) {
            if (err) 
                callback (err, null);
            else
                callback (null, result);
        });
    }

    // Método para remover um usuário
    static removeItemPedido(id, callback) {
        let sql = `delete from item_pedido where id_item=?`;

        con.query(sql, [id], function(err, result){
            if (err)
                callback(err, null)
            else
                callback(null, result)
        });
    }

}

export default ItemPedidoModel;