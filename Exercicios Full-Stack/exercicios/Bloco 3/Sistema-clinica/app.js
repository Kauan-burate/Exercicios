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

app.listen(3000, () => {
    console.log('Servidor rodando em http://localhost:3000');
});


