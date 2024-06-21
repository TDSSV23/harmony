import {Router} from "express";
import ProdutoController from "../controllers/controller.produto.js";

const routeProduto = Router();

// Get Post Put e Delete (funções)
routeProduto.get("/produtos", ProdutoController.getAllProdutos);
routeProduto.post("/produtos", ProdutoController.createProduto);
routeProduto.put("/produtos/:id", ProdutoController.editProduto);
routeProduto.delete("/produtos/:id", ProdutoController.removeProduto);

export default routeProduto;