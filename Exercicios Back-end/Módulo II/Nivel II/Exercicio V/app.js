const usuarios = require("./usuarios");

usuarios.criarUsuario("Kauan", 18);
usuarios.criarUsuario("Vitor", 17);
usuarios.criarUsuario("Baitaca", 63);

console.log("LISTA DE USUÁRIOS:");

usuarios.listarUsuarios();