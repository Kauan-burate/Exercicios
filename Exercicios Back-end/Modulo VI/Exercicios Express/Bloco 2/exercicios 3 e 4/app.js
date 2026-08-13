import express from 'express';
import pkg from 'pg';
const { Client } = pkg;

const app = express();
app.use(express.json());
app.use(express.static('public'));

function criarCliente() {
    return new Client({
        host:     'localhost',
        port:     5432,
        user:     'postgres',
        password: 'root',
        database: 'filmes_db'
    });
}

app.get('/api/filmes', async (req, res) => {
    const client = criarCliente();

    try {
        await client.connect();        

        const resultado = await client.query(
        'SELECT * FROM filmes ORDER BY titulo'
        );

        res.json(resultado.rows);

    } catch (erro) {
        res.status(404).json({Erro: erro.message});
    } finally{
        await client.end();
    }
});


app.listen(3000, () => {
    console.log('Servidor rodando em http://localhost:3000');
});
