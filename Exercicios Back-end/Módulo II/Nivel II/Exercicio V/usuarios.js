let usuarios = [];

function criarUsuario(nome, idade){
    usuarios.push({nome, idade});
    console.log("Usuario criado com sucesso");
}
function listarUsuarios(){
    usuarios.forEach(usuario =>{
        console.log("Nome: ", usuario.nome, "Idade: ", usuario.idade);
    });
}

module.exports = {
    listarUsuarios,
    criarUsuario
};