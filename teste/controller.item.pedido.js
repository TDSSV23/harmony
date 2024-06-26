import ItemPedidoModel from "../models/model.item.pedido.js";


class ItemPedidoController {
    
    static getAllItemPedido(req, res) {
        try { 
            ItemPedidoModel.getAllItemPedido(function(err, result){
                if (err) {
                    console.error(err);
                    return res.status(500).json( { error: "Ocorreu um erro ao buscar os itens_pedido." } );
                }

                if (!result[0]) {
                    return res.status(404).json( {message: "Não foram encontrados itens_pedido."} );
                }
                
                return res.status(200).json(result);
            });
        } catch (error) {
            console.error(error);
            res.status(500).json( { Erro: "Erro interno do servidor." } )
        }
    }
    
    static createItemPedido(req, res) {
        const p = req.body;
        const id_pedido = id_pedido;
        const id_produto = id_produto;
        const quantidade = quantidade;
        const total = total;


        try {
            ProdutoModel.createProduto(id_pedido, id_produto, quantidade, total, function(err, result){
                if(err) {
                    console.error("Erro ao adicionar o pedido: ", err);
                    return res.status(500).json( { error: "Ocorreu um erro ao adicionar o produto." } );
                }

                return res.status(201).json( { 
                    mensage: "Produto adicionado com sucesso.", 
                    data: {
                        id: result.insertId,
                        id_pedido,
                        id_produto,
                        quantidade,
                        total
                    }
                } );
            });

        } catch (error) {
            console.error(error);
            res.status(500).json( { error: "Erro interno do servidor." } )
        }
    }

    static editProduto(req, res) { 
        const p = req.body;
        let id = req.params.id;
        const nome = p.nome;
        const descricao = p.descricao;
        const preco = p.preco;

        try {
                ProdutoModel.editProduto(id, nome, descricao, preco, function(err, result){
                if (err) {
                    console.error("Erro ao editar o produto: ", err);
                    return res.status(500).json( { error: "Ocorreu um erro ao editar o produto." } );
                };

                if (result.affectedRows === 0) {
                        return res.status(404).json( { mensage: "Produto não encontrado." } );
                };
                
                return res.status(200).json(
                        {
                            mansage: "Produto editado com sucesso.",
                            data: {
                                id: id,
                                nome,
                                descricao,
                                preco
                            }
                    }
            );               
        }); 

        } catch (error) {
        res.status(500).json( { error: "Erro interno no servidor." } );
        }
    }

    static removeProduto(req, res) {
        let id = req.params.id;
        
        try {
            ProdutoModel.removeProduto(id, function(err, result){
                if (err) {
                    console.error("Erro ao deletar o produto: ", err);
                    return res.status(500).json( { error: "Ocorreu um erro ao deletar o produto." } );
                }

                if (result.affectedRows === 0) {
                    return res.status(404).json( { mensage: "Produto não encontrado." } )
                }

                return res.status(200).json( { mensage: "Produto deletado com sucesso.",
                                               data: { id } } );
            });
        } catch (error) {
            console.error(error);
        res.status(500).json( { error: "Erro interno no servidor" } );
        }
    }

}

export default ItemPedidoController;  