const caixa = document.querySelector('#caixa');
const alerta = document.querySelector('#alerta');
const card = document.querySelector('#card');

caixa.classList.add('destaque');
alerta.classList.add('oculto');
card.classList.add('erro');

console.log(caixa.classList.contains('destaque'));
console.log(alerta.classList.contains('oculto'));
console.log(card.classList.contains('erro'));

