let novoItem = process.argv[2];
let preco = Number(process.argv[3]);
let ouro = Number(process.argv[4]);

if(ouro >= preco){
    let troco = ouro - preco;
    console.log(`Voçê comprou ${novoItem}, Sobrou ${troco} de ouro`);
}else{
    let troco2 = preco - ouro;
    console.log(`Ouro insuficiente! Faltam ${troco2} de ouro.`);
}
