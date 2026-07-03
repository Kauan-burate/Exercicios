let nome = process.argv[2];
let classe = process.argv[3];
let nivel = Number(process.argv[4])
;
let rank;

if(nivel >= 1 && nivel <= 10){
    rank = "Recruta";
} else if(nivel >= 11 && nivel <= 20){
    rank = "Investigador";
} else if(nivel >= 21){
    rank = "Especialista";
} else{
   rank = "Rank inválido";
}


console.log("===== Cadastro de Agente =====");
console.log("Nome: ", nome);
console.log("Classe: ", classe);
console.log("Nível: ", nivel);
console.log("Rank: ", rank);
console.log("==============================");

