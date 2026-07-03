const mensagens  = require("./mensagem");

const usuario = "Adalbertão";

mensagens.boasVindas(usuario);
mensagens.despedidas(usuario);

console.log("Desenvolvido por: ", mensagens.autorDoSistema);