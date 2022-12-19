//declaracion de variables
let cardViestas = 0; //variable para saber cuantas card se vieron al ser =2 volvera a 0
// variables para conocer cual card fue destapada
let card1 = null;
let card2 = null;
let bloquearC = null;

//resultados
let primeraCard = 0;
let segundaCard = 0;

//aciertos
let aciertos = 0;

//mievimientos realizados
let movimientos = 0;

let temporizador = false;
let timer = 30;
let timer2 = timer;
let idInterval = null;

//sonidos
let clic = new Audio("./sounds/click.wav");
let lose = new Audio("./sounds/lose.wav");
let no = new Audio("./sounds/no.wav");
let yes = new Audio("./sounds/yes.wav");
let win = new Audio("./sounds/win.wav");

//generador de la arreglo par
let pares = [1, 1, 2, 2, 3, 3, 4, 4, 5, 5, 6, 6, 7, 7, 8, 8];
pares = pares.sort(() => {
  return Math.random() - 0.5;
});

function bloquearCard() {
  for (let i = 0; i <= 15; i++) {
    bloquearC = document.getElementById(i);
    bloquearC.innerHTML = `<img src="./img/${pares[i]}.png">`;
    bloquearC.disabled = true;
  }
}

function contarTimer() {
  idInterval = setInterval(() => {
    timer--;
    document.getElementById("timer").innerHTML = `Tiempo: ${timer} segundos`;
    if (timer == 0) {
      lose.play();
      clearInterval(idInterval);
      bloquearCard();
    }
  }, 1000);
}

//funcion para visibilizar card
function destapar(id) {
  clic.play();
  if (temporizador == false) {
    contarTimer();
    temporizador = true;
  }
  //mostrar primera card
  cardViestas++;
  if (cardViestas == 1) {
    card1 = document.getElementById(id);
    primeraCard = pares[id];
    card1.innerHTML = `<img src="./img/${primeraCard}.png">`;
    card1.disabled = true;
  } else if (cardViestas == 2) {
    card2 = document.getElementById(id);
    segundaCard = pares[id];
    card2.innerHTML = `<img src="./img/${segundaCard}.png">`;
    card2.disabled = true;
    movimientos++;
    document.getElementById(
      "movimientos"
    ).innerHTML = `Movimientos: ${movimientos}`;
    if (primeraCard == segundaCard) {
      cardViestas = 0;
      aciertos++;
      yes.play();
      document.getElementById("acierto").innerHTML = `Acirtos: ${aciertos}`;
      if (aciertos == 8) {
        clearInterval(idInterval);
        win.play();
        document.getElementById(
          "acierto"
        ).innerHTML = `Acirtos: ${aciertos} , bien hecho`;
        document.getElementById("timer").innerHTML = `Te tomo: ${(timer2 =
          timer2 - timer)} segundos`;
      }
    } else {
      setTimeout(() => {
        card1.innerHTML = " ";
        card2.innerHTML = " ";
        card1.disabled = false;
        card2.disabled = false;
        cardViestas = 0;
        no.play();
      }, 800);
    }
  }
}
