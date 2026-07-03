function boasVindas(nome){
    console.log("Boas vindas, ", nome);
}
function despedidas(nome){
    console.log("Obrigado por acessar nosso site esperamos que tenha gostado ate a porxima, ", nome);
}
const autorDoSistema = "Kauan";

module.exports = {
    boasVindas,
    despedidas,
    autorDoSistema
};