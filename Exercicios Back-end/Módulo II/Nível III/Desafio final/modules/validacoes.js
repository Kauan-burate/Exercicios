
function validadeNome(nome){
    // if(nome.length >= 3 ){
    //     console.log(`Nome Válido!`);
    // } else{
    //     console.log(`Nome esta inválido!`);
    // }
    nome.length >= 3 ?  console.log(`Nome Válido!`) : console.log(`Nome esta inválido!`);

}
function validarIdade(idade){
    const idadeConvertidade = Number(idade);
    // if(idadeConvertidade >= 18){
    //     console.log(`Idade válida!`);
    // } else{
    //     console.log( console.log(`Idade inválida!!`);)
    // }
     idadeConvertidade >= 18 ?  console.log(`Idade válida!`) :  console.log(`Idade inválida!!`);
}

module.exports = {
    validadeNome,
    validarIdade
};