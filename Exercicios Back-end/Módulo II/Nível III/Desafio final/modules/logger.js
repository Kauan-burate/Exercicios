const fs = require("fs");

function registarLog(mensagem){
    const dataHoraExata = new Date().toLocaleString('pt-BR');
    const log = `\n [${dataHoraExata}] ${mensagem}`;
    fs.appendFileSync("logs.txt", log);

    console.log(`Log registrado com sucesso`);
}

module.exports = {
    registarLog
};