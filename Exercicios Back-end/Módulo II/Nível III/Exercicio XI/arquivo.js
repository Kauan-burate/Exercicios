const fs = require("fs");

function criarArquivo(nome, conteudo){
    fs.writeFileSync(nome, conteudo);
    console.log(`Arquivo ${nome} criado com sucesso!`);
   
}
function lerArquivo(nome, conteudo){
    console.log("===DADOS DO ARQUIVO===");
    console.log(`Nome: ${nome}`);
    console.log(`Conteúdo: ${conteudo}`);
}

module.exports = {
    criarArquivo,
    lerArquivo
};