const foto = document.querySelector("#foto");
const link = document.querySelector("#link");
const campo = document.querySelector("#campo");

foto.setAttribute("src", "https://images.unsplash.com/photo-1503023345310-bd7c1de61c7d");

link.setAttribute("href", "https://github.com");
campo.setAttribute("disabled", "");

let src = foto.getAttribute("src");
console.log(`LINK: ${src}`);






