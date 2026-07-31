/* ===================================================
   OPERACIÓN ENIGMA 12
   app.js
=================================================== */

const screens = document.querySelectorAll(".screen");

function show(id){
    screens.forEach(s=>s.classList.remove("active"));
    document.getElementById(id).classList.add("active");
}

/* ============================
   EFECTOS DE SONIDO
============================ */

function sound(id){

    const audio=document.getElementById(id);

    if(!audio) return;

    audio.currentTime=0;

    audio.play().catch(()=>{});

}

/* ============================
   ARRANQUE
============================ */

const progress=document.getElementById("progress");
const status=document.getElementById("status");

const messages=[

"Inicializando sistema...",
"Conectando servidores...",
"Buscando agentes...",
"Descifrando archivos...",
"Acceso autorizado..."

];

let percent=0;
let message=0;

const boot=setInterval(()=>{

    percent++;

    progress.style.width=percent+"%";

    if(percent%20===0){

        status.innerHTML=messages[message];

        if(message<messages.length-1){

            message++;

        }

    }

    if(percent>=100){

        clearInterval(boot);

        status.innerHTML="ACCESS GRANTED";

        setTimeout(()=>{

            show("agent");

        },900);

    }

},35);

/* ============================
   ESCÁNER
============================ */

document.getElementById("music").play().catch(()=>{});

document
.getElementById("scanBtn")
.onclick=()=>{

    sound("click");

    if(navigator.vibrate){

        navigator.vibrate([150,60,150]);

    }

    setTimeout(()=>{

        show("terminal");

        terminal();

    },700);

};

/* ============================
   TERMINAL
============================ */

const script=`

████████████████████████

IDENTIDAD VERIFICADA

████████████████████████

Agente seleccionada...

Buscando expediente...

Nombre........ MARIFÉ

Edad.......... 12 años

Estado........ ACTIVA

Nivel......... OMEGA

--------------------------------

OBJETIVO

Aceptar una misión ultrasecreta.

Resolver enigmas.

Llegar al punto de encuentro.

Buena suerte, Agente.

`;

let i=0;

function terminal(){

const text=`

██████████████████████████████

SISTEMA OMEGA

██████████████████████████████

> Verificando acceso...

✔ OK

> Buscando expediente...

✔ ENCONTRADO

--------------------------------

NOMBRE:

MARIFÉ

--------------------------------

EDAD:

12 AÑOS

--------------------------------

CLASIFICACIÓN:

AGENTE ESPECIAL

--------------------------------

MISIÓN:

Has sido seleccionada para participar en una operación ultrasecreta.

Tu objetivo será recuperar el Cristal del Tiempo antes de que el reloj llegue a cero.

¿Estás preparada?

`;

let i=0;

const consoleBox=document.getElementById("console");

consoleBox.innerHTML="";

sound("typing");

const timer=setInterval(()=>{

consoleBox.innerHTML+=text.charAt(i);

consoleBox.scrollTop=consoleBox.scrollHeight;

i++;

if(i>=text.length){

clearInterval(timer);

document.getElementById("typing").pause();

glitch();

document.getElementById("continueBtn").style.display="inline-block";

}

},18);

}
/* ============================
   CONTINUAR
============================ */

document
.getElementById("continueBtn")
.onclick=()=>{

    sound("click");

    show("challenge");

};

/* ============================
   RETO
============================ */

document
.getElementById("check")
.onclick=()=>{

    const answer=document
    .getElementById("answer")
    .value
    .trim()
    .toUpperCase();

    if(answer==="ESCAPE"){

        sound("unlock");

        document
        .getElementById("result")
        .innerHTML="✔ Acceso concedido";

        setTimeout(()=>{

            show("mission");

            document
            .getElementById("music")
            .play()
            .catch(()=>{});

        },900);

    }else{

        document
        .getElementById("result")
        .innerHTML="❌ Clave incorrecta";

        shake();

    }

};

/* ============================
   ACEPTAR MISIÓN
============================ */

document
.getElementById("accept")
.onclick=()=>{

    sound("unlock");

    show("accepted");

    confetti();

    countdown();

};

/* ============================
   CUENTA REGRESIVA
============================ */

function countdown(){

const eventDate=new Date("2026-08-22T15:00:00");

const counter=document.getElementById("count");

setInterval(()=>{

const diff=eventDate-new Date();

if(diff<=0){

counter.innerHTML="🎉";

return;

}

const d=Math.floor(diff/86400000);

const h=Math.floor(diff%86400000/3600000);

const m=Math.floor(diff%3600000/60000);

counter.innerHTML=

`${d}d ${h}h ${m}m`;

},1000);

}

/* ============================
   EFECTO ERROR
============================ */

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

}

/* ============================
   CONFETI
============================ */

function confetti(){

for(let i=0;i<220;i++){

const p=document.createElement("div");

p.className="confetti";

p.style.left=Math.random()*100+"vw";

p.style.background=

`hsl(${Math.random()*360},100%,60%)`;

p.style.animationDuration=

2+Math.random()*2+"s";

document.body.appendChild(p);

setTimeout(()=>p.remove(),5000);

}

}/* ============================
   MODO SECRETO
============================ */

let taps=0;

document.querySelector(".logo").onclick=()=>{

    taps++;

    if(taps==5){

        alert(`🔒 ARCHIVO CLASIFICADO

Pista para la misión:

La palabra "ZAFIRO"
te servirá durante el Escape Room.

🤫 ¡No se la digas a nadie!`);

    }

}

function glitch(){

document.body.animate([

{

filter:"brightness(1)"

},

{

filter:"brightness(3)"

},

{

filter:"brightness(.5)"

},

{

filter:"brightness(1)"

}

],{

duration:250

});

}

document.getElementById("mapButton").onclick=()=>{

window.open(

"https://maps.google.com/?q=Jr.+Manuel+Arrisueño+637+Santa+Catalina+La+Victoria",

"_blank"

);

};

document.getElementById("locate").onclick=()=>{

window.open(
"https://www.google.com/maps/search/?api=1&query=-12.0876859,-77.0192969",
"_blank"
);

}

document.getElementById("continueMission").onclick=()=>{

show("invite");

}

let agentName = "";

document.getElementById("createAgent").onclick = () => {

    const input = document.getElementById("agentName");

    if (input.value.trim() === "") {

        alert("Escribe tu nombre para continuar.");

        return;

    }

    agentName = input.value.trim();

    document.getElementById("credentialName").innerHTML =

        "AGENTE " + agentName.toUpperCase();

    const id = Math.floor(Math.random()*9000)+1000;

    document.getElementById("credentialCode").innerHTML =

        "A-" + id;

    show("credential");

}

document.getElementById("continueCredential").onclick = () => {

    show("scanner");

}