
const listaPratos = document.getElementById('listaPratos');
const selectCategoria = document.getElementById('categoria');
const mensagem = document.getElementById('mensagem');


// =====================================
// CARREGAR CATEGORIAS
// =====================================

async function carregarCategorias() {

    try {

        const resposta = await fetch('/api/categorias');

        if (!resposta.ok) {
            throw new Error('Erro ao buscar categorias');
        }

        const categorias = await resposta.json();

        categorias.forEach(categoria => {

            const option = document.createElement('option');

            option.value = categoria.id;
            option.textContent = categoria.nome;

            selectCategoria.appendChild(option);

        });

    } catch (erro) {

        console.error(erro);

        mensagem.textContent = 'Erro ao carregar categorias.';
    }
}


// =====================================
// CARREGAR PRATOS
// =====================================

async function carregarPratos(categoria = '') {

    try {

        let url = '/api/pratos';

        if (categoria) {
            url += `?categoria=${categoria}`;
        }

        const resposta = await fetch(url);

        if (!resposta.ok) {
            throw new Error('Erro ao buscar pratos');
        }

        const pratos = await resposta.json();

        exibirPratos(pratos);

    } catch (erro) {

        console.error(erro);

        mensagem.textContent = 'Erro ao carregar pratos.';
    }
}


// =====================================
// EXIBIR PRATOS
// =====================================

function exibirPratos(pratos) {

    listaPratos.innerHTML = '';

    mensagem.textContent = '';

    if (pratos.length === 0) {

        mensagem.textContent = 'Nenhum prato encontrado.';

        return;
    }

    pratos.forEach(prato => {

        const card = document.createElement('div');

        card.classList.add('card');

        const status = prato.disponivel
            ? 'Disponível'
            : 'Indisponível';

        const classeStatus = prato.disponivel
            ? 'disponivel'
            : 'indisponivel';

        card.innerHTML = `
            <h2>${prato.nome}</h2>

            <p class="descricao">
                ${prato.descricao}
            </p>

            <p class="categoria">
                Categoria: ${prato.categoria}
            </p>

            <p class="preco">
                R$ ${Number(prato.preco).toFixed(2)}
            </p>

            <span class="badge ${classeStatus}">
                ${status}
            </span>

            <button 
                class="remover"
                onclick="removerPrato(${prato.id})">
                Remover
            </button>
        `;

        listaPratos.appendChild(card);

    });
}


// =====================================
// REMOVER PRATO
// =====================================

async function removerPrato(id) {

    const confirmar = confirm(
        'Deseja realmente remover este prato?'
    );

    if (!confirmar) {
        return;
    }

    try {

        const resposta = await fetch(
            `/api/pratos/${id}`,
            {
                method: 'DELETE'
            }
        );

        const resultado = await resposta.json();

        if (!resposta.ok) {
            throw new Error(
                resultado.erro || 'Erro ao remover prato'
            );
        }

        alert('Prato removido com sucesso!');

        carregarPratos(selectCategoria.value);

    } catch (erro) {

        console.error(erro);

        alert(erro.message);
    }
}


// =====================================
// FILTRO POR CATEGORIA
// =====================================

selectCategoria.addEventListener('change', () => {

    const categoria = selectCategoria.value;

    carregarPratos(categoria);

});


// =====================================
// INICIALIZAÇÃO
// =====================================

carregarCategorias();

carregarPratos();
