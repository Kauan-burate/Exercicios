const nome = document.querySelector("#nome");
const email = document.querySelector("#email");
const feedback = document.querySelector("#feedback");
const form = document.querySelector("form")

form.addEventListener('submit', (e) =>{
    e.preventDefault();
    if(email.value === "" || nome.value === ""){
        feedback.textContent = "Preencha todos os campos!";
        feedback.style.color = "red";
    }
    else if (!email.value.includes("@")) {
        feedback.textContent = "E-mail inválido!";
        feedback.style.color = "red";
    }
    else{
        feedback.textContent = "Formulário enviado com sucesso!";
        feedback.style.color = "green";
        
    }

});










