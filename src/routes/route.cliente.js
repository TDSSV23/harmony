import { Router } from "express";
import ClienteController from "../controllers/controller.cliente.js";

const routeCliente = Router();

// Get Post Put e Delete (funções)
routeCliente.get("/clientes", ClienteController.getAllClientes);
routeCliente.post("/clientes", ClienteController.createCliente);
routeCliente.put("/clientes/:id", ClienteController.editCliente);
routeCliente.delete("/clientes/:id", ClienteController.removeCliente);

export default routeCliente;
