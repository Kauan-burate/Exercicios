let comando = Number(process.argv[2]);
  
function menu(){
    console.log("======MENU======");
    console.log("1- Atacar");
    console.log("2- Fugir");
    console.log("3- Defender");
    console.log("4- Invetário\n");
}
  
menu();
switch(comando){
    case 1 :
        console.log("Atacando inimigo!");
    break;
    case 2 :
        console.log("Fugindo do inimigo!");
    break;
    case 3 :
        console.log("Se defendendo do inimigo!");
    break;
    case 4 :
        console.log("Inventário aberto com sucesso!");
    break;
    default:
        console.log(`Erro: Comando "${process.argv[2]}"não existe.`);

}
