function validarNome(nome){
    let qnt = nome.length;
    if(qnt >= 3){
        console.log("Nome ", nome," válido");
    } else{
        console.log("Nome ", nome," inválido");
    }

}
function validarIdade(idade){
    if(idade > 0){
        console.log("Idade ", idade," valida");
    }else{
        console.log("Erro: Idade ", idade," inválida");
    }
}

module.exports = {
    validarIdade,
    validarNome
};