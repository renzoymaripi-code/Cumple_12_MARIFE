/*==========================================================
  OPERACIÓN ENIGMA 12
==========================================================*/

const pages = document.querySelectorAll(".page");

function showPage(id){

    pages.forEach(p=>p.classList.remove("active"));

    document.getElementById(id).classList.add("active");

}

/*=========================
  BARRA DE CARGA
=========================*/

const bar=document.getElementById("progressBar");
const loadingText=document.getElementById("loadingText");

let progress=0;

const bootMessages=[

"Inicializando sistema...",
"Cargando protocolos...",
"Conectando satélite...",
"Buscando agentes...",
"Descifrando claves...",
"Verificando identidad..."

];

let msg=0;

const boot=setInterval(()=>{

progress++;

bar.style.width=progress+"%";

if(progress%18===0){

loadingText.innerHTML=bootMessages[msg];

msg++;

if(msg>=bootMessages.length){

msg=bootMessages.length-1;

}

}

if(progress>=100){

clearInterval(boot);

loadingText.innerHTML="ACCESS GRANTED";

setTimeout(()=>{

showPage("fingerPage");

},1200);

}

},45);

/*=========================
 ESCÁNER
=========================*/

document
.getElementById("scanButton")
.onclick=()=>{

if(navigator.vibrate){

navigator.vibrate([150,80,150]);

}

play("click");

setTimeout(()=>{

showPage("terminalPage");

startTerminal();

},800);

};

/*=========================
 TERMINAL
=========================*/

const terminalText=`

██████████████████████████

IDENTIDAD CONFIRMADA

██████████████████████████

Agente detectada...

Nombre:
MARIFÉ

Edad:
12 años

Nivel:
TOP SECRET

Estado:
MISIÓN PENDIENTE

Has sido seleccionada
para participar en
una misión especial.

Objetivo:

Resolver todos los enigmas
antes de que el tiempo termine.

`;

let letter=0;

function startTerminal(){

play("typing");

const area=document.getElementById("terminal");

const typing=setInterval(()=>{

area.textContent+=terminalText.charAt(letter);

letter++;

if(letter>=terminalText.length){

clearInterval(typing);

stop("typing");

document
.getElementById("nextMission")
.style.display="inline-block";

}

},28);

}

/*=========================
 CONTINUAR
=========================*/

document
.getElementById("nextMission")
.onclick=()=>{

play("click");

showPage("challenge1");

};

/*=========================
 RETO
=========================*/

document
.getElementById("verify1")
.onclick=()=>{

const value=document
.getElementById("answer1")
.value
.toUpperCase()
.trim();

if(value==="ESCAPE"){

play("unlock");

setTimeout(()=>{

showPage("invitation");

},1000);

}else{

shake();

}

};

/*=========================
 ACEPTAR MISIÓN
=========================*/

document
.getElementById("acceptMission")
.onclick=()=>{

play("unlock");

showPage("success");

countdown();

};

/*=========================
 CUENTA REGRESIVA
=========================*/

function countdown(){

let n=10;

const c=document.getElementById("countdown");

c.innerHTML=n;

const timer=setInterval(()=>{

n--;

c.innerHTML=n;

if(n===0){

clearInterval(timer);

c.innerHTML="🎉";

document.querySelector("#success p").innerHTML=

"¡Excelente Agente!<br><br>Nos vemos el sábado 22 de agosto a las 3:00 p.m.";

confetti();

}

},1000);

}

/*=========================
 SONIDOS
=========================*/

function play(id){

const a=document.getElementById(id);

if(!a)return;

a.currentTime=0;

a.play();

}

function stop(id){

const a=document.getElementById(id);

if(!a)return;

a.pause();

}

/*=========================
 ERROR
=========================*/

function shake(){

document.body.animate([

{transform:"translateX(-8px)"},

{transform:"translateX(8px)"},

{transform:"translateX(-8px)"},

{transform:"translateX(8px)"},

{transform:"translateX(0)"}

],{

duration:350

});

play("click");

}

/*=========================
 CONFETI
=========================*/

function confetti(){

for(let i=0;i<120;i++){

const d=document.createElement("div");

d.className="confetti";

d.style.left=Math.random()*100+"vw";

d.style.animationDuration=

2+Math.random()*3+"s";

d.style.background=

`hsl(${Math.random()*360},100%,60%)`;

document.body.appendChild(d);

setTimeout(()=>{

d.remove();

},5000);

}

}

/*=========================
 MODO SECRETO
=========================*/

let secret=0;

document
.querySelector(".logo")
.addEventListener("click",()=>{

secret++;

if(secret===5){

alert(

`🔒 ARCHIVO CLASIFICADO

Pista Secreta

Recuerda este símbolo:

🦊

Lo necesitarás durante la misión.`);

}

});