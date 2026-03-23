import express from "express";
import Task from "../models/Task.js";
import authMiddleware from "../middleware/auth.js";

const router = express.Router();


// ============================
// 🟢 CRIAR TAREFA
// ============================
router.post("/", authMiddleware, async (req, res) => {
  try {
    const { title, description } = req.body;

    const task = new Task({
      title,
      description,
      user: req.user.id, // pega do token
    });

    await task.save();

    res.status(201).json(task);
  } catch (error) {
    res.status(500).json({ error: "Erro ao criar tarefa" });
  }
});


// ============================
// 📋 LISTAR TAREFAS DO USUÁRIO
// ============================
router.get("/", authMiddleware, async (req, res) => {
  try {
    const tasks = await Task.find({ user: req.user.id });

    res.json(tasks);
  } catch (error) {
    res.status(500).json({ error: "Erro ao buscar tarefas" });
  }
});


// ============================
// ✏️ ATUALIZAR TAREFA
// ============================
router.put("/:id", authMiddleware, async (req, res) => {
  try {
    const task = await Task.findOneAndUpdate(
      { _id: req.params.id, user: req.user.id },
      req.body,
      { new: true }
    );

    res.json(task);
  } catch (error) {
    res.status(500).json({ error: "Erro ao atualizar tarefa" });
  }
});


// ============================
// ❌ DELETAR TAREFA
// ============================
router.delete("/:id", authMiddleware, async (req, res) => {
  try {
    await Task.findOneAndDelete({
      _id: req.params.id,
      user: req.user.id,
    });

    res.json({ message: "Tarefa deletada" });
  } catch (error) {
    res.status(500).json({ error: "Erro ao deletar tarefa" });
  }
});

export default router;