import pg from 'pg';
import promptSync from 'prompt-sync';
import chalk from 'chalk';

const {Client} = pg;
const prompt = promptSync();

const client = new Client({
    host:     'localhost',
    port:     5432,
    user:     'postgres',
    password: '150783',
    database: 'escola_db'
});


try {
    await client.connect();
    
    const listar = `
    SELECT id, nome, nota FROM alunos
    `;

    const listarAlunos = await client.query(listar);
    console.log("=========================");
    console.log("ALUNOS CADASTRADOS");
    console.log("=========================");
    console.table(listarAlunos.rows);


//===============================================//================================================//    


    console.log("============================");
    console.log("ATUALIZAR DADOS DOS ALUNOS");
    console.log("============================");

    const novoId    = Number(prompt("Digite o ID do aluno que deseja alterar a nota: "));
    const novaNota  = Number(prompt("Digite a nova nota: "));

    if(novoId < 0 || novoId > 8){
        console.log("ERRO: Digite um id existente!");
    } else if( novaNota < 0 || novaNota > 10){
        console.log("ERRO: Digite uma Nota válida!")
    } else{
        const dadosParaAlteracao = `
            UPDATE alunos 
            SET nota = $1
            WHERE id = $2
            RETURNING *`;

        const dados = [novaNota, novoId];
        const resultadoAlteracao = await client.query(dadosParaAlteracao, dados);


        let situacao;

        if(novaNota >= 7){
            situacao = "Aprovado ✅";
        } else if(novaNota >= 5){
            situacao = "Recuperação ⚠️";
        } else{
            situacao = "Reprovado ❌";
        }

        console.table(resultadoAlteracao.rows);
        console.log(chalk.greenBright("Dados atualizados com sucesso!"));

        console.log("\n==========================");
        console.log("✔ Nota atualizada com sucesso!");
        console.log(`Nova Nota: ${novaNota}`);
        console.log(`Situação: ${situacao}`);
        console.log("==========================");

    }

  
} catch (error) {
    console.log(error.message);


}
finally{
    await client.end();
}