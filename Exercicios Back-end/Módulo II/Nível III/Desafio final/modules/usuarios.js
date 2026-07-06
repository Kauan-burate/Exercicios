const { registarLog } = require("./logger");
const { validadeNome, validarIdade } = require("./validacoes");

let usuarios = [];

function criarUsuario(nome, idade) {
    validadeNome(nome);
    validarIdade(idade);

    usuarios.push({nome, idade});
    registarLog(`Usuário: ${nome} cadastrado.`);
}

function listarUsuarios(){
    usuarios.forEach(usuario =>{
        console.log(`Nome: ${usuario.nome} | Idade: ${usuario.idade}`);
    });
}

module.exports = {
    criarUsuario,
    listarUsuarios
};