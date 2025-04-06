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

        </form>
    );
};

export default TarefaForm;