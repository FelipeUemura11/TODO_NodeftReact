import React, { useState } from 'react';
import { TarefaService } from '../services/api';

interface TarefaFormProps {
    onTarefaAdicionada: () => void; // chamada apos uma tarefe ser adicionada
}

const TarefaForm: React.FC<TarefaFormProps> = ({ onTarefaAdicionada }) => {
    const[titulo, setTitulo] = useState('');
    const[descricao, setDescricao] = useState('');

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try{
            await TarefaService.criarTarefa({
                titulo,
                descricao,
                status: false,
                dataCriacao: new Date(),
                dataConclusao: null
            });
            setTitulo('');
            setDescricao('');
            onTarefaAdicionada(); // Callback para atualizar a lista de tarefas
        }catch(error){
            console.error('Erro ao adicionar tarefa:', error);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-4 mb-8">
            <div className="flex flex-col gap-2">
                <input
                    type="text"
                    value={titulo}
                    onChange={(e) => setTitulo(e.target.value)}
                    placeholder="Titulo da tarefa"
                    className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                />
            </div>
            <div className="flex flex-col gap-2">
                <textarea
                    value={descricao}
                    onChange={(e) => setDescricao(e.target.value)}
                    placeholder="Descricao da tarefa"
                    className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    rows={3}
                />
            </div>
            <button
                type="submit"
                className="w-full bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 transition-colors"
            >
                Adicionar Tarefa
            </button>
        </form>
    );
};

export default TarefaForm;