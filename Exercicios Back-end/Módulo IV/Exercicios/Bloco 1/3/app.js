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

    const clientes = await client.query( `SELECT id, nome, cidade FROM Clientes `);
    //listar clientes disponiveis
    console.log("CLIENTES CADASTRADOS: ");
    console.table(clientes.rows);

    const clienteID = prompt("Digite o ID do cliente: ");

    //Liste os produtos disponíveis (com estoque > 0) e peça o ID do produto
    console.log("Produtos com estoque Disponível: ");
    const produtos = await client.query(`
    SELECT id, nome, 
    preco, estoque 
    FROM produtos  WHERE estoque > 0`);

    console.table(produtos.rows);

    const produtoID = prompt("Digite o ID do produto: ");

    const qntDesejada = prompt("Digite a quantidade desejada: ");

    const estoqueProduto = await client.query(`SELECT id, nome, preco, estoque
    FROM produtos WHERE id = $1 `, [produtoID]);

    const estoqueDisponivel = estoqueProduto.rows[0];

    if(estoqueDisponivel.estoque < qntDesejada){
        console.log(`Estoque insuficiente. Disponível: ${estoqueDisponivel.estoque} unidades`);
    } else{
        // Inserir pedidos 
        const pedidos = await client.query(`INSERT INTO pedidos
        (cliente_id, produto_id, quantidade)
        VALUES($1, $2, $3)
        RETURNING *`, [clienteID, produtoID, qntDesejada]);

        // Atualiza estoque
        await client.query(`
            UPDATE produtos
            SET estoque = estoque - $1
            WHERE id = $2
        `, [qntDesejada, produtoID]);
        
        console.log("Pedido confirmado com sucesso!!");
        console.table(pedidos.rows);



    }



    
} catch (e) {
    console.log(e.message);
} finally{
    await client.end();
}