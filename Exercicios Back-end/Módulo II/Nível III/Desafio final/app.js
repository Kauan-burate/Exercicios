const usuario = require("./modules/usuarios");
const arquivos = require("./modules/arquivos");
const logger = require("./modules/logger");
const validacoes = require("./modules/validacoes");

usuario.criarUsuario("Jorley", 44);
usuario.criarUsuario("josvaldo da silva filho", 67);
usuario.listarUsuarios();



