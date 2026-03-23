import express from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../models/User.js";

const router = express.Router();


// ============================
// 🟢 REGISTRO DE USUÁRIO
// ============================
router.post("/register", async (req, res) => {
  try {
    const { name, email, password } = req.body;

    // 🔎 Verificar se usuário já existe
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ error: "Usuário já existe" });
    }

    // 🔐 Criptografar senha
    const hashedPassword = await bcrypt.hash(password, 10);

    // 👤 Criar usuário
    const user = new User({
      name,
      email,
      password: hashedPassword,
    });

    // 💾 Salvar no banco
    await user.save();

    res.status(201).json({ message: "Usuário criado com sucesso" });

  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Erro no servidor" });
  }
});


// ============================
// 🔐 LOGIN DE USUÁRIO
// ============================
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    // 🔎 Verificar se usuário existe
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ error: "Usuário não encontrado" });
    }

    // 🔐 Comparar senha
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ error: "Senha inválida" });
    }

    // 🎟️ Gerar token JWT
    const token = jwt.sign(
      { id: user._id },
      process.env.JWT_SECRET,
      { expiresIn: "1d" }
    );

    // 📤 Retornar token
    res.json({
      message: "Login realizado com sucesso",
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
      },
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Erro no servidor" });
  }
});


// ============================
// 🧪 ROTA DE TESTE
// ============================
router.get("/test", (req, res) => {
  res.send("Auth funcionando 🚀");
});


export default router;