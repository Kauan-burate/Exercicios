const campo = document.querySelector("#campo");

campo.addEventListener('input', (e) =>{
    const text = e.target.value;
    for(let i = 0; i <= text.length; i++){
        document.querySelector('#contagem').textContent = text.length + ' Caracteres';
    }

});
