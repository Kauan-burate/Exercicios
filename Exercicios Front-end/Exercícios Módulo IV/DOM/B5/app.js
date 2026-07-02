const lista = document.getElementById("lista");
const item1 = document.getElementById("item-1");
const item2 = document.getElementById("item-2");
const item3 = document.getElementById("item-3");


item2.remove();

const elementoNovo = document.createElement("li");
elementoNovo.textContent = "Item inserido via JS";

lista.insertBefore(elementoNovo, item3);

const elementoSubstituto = document.createComment("li");
elementoSubstituto.textContent = "Item substituído";

lista.replaceChild(elementoSubstituto, item1);

console.log(lista.innerHTML);

