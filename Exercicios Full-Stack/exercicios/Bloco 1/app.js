import express from 'express';
import pkg from 'pg';

const {Client } = pkg;

const app = express();

app.use(express.json());

function criarCliente(){
    return new Client({
        host:     'localhost',
        port:     5432,
        user:     'postgres',
        password: 'root',
        database: 'teste_db'
    });
}


app.get('/api/tarefas', async (req, res) => {
    const client = criarCliente();
    try {
        await client.connect();

        const resultado = await client.query('SELECT * FROM tarefas');

        res.status(200).json(resultado.rows);
    } catch (e) {
        res.status(400).json({Erro: e.message});
    } finally{
        await client.end();
    }
});


app.post('/api/tarefas', async (req, res) => {
    const client =  criarCliente();
    try {
        await client.connect();

        const {titulo, concluida} = req.body;

        const resultado = await client.query(
            `INSERT INTO tarefas (titulo, concluida)
             VALUES ($1, $2)
             RETURNING *`,
            [titulo, concluida]
        );
        
        res.status(201).json(resultado.rows);

    } catch (e) {
        res.status(400).json({Erro: e.message});
    }
    finally{
        await client.end();
    }

});


app.listen(3000, () => {
    console.log('Servidor rodando em http://localhost:3000');
});

