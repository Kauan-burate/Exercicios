
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
        database: 'cardapio_db'
    });
}

app.get('/api/pratos', async (req, res) => {
    const client = criarCliente();

    try {
        const { categoria } = req.query;

        await client.connect();

        let resultado;

        if (categoria) {
            resultado = await client.query(`
                SELECT
                    p.id,
                    p.nome,
                    p.descricao,
                    p.preco,
                    p.disponivel,
                    c.nome AS categoria
                FROM pratos p
                INNER JOIN categorias c
                    ON p.categoria_id = c.id
                WHERE p.categoria_id = $1
                ORDER BY p.nome
            `, [categoria]);
        } else {
            resultado = await client.query(`
                SELECT
                    p.id,
                    p.nome,
                    p.descricao,
                    p.preco,
                    p.disponivel,
                    c.nome AS categoria
                FROM pratos p
                INNER JOIN categorias c
                    ON p.categoria_id = c.id
                ORDER BY p.nome
            `);
        }

        res.status(200).json(resultado.rows);

    } catch (e) {
        res.status(500).json({ erro: e.message });
    } finally {
        await client.end();
    }
});

app.get('/api/pratos/:id', async (req, res) => {
    const client = criarCliente();

    try {
        await client.connect();

        const resultado = await client.query(`
            SELECT
                p.id,
                p.nome,
                p.descricao,
                p.preco,
                p.disponivel,
                c.nome AS categoria
            FROM pratos p
            INNER JOIN categorias c
                ON p.categoria_id = c.id
            WHERE p.id = $1
        `, [req.params.id]);

        if (resultado.rows.length === 0) {
            return res.status(404).json({
                erro: 'Prato não encontrado.'
            });
        }

        res.status(200).json(resultado.rows[0]);

    } catch (e) {
        res.status(500).json({ erro: e.message });
    } finally {
        await client.end();
    }
});

app.get('/api/categorias', async (req, res) => {
    const client = criarCliente();
    try {
        await client.connect();

        const resultado = await client.query(`SELECT * FROM categorias`);

        res.status(200).json(resultado.rows);
        
    } catch (e) {
        res.status(400).json({Erro: e.message});
    } finally{
        await client.end();
    }

});

app.post('/api/pratos', async (req, res) => {
    const client = criarCliente();
    try {
        const {nome, descricao, preco, categoria_id, disponivel} = req.body;

        await client.connect();

        if(!nome || !descricao || preco <= 0 || !categoria_id || typeof disponivel !== 'boolean'){
            return  res.status(400).json({erro: 'Nome não pode ser vazio, preco não pode ser negativo ou 0 e categoria_id tem que ser valida!'});
        }

        const resultado = await client.query(`
            INSERT INTO pratos (nome, descricao, preco, categoria_id, disponivel)
            VALUES ($1, $2, $3, $4, $5)
            RETURNING *`, [nome, descricao, preco, categoria_id, disponivel]
        );

        if(resultado.rows.length === 0 ){
           return res.status(400).json({erro: 'Id de categoria_id invalido! Digite uma opção valida!'});
        }

        res.status(201).json(resultado.rows);
        
    } catch (e) {
        res.status(400).json({Erro: e.message});
    } finally{
        await client.end();
    }
});


app.put('/api/pratos/:id', async (req, res) => {
    const client = criarCliente();

    try {
        const { nome, descricao, preco, disponivel, categoria_id } = req.body;
        const { id } = req.params;

        if (!nome || !preco || preco <= 0 || !categoria_id) {
            return res.status(400).json({
                erro: 'Nome, preço e categoria_id são obrigatórios!'
            });
        }

        await client.connect();

        const categoria = await client.query(
            'SELECT id FROM categorias WHERE id = $1',
            [categoria_id]
        );

        if (categoria.rows.length === 0) {
            return res.status(400).json({
                erro: 'categoria_id inválido!'
            });
        }

        const resultado = await client.query(`
            UPDATE pratos
            SET nome = $1,
                descricao = $2,
                preco = $3,
                disponivel = $4,
                categoria_id = $5
            WHERE id = $6
            RETURNING *
        `, [
            nome,
            descricao,
            preco,
            disponivel,
            categoria_id,
            id
        ]);

        if (resultado.rows.length === 0) {
            return res.status(404).json({
                erro: 'Prato não encontrado!'
            });
        }

        res.status(200).json(resultado.rows[0]);

    } catch (e) {
        res.status(400).json({
            Erro: e.message
        });
    } finally {
        await client.end();
    }
});

app.delete('/api/pratos/:id', async (req, res) => {
    const client = criarCliente();

    try {
        const { id } = req.params;

        await client.connect();

        const resultado = await client.query(`
            DELETE FROM pratos
            WHERE id = $1
            RETURNING *
        `, [id]);

        if (resultado.rows.length === 0) {
            return res.status(404).json({
                erro: 'Prato não encontrado!'
            });
        }

        res.status(200).json({
            mensagem: 'Prato removido com sucesso!',
            prato: resultado.rows[0]
        });

    } catch (e) {
        res.status(400).json({
            Erro: e.message
        });
    } finally {
        await client.end();
    }
});





app.listen(3000, () => {
    console.log('Servidor rodando em http://localhost:3000');
});




