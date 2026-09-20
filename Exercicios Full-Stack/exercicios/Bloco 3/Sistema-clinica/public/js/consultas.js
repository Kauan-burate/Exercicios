let consultas = [];

async function carregarConsultas() {
    try {
        const resposta = await fetch('/api/consultas');

        if (!resposta.ok) {
            throw new Error('Erro ao buscar consultas.');
        }

        consultas = await resposta.json();

        mostrarConsultas(consultas);

    } catch (e) {
        console.error(e);
    }
}

function mostrarConsultas(lista) {

    const tabela = document.getElementById('tabelaConsultas');

    tabela.innerHTML = '';

    if (lista.length === 0) {
        tabela.innerHTML = `
            <tr>
                <td colspan="7">
                    Nenhuma consulta encontrada.
                </td>
            </tr>
        `;

        return;
    }

    lista.forEach(consulta => {

        const linha = document.createElement('tr');

        linha.innerHTML = `
            <td>${consulta.paciente}</td>

            <td>${consulta.medico}</td>

            <td>${consulta.crm}</td>

            <td>${consulta.especialidade}</td>

            <td>${formatarData(consulta.data_hora)}</td>

            <td>
                <span class="status ${consulta.status}">
                    ${consulta.status}
                </span>
            </td>

            <td>
                ${
                    consulta.status === 'agendada'
                    ?
                    `
                    <button 
                        class="btn-realizada"
                        onclick="alterarStatus(${consulta.id}, 'realizada')"
                    >
                        Realizada
                    </button>

                    <button 
                        class="btn-cancelar"
                        onclick="alterarStatus(${consulta.id}, 'cancelada')"
                    >
                        Cancelar
                    </button>
                    `
                    :
                    '—'
                }
            </td>
        `;

        tabela.appendChild(linha);
    });
}


async function alterarStatus(id, status) {

    const mensagem = status === 'realizada'
        ? 'Deseja marcar esta consulta como realizada?'
        : 'Deseja cancelar esta consulta?';

    if (!confirm(mensagem)) {
        return;
    }

    try {

        const resposta = await fetch(`/api/consultas/${id}/status`, {

            method: 'PUT',

            headers: {
                'Content-Type': 'application/json'
            },

            body: JSON.stringify({
                status: status
            })
        });

        const resultado = await resposta.json();

        if (!resposta.ok) {
            throw new Error(resultado.erro);
        }

        alert(
            status === 'realizada'
                ? 'Consulta marcada como realizada!'
                : 'Consulta cancelada com sucesso!'
        );

        carregarConsultas();

    } catch (e) {

        alert('Erro: ' + e.message);
    }
}


function formatarData(data) {

    const dataFormatada = new Date(data);

    return dataFormatada.toLocaleString('pt-BR');
}


document
    .getElementById('filtroStatus')
    .addEventListener('change', function () {

        const statusSelecionado = this.value;

        if (statusSelecionado === 'todos') {

            mostrarConsultas(consultas);

        } else {

            const filtradas = consultas.filter(
                consulta => consulta.status === statusSelecionado
            );

            mostrarConsultas(filtradas);
        }
    });


carregarConsultas();