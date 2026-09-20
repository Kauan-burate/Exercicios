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

//ATUALIZAÇÃO PARA OUTRA TABELA E USO DE JOIN

app.get('/api/filmes', async (req, res) => {
    const client = criarCliente();

    try {
        await client.connect();        

        const resultado = await client.query(`
        SELECT
            f.id,
            f.titulo,
            f.diretor,
            f.ano,
            f.nota,
            g.nome AS genero
        FROM filmes f
        INNER JOIN generos g ON f.genero_id = g.id
        ORDER BY f.titulo`);
            
        res.status(200).json(resultado.rows);

    } catch (erro) {
        res.status(404).json({Erro: erro.message});
    } finally{
        await client.end();
    }
});

app.get('/api/filmes/:id', async (req, res) => {
    const client = criarCliente();
    const id = req.params.id;

    try {
        await client.connect();
        
        const resultado = await client.query(`
            SELECT
                f.id,
                f.titulo,
                f.diretor,
                f.ano,
                f.nota,
                g.nome AS genero
            FROM filmes f
            INNER JOIN generos g ON f.genero_id = g.id
            WHERE f.id = $1
        `, [id]);


        if(resultado.rows.length === 0){
            return res.status(404).json({Erro: 'Item não encontrado!'});
        }
        res.status(200).json(resultado.rows);
        
    } catch (erro) {
        res.status(404).json({Erro: erro.message});
    } finally{
        await client.end();
    }

});

app.get('/api/generos', async (req, res) =>{
    const client = criarCliente();

    try {
        await client.connect();

        const resultado = await client.query('SELECT * FROM generos');

        res.status(200).json(resultado.rows);


    } catch (e) {
        res.status(404).json({ERRO: e.message});
    }
    finally{
        await client.end();
    }

});

app.post('/api/filmes', async (req, res) => {
    const client = criarCliente();

    try {
        await client.connect();
        const {titulo, diretor, ano, nota, duracao, genero_id} = req.body;

        if(!titulo || ! diretor || !ano || !nota || !duracao || !genero_id){
            return res.status(404).json({Erro: 'Não dados não podem ser vazios'});
        }

        const resultado = await client.query(`
            INSERT INTO filmes (titulo, diretor, ano, nota, duracao, genero_id) 
            VALUES ($1, $2, $3, $4, $5, $6)
            RETURNING *
        `, [titulo, diretor, ano, nota, duracao, genero_id]);

        if(resultado.rows.length === 0){
            return res.status(400).json({ERRO: 'id não existe'});
        }

        res.status(201).json(resultado.rows);

    } catch (e) {
        res.status(404).json({Erro: e.message});
    } finally{
        await client.end();
    }
  


});


app.listen(3000, () => {
    console.log('Servidor rodando em http://localhost:3000');
});
