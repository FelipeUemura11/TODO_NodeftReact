class TarefaController {
    constructor() {
        this.tarefas = [];
        // Fazendo bind dos métodos ao this
        this.criarTarefa = this.criarTarefa.bind(this);
        this.listarTarefas = this.listarTarefas.bind(this);
        this.atualizarTarefa = this.atualizarTarefa.bind(this);
        this.deletarTarefa = this.deletarTarefa.bind(this);
        this.concluirTarefa = this.concluirTarefa.bind(this);
    }
    // criar tarefa
    async criarTarefa(req, res) {
        try {
            const { titulo, descricao } = req.body;

            if (!titulo || !descricao) {
                return res.status(400).json({
                    error: 'Titulo ou descricao estao faltando'
                });
            }
            // variaveis para criar a tarefa
            const novaTarefa = {
                id: Date.now().toString(),
                titulo,
                descricao,
                status: false,
                dataCriacao: new Date(),
                dataConclusao: null
            };
            
            this.tarefas.push(novaTarefa);
            return res.status(201).json(novaTarefa);
        } catch (error) {
            console.error('Erro ao criar tarefa:', error);
            return res.status(500).json({
                error: 'Nao foi possivel criar a tarefa'
            });
        }
    }
    // listar tarefas
    async listarTarefas(req, res) {
        try {
            return res.status(200).json(this.tarefas);
        } catch (error) {
            return res.status(500).json({
                error: "Nao foi possivel listar as tarefas"
            });
        }
    }

    // atualizar tarefa
    async atualizarTarefa(req, res) {
        try {
            // pegar o id da tarefa
            const { id } = req.params;
            const { titulo, descricao, status } = req.body;
            // pegar o indice da tarefa
            const tarefaIndex = this.tarefas.findIndex(x => x.id === id);

            if (tarefaIndex === -1) {
                return res.status(404).json({
                    error: 'Tarefa nao encontrada'
                });
            }

            const attTarefa = {
                // Usa Spread Operator( ... ) para copiar os valores da tarefa existente
                // Atualiza apenas os campos que foram fornecidos
                ...this.tarefas[tarefaIndex],
                titulo: titulo || this.tarefas[tarefaIndex].titulo,
                descricao: descricao || this.tarefas[tarefaIndex].descricao,
                status: status !== undefined ? status : this.tarefas[tarefaIndex].status,
                dataConclusao: status ? new Date() : this.tarefas[tarefaIndex].dataConclusao
            };

            this.tarefas[tarefaIndex] = attTarefa;
            return res.status(200).json(attTarefa);
        } catch (error) {
            return res.status(500).json({
                error: "Nao foi possivel atualizar a tarefa"
            });
        }
    }
    // deletar tarefa
    async deletarTarefa(req, res) {
        try {
            const { id } = req.params;
            const tarefaIndex = this.tarefas.findIndex(x => x.id === id);

            if (tarefaIndex === -1) {
                return res.status(404).json({
                    error: 'Tarefa nao encontrada'
                });
            }
            // splice para deletar a tarefa
            this.tarefas.splice(tarefaIndex, 1);
            return res.status(200).json({
                message: 'Tarefa deletada com sucesso'
            });
        } catch (error) {
            return res.status(500).json({
                error: 'Nao foi possivel deletar a tarefa'
            });
        }
    }
    // concluir tarefa
    async concluirTarefa(req, res) {
        try {
            const { id } = req.params;
            const tarefaIndex = this.tarefas.findIndex(x => x.id === id);

            if (tarefaIndex === -1) {
                return res.status(404).json({
                    error: 'Tarefa nao encontrada'
                });
            }
            // atualizar o status da tarefa
            this.tarefas[tarefaIndex].status = true;
            this.tarefas[tarefaIndex].dataConclusao = new Date();

            return res.status(200).json({
                message: 'Tarefa concluida com sucesso',
                tarefa: this.tarefas[tarefaIndex]
            });
        } catch (error) {
            return res.status(500).json({
                error: 'Nao foi possivel concluir a tarefa'
            });
        }
    }
}

export default new TarefaController();