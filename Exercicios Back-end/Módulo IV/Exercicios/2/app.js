import pg from 'pg';
import promptSync from 'prompt-sync';

const prompt = promptSync();

const {Client } = pg;

const client = new Client({
    host:     'localhost',
    port:     5432,
    user:     'postgres',
    password: '150783',
    database: 'escola_db'
});

try {
    await client.connect();

    const mediaTurma              = await client.query(`SELECT AVG(nota) AS media FROM alunos`);
    const alunoNotaAcimaDaMedia   = await client.query(`SELECT nome FROM alunos ORDER BY nota DESC LIMIT 1 `); 
    const nomeNotaAlunos          = await client.query(`SELECT nome, nota FROM alunos`);
    const alunosNotaAcimaDaMedia  = await client.query(`SELECT nome, nota FROM alunos WHERE nota > 7 ORDER BY nota DESC`);



console.log("========[DADOS ALUNOS]========\n");

console.log("TODOS OS ALUNOS:");
console.table(nomeNotaAlunos.rows);

console.log("\nALUNOS COM NOTA ACIMA DE 7:");
console.table(alunosNotaAcimaDaMedia.rows);

console.log("\nALUNO COM NOTA MAIS ALTA:");
console.log(alunoNotaAcimaDaMedia.rows[0].nome);

console.log("\nMÉDIA DA TURMA:");
console.log(Number(mediaTurma.rows[0].media).toFixed(2));

console.log("\n==============================");

//=================================================//==================================================//

const generoDig = prompt("\nDigite o Gênero de um jogo: ");

const resultado = await client.query(`SELECT * FROM jogos WHERE genero = $1`, [generoDig]);

console.log("\n==================================================");
console.log(`\nTODOS OS JOGOS DE ${generoDig} DISPONÍVEIS:`);
console.log(resultado.rows);
console.log("\n==================================================");

    
} catch (error) {



    
} finally{
    await client.end();



}




