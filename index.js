import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import mongoose from "mongoose";
import authRoutes from "./routes/auth.js";
import authMiddleware from "./middleware/auth.js";
import taskRoutes from "./routes/task.js";

// ⚠️ PRIMEIRO carregar o .env
dotenv.config();

// 🔌 DEPOIS conectar ao banco
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB conectado 🚀"))
  .catch((err) => console.log(err));

const app = express();

// Permite JSON
app.use(express.json());

// Conectando no servidor
app.use("/api/auth", authRoutes);
app.use("/api/tasks", taskRoutes);

// Libera acesso do frontend
app.use(cors());

app.get("/api/dashboard", authMiddleware, (req, res) => {
  res.json({
    message: "Acesso autorizado 🎉",
    user: req.user
  });
});

// Rota teste
app.get("/", (req, res) => {
  res.send("API funcionando 🚀");
});

// Rodar servidor
app.listen(3000, () => {
  console.log("Servidor rodando na porta 3000");
});