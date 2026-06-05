
const lista = document.querySelector('#lista');

const linguagens = ["HTML", "CSS", "JAVASCRIPT", "C#"];

for(let i = 0; i < linguagens.length; i++){
    const li = document.createElement("li");
    li.textContent = linguagens[i];
    lista.appendChild(li);

}

