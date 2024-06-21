import ClienteModel from "../models/model.cliente.js";

class ClienteController {
    // Método para ver clientes existentes
    static getAllClientes(req, res) {
        try {
            ClienteModel.getAllClientes(function(err, result){
                if (err) {
                    console.error(err);
                    return res.status(500).json( { error: "Ocorreu um erro ao buscar os Clientes." } );
                }

                if (!result[0]) {
                    return res.status(404).json( {message: "Não foram encontrados Clientes."} );
                }

                return res.status(200).json(result);
            });
        } catch (error) {
            console.error(error);
            res.status(500).json( { error: "Erro interno no servidor." } );
        }
    }
    // Método para criar um cliente
    static createCliente(req, res) {
        const p = req.body;
        const nome = p.nome;
        const telefone = p.telefone;
        const email = p.email;
        const senha = p.senha;

        try {
            ClienteModel.createCliente(nome, telefone, email, senha, function(err, result){
                if(err) {
                    console.error("Erro ao cadastrar o cliente: ", err);
                    return res.status(500).json( { error: "Ocorreu um erro ao cadastrar o cliente." } );
                }

                return res.status(201).json( { 
                    mensage: "cliente inserido com sucesso.", 
                    data: {
                        id: result.insertId,
                        nome,
                        telefone,
                        email
                    }
                } );
            });

        } catch (error) {
            console.error(error);
            res.status(500).json( { error: "Erro interno do servidor." } )
        }
    }
    // Método para editar um cliente existente
    static editCliente(req, res) {
        const id = req.params.id;
        const p = req.body;
        const nome = p.nome;
        const telefone = p.telefone;
        const email = p.email;

        try {
            ClienteModel.editCliente(id, nome, telefone, email, function(err, result){
                if (err) {
                    console.error("Erro ao editar o cliente: ", err);
                    return res.status(500).json( { error: "Ocorreu um erro ao editar o cliente." } );
                };

                if (result.affectedRows === 0) {
                    return res.status(404).json( { mensage: "Cliente não encontrado." } );
                };

                return res.status(200).json(
                    {
                        mansage: "Cliente editado com sucesso.",
                        data: {
                            id, nome, telefone, email
                        }
                    }
                );               
            });

        } catch (error) {
            res.status(500).json( { error: "Erro interno no servidor." } );
        }
    }
    // Método para remover um cliente
    static removeCliente(req, res) {
        let id = req.params.id;
        
        try {
            ClienteModel.removeCliente(id, function(err, result){
                if (err) {
                    console.error("Erro ao deletar o cliente: ", err);
                    return res.status(500).json( { error: "Ocorreu um erro ao deletar o cliente." } );
                }

                if (result.affectedRows === 0) {
                    return res.status(404).json( { mensage: "Cliente não encontrado." } )
                }

                return res.status(200).json( { mensage: "Cliente deletado com sucesso.",
                                               data: { id } } );
            });
        } catch (error) {
            console.error(error);
        res.status(500).json( { error: "Erro interno no servidor" } );
        }
    }

}

export default ClienteController;