const especialidade     = document.getElementById('especialidade');
const medico            = document.getElementById('medico');
const formulario        = document.getElementById('formAgendar');
const mensagem          = document.getElementById('mensagem');

// CARREGAR ESPECIALIDADES

async function carregarEspecialidades() {

    try {

        const resposta = await fetch('/api/especialidades');

        if (!resposta.ok) {
            throw new Error('Erro ao buscar especialidades.');
        }

        const especialidades = await resposta.json();

        especialidade.innerHTML = `
            <option value="">Selecione uma especialidade</option>
        `;

        especialidades.forEach(item => {

            const option = document.createElement('option');

            option.value = item.id;
            option.textContent = item.nome;

            especialidade.appendChild(option);
        });

    } catch (e) {

        console.error(e);

        mostrarMensagem(
            'Erro ao carregar especialidades.',
            'erro'
        );
    }
}


// QUANDO ESCOLHER A ESPECIALIDADE

especialidade.addEventListener('change', async function () {

    const especialidadeId = this.value;

    medico.innerHTML = `
        <option value="">Selecione um médico</option>
    `;

    if (!especialidadeId) {
        return;
    }

    try {

        const resposta = await fetch(
            `/api/medicos?especialidade_id=${especialidadeId}`
        );

        if (!resposta.ok) {
            throw new Error('Erro ao buscar médicos.');
        }

        const medicos = await resposta.json();

        medicos.forEach(item => {

            const option = document.createElement('option');

            option.value = item.id;
            option.textContent = `${item.nome} - CRM: ${item.crm}`;

            medico.appendChild(option);
        });

    } catch (e) {

        console.error(e);

        mostrarMensagem(
            'Erro ao carregar médicos.',
            'erro'
        );
    }
});


// ENVIAR FORMULÁRIO

formulario.addEventListener('submit', async function (evento) {

    evento.preventDefault();

    const paciente = document.getElementById('paciente').value.trim();
    const medicoId = medico.value;
    const dataHora = document.getElementById('data_hora').value;
    const observacao = document.getElementById('observacao').value.trim();


    if (!paciente || !medicoId || !dataHora) {

        mostrarMensagem(
            'Preencha todos os campos obrigatórios.',
            'erro'
        );

        return;
    }


    try {

        const resposta = await fetch('/api/consultas', {

            method: 'POST',

            headers: {
                'Content-Type': 'application/json'
            },

            body: JSON.stringify({

                paciente: paciente,

                medico_id: Number(medicoId),

                data_hora: dataHora,

                observacao: observacao
            })
        });


        const resultado = await resposta.json();


        if (!resposta.ok) {

            throw new Error(resultado.erro);
        }


        mostrarMensagem(
            'Consulta agendada com sucesso!',
            'sucesso'
        );


        formulario.reset();


        medico.innerHTML = `
            <option value="">Selecione um médico</option>
        `;


    } catch (e) {

        mostrarMensagem(
            'Erro: ' + e.message,
            'erro'
        );
    }
});


// MOSTRAR MENSAGEM

function mostrarMensagem(texto, tipo) {

    mensagem.textContent = texto;

    mensagem.className = 'mensagem ' + tipo;
}


// INICIAR

carregarEspecialidades();