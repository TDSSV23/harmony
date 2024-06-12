import { Router } from "express";
import PedidoController from "../controllers/controller.pedido.js";

const routePedido = Router();

routePedido.get("/pedidos", PedidoController.getAllPedidos);
routePedido.post("/pedidos", PedidoController.createPedido);
routePedido.put("/pedidos", PedidoController.editPedido);

export default routePedido;
