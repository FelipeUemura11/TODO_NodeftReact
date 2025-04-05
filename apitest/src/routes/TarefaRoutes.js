import express from 'express';
import TarefaController from '../controllers/TarefaControllers.js';
import { ValidacaoTarefa } from '../middlewares/ValidacaoTarefa.js';

const router = express.Router();

// Como app.js já usa '/tarefas' como prefixo, aqui só precisamos do caminho relativo
router.post('/', ValidacaoTarefa, TarefaController.criarTarefa);
router.get('/', TarefaController.listarTarefas);
router.put('/:id', TarefaController.atualizarTarefa);
router.delete('/:id', TarefaController.deletarTarefa);
router.patch('/:id/concluir', TarefaController.concluirTarefa);

export default router;