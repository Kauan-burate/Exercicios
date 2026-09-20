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
        password: '150783',
        database: 'filmes_db'
    });
}

app.post('/api/filmes', async (req, res) => {
    const client = criarCliente();

    try {
        await client.connect();
        const {titulo, diretor, ano, nota, duracao} = req.body;

        if(!titulo || ! diretor || !ano || !nota || !duracao){
            return res.status(404).json({Erro: 'Não dados não podem ser vazios'});
        }

        const resultado = await client.query(`
            INSERT INTO filmes (titulo, diretor, ano, nota, duracao) 
            VALUES ($1, $2, $3, $4, $5)
            RETURNING *
        `, [titulo, diretor, ano, nota, duracao]);

        res.status(201).json(resultado.rows);

    } catch (e) {
        res.status(404).json({Erro: e.message});
    } finally{
        await client.end();
    }
  
});


app.put('/api/filmes/:id', async (req, res) => {
    const client = criarCliente();

    try {
        await client.connect();
        const id = req.params.id;
        const {titulo, diretor, ano, nota, duracao} = req.body;

        if(!titulo || ! diretor || !ano || !nota || !duracao){
            return res.status(404).json({Erro: 'Os dados não podem ser vazios'});
        }

        const resultado = await client.query('UPDATE filmes SET titulo = COALESCE($1, titulo), diretor = COALESCE($2, diretor), ano = COALESCE($3, ano), nota = COALESCE($4, nota), duracao = COALESCE($5, duracao) WHERE id = $6 RETURNING *', [titulo, diretor, ano, nota, duracao, id]);

        res.status(200).json(resultado.rows);
        
    } catch (error) {
        res.status(404).json({ERRO: error.message});
    }
    finally{
        await client.end();
    }

});

app.delete('/api/filmes/:id',async (req, res) => {
    const client  = criarCliente();

    try {
        await client.connect();
        const id = req.params.id;

        const resultado = await client.query('DELETE FROM filmes WHERE id = $1 RETURNING titulo', [id]);

        if(resultado.rows.length === 0){
            return res.status(404).json({ERRO: 'Erro filme não existe!'});
        }

        res.status(200).json({
            mensagem: 'filme removido com sucesso!',
            titulo:  resultado.rows[0].titulo
        });

    } catch (e) {
        res.status(404).json({ERRO: e.message});

    } finally{
        await client.end();
    }
});





app.listen(3000, () => {
    console.log('Servidor rodando em http://localhost:3000');
});
