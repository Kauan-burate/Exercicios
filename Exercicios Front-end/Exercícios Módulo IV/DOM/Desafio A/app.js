const container = document.querySelector('#container');

const personagens = [
  { nome: "Aragorn", classe: "Guerreiro", nivel: 15 },
  { nome: "Gandalf", classe: "Mago",      nivel: 20 },
  { nome: "Legolas", classe: "Arqueiro",  nivel: 12 },
  { nome: "Gimli",   classe: "Bárbaro",   nivel: 10 }
];


for(let i = 0; i < personagens.length; i++){

    const card = document.createElement("div");
    const personagem = personagens[i];
    const hp = personagem.nivel * 10;

    card.innerHTML = `
    <h4> NOME:${personagem.nome}</h4>
    <h4> CLASSE: ${personagem.classe}</h4>
    <h4> HP: ${hp}</h4>
    <h4> NÍVEL: ${personagem.nivel}</h4>
    <h4>------------------------------------ </h4>
    `;
   
    container.appendChild(card);
   
}



