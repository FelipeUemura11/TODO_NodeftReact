export const ValidacaoTarefa = (req, res, next) => {
    const { titulo, descricao } = req.body;
    // verifica se os campos obrigatorios foram preenchidos
    if(!titulo || !descricao){
        return res.status(400).json({
            error: 'Todos os campos sao obrigatorios!'
        });
    }
    // verifica se o titulo tem pelo menos 3 caracteres
    if(titulo.length < 3){
        return res.status(400).json({
            error: 'O titulo deve conter pelo menos 3 caracteres!'
        });
    }
    next();
};