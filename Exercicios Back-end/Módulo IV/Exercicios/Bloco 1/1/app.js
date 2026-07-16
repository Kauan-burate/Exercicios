import pg from 'pg'; 

const {Client} = pg;

const client = new Client({
    host:     'localhost',
    port:     5432,
    user:     'postgres',
    password: 'postgres',
    database: 'ecommerce_db'
});


try {
    await client.connect();

    const produtos_categorias = `SELECT p.id, p.nome, p.preco, p.estoque, c.nome, c.id AS categoria,
    COUNT(*) OVER (PARTITION BY c.id) AS total_na_categoria FROM produtos p
    INNER JOIN categorias c ON p.categoria_id = c.id
    ORDER BY c.nome, p.nome;`

    const resultado = await client.query(produtos_categorias);

    console.log(resultado.rows);
    
    
} catch (error) {
    console.log(error.message);

} finally{
    await client.end();
}

