const btnInc = document.querySelector("#btn-inc");
const btnDec = document.querySelector("#btn-dec");
const valor = document.querySelector("#valor");
let contador = 0;

btnInc.addEventListener('click', () => {
    if(contador >= 0){
        btnDec.disabled = false;
        valor.textContent = ++contador;
    }

});
btnDec.addEventListener('click', () =>{
    if(contador > 0){
        valor.textContent = --contador;
        if(valor == 0){
            btnDec.disabled = true;
        }
    }

});



