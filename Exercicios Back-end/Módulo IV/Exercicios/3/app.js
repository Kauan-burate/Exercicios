import pg from 'pg';
import promptSync from 'prompt-sync';

const prompt = promptSync();
const {Client} = pg;

const client = new Client({
    host:     'localhost',
    port:     5432,
    user:     'postgres',
    password: '150783',
    database: 'escola_db'
});


try {
    await client.connect();

    console.log("=============================");
    console.log("⚙️ GERENCIADOR DE ALUNOS");
    console.log("=============================");

    const nome   = prompt(`Digite o nome:`);
    const turma  = (prompt(`Digite a turma:`));
    const nota   = Number(prompt(`Digite a nota:`));

    //Validar
    if(nome.trim() === "" || nome.length < 3){
        console.log("ERRO: Campo não pode estar vazio, ou ser ter tamanho menor que 3!")
    } else if (nota < 0 || nota > 10){
        console.log("ERRO: A nota tem que ser Maior ou Igual a Zero ou Menor ou Igual a Dez!")
    } else{

        const sql = `
        INSERT INTO alunos (nome, turma, nota)
        VALUES($1, $2, $3)
        RETURNING *
        `;

        const valores = [nome, turma, nota];

        const resultado = await client.query(sql, valores);

        console.log("Aluno cadastrado com sucesso!");
        console.table(resultado.rows);

    }


} catch (error) {
    console.log(error.message);


} finally{
    await client.end();


}




