import PedidoModel from "../models/model.pedido.js";

class PedidoController {
    // Método para ver os pedidos existentes
    static getAllPedidos(req, res) {
        try { 
            PedidoModel.getAllPedidos(function(err, result){
                if (err) {
                    console.error(err);
                    return res.status(500).json( { error: "Ocorreu um erro ao buscar os pedidos." } );
                }

                if (!result[0]) {
                    return res.status(404).json( {message: "Não foram encontrados pedidos."} );
                }
                
                return res.status(200).json(result);
            });
        } catch (error) {
            console.error(error);
            res.status(500).json( { Erro: "Erro interno do servidor." } )
        }
    }
    // Método para criar um pedido 
    static createPedido(req, res) {
        const p = req.body;
        
        try {
            PedidoModel.createPedido(p, function(err, result){
                if(err) {
                    console.error("Erro ao adicionar o pedido: ", err);
                    return res.status(500).json( { error: "Ocorreu um erro ao adicionar o pedido." } );
                }

                return res.status(201).json( { 
                    mensage: "Pedido adicionado com sucesso.", 
                    data: {
                        id: result.insertId,
                        p
                    }
                } );
            });

        } catch (error) {
            console.error(error);
            res.status(500).json( { error: "Erro interno do servidor." } )
        }
    }
    // Método para editar um pedido existente
    static editPedido(req, res) { 
        const p = req.body;
        let id = req.params.id;
        const id_cliente = p.id_cliente;
        const nome = p.nome;
        const logradouro = p.end_logradouro;
        const numero = p.end_numero;
        const bairro = p.end_bairro;
        const cidade = p.end_cidade;
        const uf = p.end_uf;
        const cep = p.end_cep;
        try {
                PedidoModel.editPedido(id, id_cliente, nome, logradouro, numero, bairro, cidade, uf, cep, function(err, result){
                if (err) {
                    console.error("Erro ao editar o pedido: ", err);
                    return res.status(500).json( { error: "Ocorreu um erro ao editar o pedido." } );
                };

                if (result.affectedRows === 0) {
                        return res.status(404).json( { mensage: "Pedido não encontrado." } );
                };
                
                return res.status(200).json(
                        {
                            mansage: "Pedido editado com sucesso.",
                            data: {
                                id: id,
                                id_cliente,
                                nome,
                                logradouro,
                                numero,
                                bairro,
                                cidade,
                                uf,
                                cep
                            }
                    }
            );               
        }); 

        } catch (error) {
        res.status(500).json( { error: "Erro interno no servidor." } );
        }
    }
    // Método para remover um pedido
    static removePedido(req, res) {
        let id = req.params.id;
        
        try {
            PedidoModel.removePedido(id, function(err, result){
                if (err) {
                    console.error("Erro ao deletar o pedido: ", err);
                    return res.status(500).json( { error: "Ocorreu um erro ao deletar o pedido." } );
                }

                if (result.affectedRows === 0) {
                    return res.status(404).json( { mensage: "Pedido não encontrado." } )
                }

                return res.status(200).json( { mensage: "Pedido deletado com sucesso.",
                                               data: { id } } );
            });
        } catch (error) {
            console.error(error);
        res.status(500).json( { error: "Erro interno no servidor" } );
        }
    }

}

export default PedidoController;  