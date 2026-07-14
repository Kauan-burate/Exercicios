import pg from 'pg';
import PromptSync from 'prompt-sync';

const prompt = PromptSync();
const {Client} = pg;

const client = new Client({
    host:     'localhost',
    port:     5432,
    user:     'postgres',
    password: 'root',
    database: 'escola_db'
});



 async function VizualizarAlunos(){
    try{
        const nomeNotaAlunos   = await client.query(`SELECT nome, turma, nota FROM alunos`);

        console.log("DADOS DOS ALUNOS: ");
        console.table(nomeNotaAlunos.rows);

    }
    catch(error){
        console.log(error.message);
    }

}
async function VizualizarTurma(){

}
async function CadastrarAluno(){

   
}

async function LancarNota(){

    try {
        
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
            console.log("Dados atualizados com sucesso!");
    
            console.log("\n==========================");
            console.log("✔ Nota atualizada com sucesso!");
            console.log(`Nova Nota: ${novaNota}`);
            console.log(`Situação: ${situacao}`);
            console.log("==========================");
    
        }
    
      
    } catch (error) {
        console.log(error.message);
    
    }





}
async function RemoverAluno(){

}

async function menu (){

    try {
        await client.connect();

        let sistemaAtivo = true;

        while(sistemaAtivo){
            console.log("══════════════════════════════════");
            console.log("   🎓 SISTEMA DE TURMA 3DS");
            console.log("══════════════════════════════════");
            console.log("1 - Ver todos os alunos");
            console.log("2 - Ver situação da turma");
            console.log("3 - Cadastrar aluno");
            console.log("4 - Lançar nota");
            console.log("5 - Remover aluno");
            console.log("0 - Sair");
            console.log("══════════════════════════════════");

            const comando = Number(prompt("Digite um Comando: "));
            switch (comando) {
                case 1: await VizualizarAlunos();   break;
                case 2: await VizualizarTurma();    break;
                case 3: await CadastrarAluno();     break;
                case 4: await LancarNota();         break;
                case 5: await RemoverAluno();       break;
                case 0: sistemaAtivo = false; console.log("Saindo do sistema...."); break;
                default: console.log("Comando inválido!");
            }


        }
  
        } catch (error) {
            console.log(error.message);
        }
        finally{
            await client.end();

        }

}
await menu();

    
    





