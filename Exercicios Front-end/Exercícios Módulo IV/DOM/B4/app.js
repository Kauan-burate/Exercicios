const placar = document.querySelector("#placar");
const pontos = 1;

placar.textContent = pontos;

if (pontos >= 0 && pontos <= 49 ){
    placar.style.color = "#ff0000";
    placar.style.backgroundColor = "#fde8e8";

}
else if (pontos >= 50 && pontos <= 74){
    placar.style.color = "#ff8000";
    placar.style.backgroundColor = "#fef3e2";
}
else if (pontos >= 75 && pontos <= 100){
    placar.style.color = "#07ff18";
    placar.style.backgroundColor = "#eafaf1";
}



