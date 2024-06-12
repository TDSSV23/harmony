import {} from "dotenv/config.js";
import express from "express";
import cors from "cors";
import routeCliente from "./routes/route.cliente.js";
import routePedido from "./routes/route.pedido.js";

const app = express();

app.use(express.json());
app.use(cors());


// Rotas
app.use(routeCliente);
app.use(routePedido);

// Levanta o Servidor
app.listen(process.env.PORT, function(){
    console.log("Servidor executando na porta 3002");
});