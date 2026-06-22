import express from "express";
import cors from "cors";
import ProvinceRouter from "./src/controllers/province-controller.js";

const app = express();
const port = 3000;

// Middlewares
app.use(cors());
app.use(express.json());

// Único punto de entrada para el router de provincias
app.use("/api/province", ProvinceRouter);

app.listen(port, () => {
    console.log(`Servidor escuchando en http://localhost:${port}`);
});
