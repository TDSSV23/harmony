import { con, query } from "../config/database.js";

class PedidoModel {
    // Método para ver os pedidos existentes
    static getAllPedidos(callback) {
            // Consulta e seleção dos campos
            // Left Join serve para unir as tables
          const sql = `
            SELECT
              p.id_pedido,
              p.id_cliente,
              p.nome AS nome_pedido,
              p.end_logradouro,
              p.end_numero,
              p.end_bairro,
              p.end_cidade,
              p.end_uf,
              p.end_cep,
              ip.id_produto,
              ip.quantidade,
              ip.total,
              pr.nome AS nome_produto
            FROM pedido p
            LEFT JOIN item_pedido ip ON p.id_pedido = ip.id_pedido
            LEFT JOIN produto pr ON ip.id_produto = pr.id_produto
          `;
      
          con.query(sql, (err, result) => {
            if (err) {
              callback(err, null);
            } else {
              const pedidos = result.map((row) => ({
                id_pedido: row.id_pedido,
                id_cliente: row.id_cliente,
                nome_pedido: row.nome_pedido,
                end_logradouro: row.end_logradouro,
                end_numero: row.end_numero,
                end_bairro: row.end_bairro,
                end_cidade: row.end_cidade,
                end_uf: row.end_uf,
                end_cep: row.end_cep,
                // Organização da table pedidos junto a table item_pedido 
                itens: [
                  {
                    id_produto: row.id_produto,
                    quantidade: row.quantidade,
                    total: row.total,
                    nome_produto: row.nome_produto,
                  },
                  // Adicione mais itens conforme necessário
                ],
              }));
      
              callback(null, pedidos);
            }
          });
    }
    // Método para criar um pedido 
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