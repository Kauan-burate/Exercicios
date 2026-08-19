const  formulario = document.getElementById('formPrato');

//VALORES CAMPOS DIGITADOS

formulario.addEventListener('submit', async (evento) => {
    evento.preventDefault();

    const prato = {
        nome: document.getElementById('nome').value,
        descricao: document.getElementById('descricao').value,
        preco: Number(document.getElementById('preco').value),
        categoria_id: Number(document.getElementById('categoria').value),
        disponivel: document.getElementById('disponivel').value
    };

    try {
        const resposta = await fetch('http://localhost:3000/api/pratos', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(prato)
        });

        const dados = await resposta.json();

        if (!resposta.ok) {
            throw new Error(dados.erro || dados.Erro);
        }

        console.log('Prato cadastrado:', dados);

        alert('Prato cadastrado com sucesso!');

        formulario.reset();

    } catch (erro) {
        alert('Erro ao cadastrar prato: ' + erro.message);
    }
});

