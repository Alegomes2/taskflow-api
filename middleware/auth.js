import jwt from "jsonwebtoken";

const authMiddleware = (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader) {
      return res.status(401).json({ error: "Token não fornecido" });
    }

    if (!authHeader.startsWith("Bearer ")) {
      return res.status(401).json({ error: "Formato inválido" });
    }

    const token = authHeader.split(" ")[1];

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    req.user = decoded;

    next();
  } catch (error) {
    console.error(error);
    return res.status(401).json({ error: "Token inválido" });
  }
};

export default authMiddleware;