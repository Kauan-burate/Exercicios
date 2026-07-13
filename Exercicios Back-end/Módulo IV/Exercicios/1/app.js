import pg from 'pg';

const {Client} = pg;

const client = new Client({
    host:     'localhost',
    port:     5432,
    user:     'postgres',
    password: '150783',
    database: 'escola_db'
});

try{
    await client.connect();

    console.log("DADOS DOS ALUNOS:")
    const totalAlunos = `SELECT COUNT(*) FROM alunos`;
    const resultado = await client.query(totalAlunos);
    console.log('TOTAL DE ALUNOS:', resultado.rows[0].count);

    const mediaAlunos = `SELECT AVG(nota) FROM alunos`;
    const resultado2 = await client.query(mediaAlunos);
    console.log(`Média da turma:`, resultado2.rows[0].avg);

    const notaMaisAlta = `SELECT nome, nota FROM alunos ORDER BY nota DESC LIMIT 1;`;
    const resultado3 = await client.query(notaMaisAlta);
    console.log(`Aluno com nota mais alta:`, resultado3.rows[0]);

    const notaMaisBaixa = `SELECT nome, nota FROM alunos ORDER BY nota ASC  LIMIT 1;`;
    const resultado4 = await client.query(notaMaisBaixa);
    console.log(`Aluno com nota mais baixa:`, resultado4.rows[0]);


} catch (erro){
    console.log('❌ Erro exibir alunos:', erro.message);


} finally{
    await client.end();

}




