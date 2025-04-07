import React from 'react';
import Tarefa from '../types/Tarefa';
import { TarefaService } from '../services/api';

interface TarefaItemProps {
    tarefa: Tarefa;
    onTarefaAtualizada: () => void;
}

const TarefaItem: React.FC<TarefaItemProps> = ({ tarefa, onTarefaAtualizada }) => {
    const handleToggleStatus = async () => {
        try{
            if (tarefa.status) return;
            
            await TarefaService.concluirTarefa(tarefa.id);
            onTarefaAtualizada();
        }catch(error){
            console.error('Erro ao atualizar status da tarefa:', error);
        }
    };

    const handleDelete = async () => {
        try{
            await TarefaService.deletarTarefa(tarefa.id);
            onTarefaAtualizada();
        }catch(error){
            console.error('Erro ao deletar tarefa:', error);
        }
    };

    return (
        <div className={`p-4 rounded-lg border ${tarefa.status ? 'bg-gray-50' : 'bg-white'} mb-4`}>
            <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                    <input
                        type="checkbox"
                        checked={tarefa.status}
                        onChange={handleToggleStatus}
                        className="h-5 w-5 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                    />
                    <div>
                        <h3 className={`text-lg font-medium ${tarefa.status ? 'line-through text-gray-500' : 'text-gray-900'}`}>
                            {tarefa.titulo}
                        </h3>
                        <p className={`text-sm ${tarefa.status ? 'text-gray-400' : 'text-gray-600'}`}>
                            {tarefa.descricao}
                        </p>
                    </div>
                </div>
                <button
                    onClick={handleDelete}
                    className="text-red-600 hover:text-red-800 transition-colors"
                >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" />
                    </svg>
                </button>
            </div>
        </div>
    );
};

export default TarefaItem;
