const btn = document.querySelector('button');
const painel = document.querySelector('#painel');
let visibilidade = false;

btn.addEventListener('click', (e) => {
    visibilidade = !visibilidade;
    if( visibilidade){
        painel.style.display = "block";
    } else{
        painel.style.display = "none";
    }
    
});









