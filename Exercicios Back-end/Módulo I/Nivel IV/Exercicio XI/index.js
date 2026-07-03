let ataque = process.argv[2];
let defesa = process.argv[3];

let dano = ataque - defesa;

if(dano < 0){
    dano = 0;
}

console.log("DANO: ", dano);
