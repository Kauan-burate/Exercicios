const caixa = document.querySelector("#caixa");

caixa.addEventListener('mouseover', (e) => {
    const cor = e.target.dataset.cor;
    caixa.style.background = cor;
    console.log(`TA FUNCIONANDO`);
});

caixa.addEventListener('mouseout', (e) =>{

    console.log(`TA FORA`);
});