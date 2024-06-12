import ClienteModel from "../models/model.cliente.js";


class ClientesController {

    static getAllCLientes(req, res) {
        try {
            ClienteModel.getAllUsuarios(function(err, result){
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

    static createCliente(req, res) {
        const p = req.body;
        const nome = p.nome;
        const email = p.email;
        const senha = p.senha;

        try {
            UsuarioModel.createCliente(nome, email, senha, function(err, result){
                if(err) {
                    console.error("Erro ao cadastrar o cliente: ", err);
                    return res.status(500).json( { error: "Ocorreu um erro ao cadastrar o cliente." } );
                }

                return res.status(201).json( { 
                    mensage: "cliente inserido com sucesso.", 
                    data: {
                        id: result.insertId,
                        nome,
                        email
                    }
                } );
            });

        } catch (error) {
            console.error(error);
            res.status(500).json( { error: "Erro interno do servidor." } )
        }
    }

    static editCliente(req, res) {
        const id = req.params.id;
        const p = req.body;
        const nome = p.nome;
        const email = p.email;

        try {
            ClienteModel.editCliente(id, nome, email, function(err, result){
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
                            id, nome, email
                        }
                    }
                );               
            });

        } catch (error) {
            res.status(500).json( { error: "Erro interno no servidor." } );
        }
    }

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