const campo = document.querySelector("#campo");
const lista = document.querySelector("#lista");

campo.addEventListener('keydown', (e) =>{
    const texto = e.target.value;

    if(e.key === "Enter"){
        const li = document.createElement("li");
        li.textContent = texto;
        lista.appendChild(li);
       
    }
});





