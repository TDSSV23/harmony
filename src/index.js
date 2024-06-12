import {} from "dotenv/config.js";
import express from "express";
import cors from "cors";
import routeClientes from "./routes/route.cliente.js";

const app = express();

app.use(express.json());
app.use(cors());

// Rotas
app.use(routeCliente);

// Levanta o Servidor
app.listen(process.env.PORT, function(){
    console.log("Servidor executando na porta 3001");
});