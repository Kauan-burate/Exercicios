const btn = document.querySelector("#btn-add");
const lista = document.querySelector("#lista");
const tarefa = document.querySelector("#nova-tarefa");


let listaDeTarefas = [];

listaDeTarefas.forEach(textoTarefa => {

    const li = document.createElement("li");
    li.textContent = textoTarefa;
    
    const btnRemover = document.querySelector("button");
    btnRemover.textContent = "Remover";
    

    btn.addEventListener('click', (e) => {
        li.textContent = e.target.value;
        btnRemover.textContent = "Remover";
        lista.appendChild(li);
        lista.appendChild(btnRemover);

    });








   
    
    
});




