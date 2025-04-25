1 - Criar diretorio do projeto Node.js
    + mkdir "nome_api"
    + cd "nome_api"

2 - Instalar yarn e nodemon
    + yarn init -y
    + yarn add express cors// framework para api e linkar com front
    + npm install -g nodemon // para rodar o codigo e atualizar em tempo real

3 - Estrutura do node.js
    + mkdir "src"
    + cd src
    + touch app.js
    + mkdir controllers
    + cd controllers
    + touch TarefasController.js
    + cd ..
    + mkdir routes
    + cd routes
    + touch TarefaRoutes.js
    + cd ..
    + mkdir "middlewares
    + cd middlewares
    + touch ValidacaoTarefa.js

4 - Script para rodar com nodemon -> package.json
{
  "name": "backapi",
  "type": "module",
  "packageManager": "yarn@4.6.0",
  "dependencies": {
    "cors": "^2.8.5",
    "express": "^4.18.2"
  },
  "devDependencies": {
    "nodemon": "^3.1.9"
  },
  "scripts": {
    "dev": "nodemon ./src/app.js"
  }
}
+ npm install (node_modules)
