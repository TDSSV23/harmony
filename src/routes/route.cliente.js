import { Router } from "express";
import clientesCliente from "../controllers/controller.cliente.js";

const routeCliente = Router();

routeCliente.get("/clientes", ClienteController.getAllCliente);
routeClientes.post("/clientes", ClientesController.createClientes);
routeClientes.put("/clientes/:id", ClientesController.editClientes);
routeClientes.delete("/clientes/:id", ClientesController.removeClientes);

export default routeclientes;