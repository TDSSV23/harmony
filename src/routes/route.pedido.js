import { Router } from "express";
import PedidoController from "../controllers/controller.pedido.js";

const routePedido = Router();

// Get Post Put e Delete (funções)
routePedido.get("/pedidos", PedidoController.getAllPedidos);
routePedido.post("/pedidos", PedidoController.createPedido);
routePedido.put("/pedidos/:id", PedidoController.editPedido);
routePedido.delete("/pedidos/:id", PedidoController.removePedido);

export default routePedido;
