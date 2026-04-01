import mongoose from "mongoose";

// 🔹 Estrutura da tarefa
const taskSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true, // obrigatório
  },

  description: {
    type: String,
  },

  completed: {
    type: Boolean,
    default: false, // começa como não concluída
  },

  // 🔗 Relaciona com usuário (IMPORTANTE)
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },

  createdAt: {
    type: Date,
    default: Date.now,
  },

  favorite: {
    type: Boolean,
    default: false,
  },
});

// exporta o model
export default mongoose.model("Task", taskSchema);

// EXPLICAÇÃO
// title → nome da tarefa
//completed → status
// user → quem criou (chave do sistema 🔥) Isso permite cada usuário ver só suas tarefas