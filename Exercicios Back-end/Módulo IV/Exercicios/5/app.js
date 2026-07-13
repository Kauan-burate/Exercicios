import pg from 'pg';
import promptSync from 'prompt-sync';

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

    const alunos = await client.query(
    'SELECT id, nome, turma FROM alunos');

    console.log("==========================");
    console.log("ALUNOS CADASTRADOS: ");
    console.log("==========================");
    console.table(alunos.rows);

    const idRemov = Number(prompt("Digite o ID do aluno que dejesa remover: "));

    const dados = [idRemov];
    const deletarAluno = await client.query(`SELECT id, nome, turma FROM alunos WHERE id = $1`, dados);
    
    if (deletarAluno.rows.length === 0){
        console.log("ERRO: Aluno não encontrado!");
    } else{
        const aluno = deletarAluno.rows[0];

        console.log(`Aluno encontrado`);
        const resultado = Number(prompt(
        `Deseja deletar o aluno ${aluno.nome}? (1 = SIM / 0 = NÃO): `
        ));

        if( resultado == 1){
            const deletar = await client.query('DELETE FROM alunos WHERE id = $1', [idRemov]);
            console.log(`Aluno: ${aluno.nome} Deletado com sucesso!`);

            
        } else{
            console.log("❌ Operação cancelada.");

        }
    }


} catch (error) {
    console.log(error.message);
}

finally{
    await client.end();
}



