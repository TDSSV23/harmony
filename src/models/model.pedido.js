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
        let sql = `insert into pedido(id_pedido, id_cliente, item_pedido)
                values (?, ?, ?)`;

                con.query(sql, [dados.id_pedido, dados.id_cliente, dados.item_pedido],
                    async function(err, result){
                if(err)
                    callback(err, null);
                else{
                    let id_pedido = result.insertId;
        
                        // Itens Pedido
                        for (let item of dados.itens){
                            sql = 'insert into pedido_item(id_pedido, id_cliente, item_pedido) values (?, ?, ?, ?)';
            
                            await query(sql, [id_pedido, id_cliente, item_pedido]);
                        }
            
                        callback(null, result);
                    }
                });
    }

}

export default PedidoModel;