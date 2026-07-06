const path = require("path");

function montarCaminho(nomeArquivo){
    const caminhoArquivo = path.join(__dirname, nomeArquivo);
    console.log(`Caminho do arquivo: ${caminhoArquivo}`);
    return caminhoArquivo;
}


module.exports = {
    montarCaminho
};