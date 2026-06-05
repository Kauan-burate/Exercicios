// - Use `.value` para ler o conteúdo de cada input
// - A idade lida do input chega como **string** — converta para número com `Number()` antes de usar em cálculos
// - Imprima: `"Nome: Maria | Idade: 22 | Curso: Desenvolvimento Web"`


const nome = document.querySelector('#nome').value;
const idade = Number(document.querySelector('#idade').value);
const curso  = document.querySelector('#curso').value;


console.log(`Nome: ${nome}  | Idade: ${idade}| Curso: ${curso}`);
