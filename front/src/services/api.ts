import axios from 'axios';
import Tarefa from '../types/Tarefa';

const api = axios.create({
    baseURL: 'http://localhost:3777'
});
// Define um objeto (TarefaService) para gerenciar as requisições da API
export const TarefaService = {
    // Promise<Tarefa[]> é uma função assíncrona que retorna um array de tarefas
    // endpoint para listar tarefas
    async listarTarefas(): Promise<Tarefa[]> {
        const response = await api.get('/tarefas');
        return response.data;
    },
    // endpoint para criar tarefas
    async criarTarefa(tarefa: Omit<Tarefa, 'id'>): Promise<Tarefa> {
        const response = await api.post('/tarefas', tarefa);
        return response.data;
    },
    // endpoint para atualizar tarefas
    async atualizarTarefa(id: string, tarefa: Partial<Tarefa>): Promise<Tarefa> {
        const response = await api.put(`/tarefas/${id}`, tarefa);
        return response.data;
    },
    // endpoint para deletar tarefas
    async deletarTarefa(id: string): Promise<void> {
        await api.delete(`/tarefas/${id}`);
    },
    // endpoint para concluir tarefas
    async concluirTarefa(id: string, status: boolean): Promise<Tarefa> {
        const response = await api.put(`/tarefas/${id}/concluir`, { status });
        return response.data;
    },
};
