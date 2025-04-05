import express from 'express';
import cors from 'cors';
import TarefaRoutes from './routes/TarefaRoutes.js';

const app = express();
const PORT = process.env.PORT || 3777;

// Middleware
app.use(cors({
    origin: 'http://localhost:5173', // Porta padrão do Vite
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'],
    allowedHeaders: ['Content-Type', 'Authorization']
}));

app.use(express.json());
app.use('/tarefas', TarefaRoutes);

// Rotas de teste
app.get('/', (req, res) => {
    res.json({
        message: 'API de gerenciamento de tarefas!'
    });
});

// Inicia o servidor
app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});

export default app;