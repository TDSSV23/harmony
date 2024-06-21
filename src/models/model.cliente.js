import { con } from "../config/database.js";
import bcrypt from 'bcrypt';

class ClienteModel {

    // Método para obter todos os clientes
    static getAllClientes(callback) {
        let sql = `select * from cliente`;
    
        con.query(sql, function (err, result){
            if (err)
                callback(err, null);
            else
                callback(null, result);
        });
    }
    // Método para criar um novo cliente
    static createCliente(nome, telefone, email, senha, callback) {
        // Criptografar senha
        const hash = bcrypt.hashSync(senha, 10);
        senha = hash;

        let sql = `insert into cliente (nome, telefone, email, senha) values (?, ?, ?, ?)`;
        
        con.query(sql, [nome, telefone, email, senha], function(err, result){
            if (err)
                callback(err, null);
            else
                callback(null, result);
        });
    }
    // Método para editar um cliente existente
    static editCliente(id, nome, telefone, email, callback) {
        let sql = `update cliente set nome=?, telefone=?, email=? where id_cliente=?`;

        con.query(sql, [ nome, telefone, email, id ], function(err, result) {
            if (err) 
                callback (err, null);
            else
                callback (null, result);
        });
    }
    // Método para remover um cliente
    static removeCliente(id, callback) {
        let sql = `delete from cliente where id_cliente=?`;

        con.query(sql, [id], function(err, result){
            if (err)
                callback(err, null)
            else
                callback(null, result)
        });
    }

}

export default ClienteModel;