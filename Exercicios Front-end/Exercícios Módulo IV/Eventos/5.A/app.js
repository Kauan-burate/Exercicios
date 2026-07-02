const btn = document.querySelector("#btn-add");
const lista = document.querySelector("#lista");
const texto = document.querySelector("#nova-tarefa");
const contador = document.querySelector("#contador");

function atualizarContador() {
    const qnt = lista.children.length;

    if (qnt === 1) {
        contador.textContent = "1 tarefa";
    } else {
        contador.textContent = `${qnt} tarefas`;
    }
}

function adicionarTarefa() {
    const textoDigitado = texto.value.trim();

    if (textoDigitado === "") {
        console.log("Erro: não pode adicionar campo vazio.");
        return;
    }

    const li = document.createElement("li");
    li.textContent = textoDigitado;

    const btnRemover = document.createElement("button");
    btnRemover.textContent = "Remover";

    btnRemover.addEventListener("click", () => {
        li.remove();
        atualizarContador();
    });

    li.appendChild(btnRemover);
    lista.appendChild(li);

    texto.value = "";
    texto.focus();

    li.addEventListener('click', (e) => {
        li.style = "text-decoration: line-through";
    });

    atualizarContador();

}

btn.addEventListener("click", adicionarTarefa);

texto.addEventListener("keydown", (e) => {
    if (e.key === "Enter") {
        adicionarTarefa();
    }
});










    





