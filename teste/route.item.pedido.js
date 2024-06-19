import { Router } from "express";
import ItemPedidoController from "../controllers/controller.item.pedido.js"

const routeItemPedido = Router();

routeItemPedido.get("/produtos", ItemPedidoController.getAllItemPedido)
routeItemPedido.post("/produtos", ItemPedidoController.getAllItemPedido)
routeItemPedido.put("/produtos/:id", ItemPedidoController.getAllItemPedido)
routeItemPedido.delete("/produtos/:id", ItemPedidoController.getAllItemPedido)

export default routeItemPedido;