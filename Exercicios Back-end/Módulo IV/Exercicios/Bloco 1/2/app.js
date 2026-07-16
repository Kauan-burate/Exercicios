import pg from 'pg';
import PromptSync from 'prompt-sync';

const {Client} = pg;
const prompt = PromptSync();

const client = new Client({
    host:     'localhost',
    port:     5432,
    user:     'postgres',
    password: 'postgres',
    database: 'ecommerce_db'
});

try {
    await client.connect();

    const nomeCliente = prompt("Digite seu nome: ");

    const resultado = await client.query(`SELECT pr.nome AS produto,
    pd.quantidade,
    pr.preco,
    pd.data_pedido,
    (pr.preco * pd.quantidade) AS total
    FROM pedidos pd
    INNER JOIN clientes cl ON pd.cliente_id = cl.id
    INNER JOIN produtos pr ON pd.produto_id = pr.id
    WHERE cl.nome ILIKE $1`, [nomeCliente]);

    const data = new Date(resultado.rows[0].data_pedido);

    if(resultado.rows.length === 0 ){
        console.log("Cliente não cadastrado!");
    } 
    else{
        console.log("Cliente encontrado!");
        console.log(`Produtos de ${nomeCliente}: `);
        console.table(resultado.rows);
        console.log(`DATA DO PEDIDO: ${data.toLocaleDateString("pt-BR")}`);
    }


    
} catch (e) {
    console.log(e.message);

} finally{

    await client.end();
}