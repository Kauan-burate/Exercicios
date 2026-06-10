const btn = document.querySelector("#btn");
const msg = document.querySelector("#mensagem");
let estadoAtual = true;

btn.addEventListener('click', () => {
    
    if(estadoAtual){
        estadoAtual = !estadoAtual;
        msg.textContent = "Botão clicado!";
        msg.appendChild(msg);
    }else{
        estadoAtual = !estadoAtual;
        msg.textContent = "Clique novamente!";
        msg.appendChild(msg);
    }
   

});



