import pkg from 'pg';
import express from 'express';

const {Client} = pkg;
const app = express();

app.use(express.json());
app.use(express.static('public'));

function criarCliente(){
    return new Client({
        host:     'localhost',
        port:     5432,
        user:     'postgres',
        password: '150783',
        database: 'clinica_db'
    });
}

app.get('/api/especialidades', async (req, res) =>{
    const client = criarCliente();

    try {
        await client.connect();

        const resultado = await client.query(`SELECT nome FROM especialidades`);

        res.status(200).json(resultado.rows);
        
    } catch (e) {
        res.status(500).json({erro: e.message});
    } finally{
        await client.end();
    }


});

app.get('/api/medicos', async (req, res) => {
    const client = criarCliente();

    try {
        await client.connect();

        const resultado = await client.query(`
            SELECT m.nome, m.crm, e.nome AS especialidade FROM medicos m 
            INNER JOIN especialidades e ON m.especialidade_id = e.id
        `);

        res.status(200).json(resultado.rows);
            
    } catch (e) {
       res.status(400).json({erro: e.message}); 
    } finally{
        await client.end();
    }
});

app.get('/api/medicos/:id', async (req, res) => {
    const client = criarCliente();

    try {

        const id = req.params.id;

        await client.connect();

        const resultado = await client.query(`
            SELECT m.nome, m.crm, e.nome AS especialidade FROM medicos m 
            INNER JOIN especialidades e ON m.especialidade_id = e.id WHERE m.id = $1
        `, [id]);

        res.status(200).json(resultado.rows);
            
    } catch (e) {
       res.status(400).json({erro: e.message}); 
    } finally{
        await client.end();
    }
});

app.get('/api/consultas', async (req, res) => {
    const client = criarCliente();

    try {
        await client.connect();

        const resultado = await client.query(`
            SELECT 
                c.id,
                c.paciente,
                m.nome AS medico,
                m.crm,
                e.nome AS especialidade,
                c.data_hora,
                c.status,
                c.observacao
            FROM consultas c
            INNER JOIN medicos m ON m.id = c.medico_id
            INNER JOIN especialidades e ON e.id = m.especialidade_id
            ORDER BY c.data_hora
        `);

        res.status(200).json(resultado.rows);

    } catch (e) {
        res.status(500).json({ erro: e.message });

    } finally {
        await client.end();
    }
});

app.get('/api/consultas/:id', async (req, res) => {
    const client = criarCliente();

    try {
        const id = req.params.id;

        await client.connect();
        
        const resultado = await client.query(`
            SELECT c.paciente, 
            m.nome AS medico,
            c.data_hora, 
            c.status , 
            c.observacao  
            FROM consultas c
            INNER JOIN medicos m ON m.id = c.medico_id WHERE c.id = $1`, [id]
        );

        res.status(200).json(resultado.rows);


    } catch (e) {
        res.status(500).json({erro: e.message});
    } finally{
        await client.end();
    }


});

app.post('/api/consultas', async (req, res) => {

    const client = criarCliente();

    try {

        const { paciente, medico_id, data_hora, observacao } = req.body;

        // Verificar campos obrigatórios
        if (!paciente || !medico_id || !data_hora) {

            return res.status(400).json({
                erro: 'Paciente, médico e data/hora são obrigatórios.'
            });
        }

        await client.connect();

        // Verificar se o médico existe
        const medico = await client.query(`
            SELECT id
            FROM medicos
            WHERE id = $1
        `, [medico_id]);

        if (medico.rows.length === 0) {

            return res.status(404).json({
                erro: 'Médico não encontrado.'
            });
        }

        // Verificar se a data não está no passado
        const dataConsulta = new Date(data_hora);
        const agora = new Date();

        if (dataConsulta < agora) {

            return res.status(400).json({
                erro: 'A data da consulta não pode estar no passado.'
            });
        }

        // Verificar se o médico já possui consulta nesse horário
        const conflito = await client.query(`
            SELECT id
            FROM consultas
            WHERE medico_id = $1
            AND data_hora = $2
            AND status = 'agendada'
        `, [medico_id, data_hora]);

        if (conflito.rows.length > 0) {

            return res.status(409).json({
                erro: 'Este médico já possui uma consulta agendada neste horário.'
            });
        }

        // Criar a consulta
        const resultado = await client.query(`
            INSERT INTO consultas
            (paciente, medico_id, data_hora, status, observacao)
            VALUES ($1, $2, $3, 'agendada', $4)
            RETURNING *
        `, [
            paciente,
            medico_id,
            data_hora,
            observacao || null
        ]);

        // Resposta para o JavaScript
        res.status(201).json({
            mensagem: 'Consulta agendada com sucesso!',
            consulta: resultado.rows[0]
        });

    } catch (e) {

        console.error(e);

        res.status(500).json({
            erro: e.message
        });

    } finally {

        await client.end();
    }
});

app.put('/api/consultas/:id/status', async (req, res) => {
    const { id } = req.params;
    const { status } = req.body;

    const statusValidos = ['agendada', 'realizada', 'cancelada'];

    if(!statusValidos.includes(status)){
        return req.status(400).json({
             erro: 'Status inválido. Use: agendada, realizada ou cancelada.'
        });
    }

    const client = criarCliente();

    try {
        await client.connect();

        const resultado = await client.query(`
            UPDATE consultas
            SET status = $1 
            WHERE id = $2
            RETURNING *`, [status, id]
        );

        if(resultado.rows.length === 0){
            return res.status(404).json({
                erro: 'consulta não encontrada.'
            });
        }


        res.status(200).json(resultado.rows[0]);
        
    } catch (e) {
        res.status(500).json({erro: e.message});

    } finally{
        await client.end();
    }

});

app.delete('/api/consultas/:id', async (req, res) => {
    const {id} = req.params;

    if(!id){
        return res.status(400).json({
             erro: 'Id inválido.'
        });
    }

    const client = criarCliente();
    try {
        await client.connect();

        const resultado = await client.query(`
            DELETE FROM consultas WHERE id = $1 RETURNING *`, [id]
        );

        if(resultado.rows.length === 0){
            return res.status(404).json({erro: 'Id não existe. Use um id válido!'});
        }

        res.status(200).json({
            mensagem: "Consulta deletada com sucesso!",
            consulta: resultado.rows[0]
        });

        
    } catch (e) {
        res.status(404).json({erro: e.message});
    } finally{
        await client.end();
    }

});

app.listen(3000, () => {
    console.log('Servidor rodando em http://localhost:3000');
});


