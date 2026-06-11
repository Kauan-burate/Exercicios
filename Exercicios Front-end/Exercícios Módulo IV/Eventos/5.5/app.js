
const caixa = document.querySelector("#caixa");

caixa.addEventListener('mouseover', () => {
    caixa.style.background = "blue";
    caixa.textContent = "Mouse dentro!";

});

caixa.addEventListener('mouseout', () =>{

    caixa.style.background = "#eee";
    caixa.textContent = "Passe o mouse aqui";

}); 