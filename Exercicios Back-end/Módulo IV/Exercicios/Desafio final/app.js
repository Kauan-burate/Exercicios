import pg from 'pg';
import PromptSync from 'prompt-sync';

const prompt = PromptSync();
const {Client} = pg;

const client = new Client({
    host:     'localhost',
    port:     5432,
    user:     'postgres',
    password: '150783',
    database: 'escola_db'
});


function menu (){
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
}

 async function VizualizarAlunos(){
    try{

        const nomeNotaAlunos   = await client.query(`SELECT nome, turma, nota FROM alunos`);

        console.log("DADOS DOS ALUNOS: ");
        console.table(nomeNotaAlunos.rows);

    }
    catch(error){
        console.log(error.message);
    }
    finally{
        await client.end();
    }

}
async function VizualizarTurma(){

}
async function CadastrarAluno(){

}
async function LancarNota(){

}
async function RemoverAluno(){

}

await client.end();

async function main(){
    let sistemaAtivo = true;
    while(sistemaAtivo){
        menu();
        const comando = Number(prompt("Digite um comando: "));
        if(comando < 0 || comando > 5){
            console.log("Comando inválido!");
        } else{
            switch (comando) {
                case 1:
                    VizualizarAlunos();
                    break;

                case 2:
                    VizualizarTurma();
                    break;

                case 3:
                    CadastrarAluno();
                    break;

                case 4:
                    LancarNota();
                    break;

                case 5:
                    RemoverAluno();
                    break;

                case 0:
                    sistemaAtivo = false;
                    break;

                default:
                    // código caso nenhum case seja atendido
                }

        }
        main();

    }


}


