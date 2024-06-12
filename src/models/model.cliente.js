import { con } from "../config/database.js";
import bcrypt from 'bcrypt';

class ClienteModel {

    // Método para obter todos os usuarios
    static getAllClientes(callback) {
        let sql = `select * from cliente`;
    
        con.query(sql, function (err, result){
            if (err)
                callback(err, null);
            else
                callback(null, result);
        });
    }

    // Método para criar um novo usuário
    static createCliente(nome, email, senha, callback) {
        // Criptografar senha
        const hash = bcrypt.hashSync(senha, 10);
        senha = hash;

        let sql = `insert into cliente (nome, email, senha) values (?, ?, ?)`;
        
        con.query(sql, [nome, email, senha], function(err, result){
            if (err)
                callback(err, null);
            else
                callback(null, result);
        });
    }

    // Método para editar um usuário existente
    static editCliente(id, nome, email, callback) {
        let sql = `update cliente set nome=?, email=? where id_cliente=?`;

        con.query(sql, [ nome, email, id ], function(err, result) {
            if (err) 
                callback (err, null);
            else
                callback (null, result);
        });
    }

    // Método para remover um usuário
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