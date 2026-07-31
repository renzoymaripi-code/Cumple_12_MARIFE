"use strict";

/* =========================================================
   OPERACIÓN ENIGMA 12
   Marifé — Escape Room Invitation
   app.js
========================================================= */


/* =========================================================
   CONFIGURACIÓN
========================================================= */

const CONFIG = {
    eventDate: new Date("2026-08-22T15:00:00-05:00"),

    latitude: -12.0876859,
    longitude: -77.0192969,

    birthdayName: "Marifé",

    correctAnswer1: "ESCAPE",
    correctAnswer2: "AGOSTO"
};


/* =========================================================
   ELEMENTOS PRINCIPALES
========================================================= */

const screens = document.querySelectorAll(".screen");

let currentScreen = "screen-intro";
let countdownInterval = null;
let radarRunning = false;


/* =========================================================
   CAMBIO DE PANTALLA
========================================================= */

function showScreen(id) {

    const target = document.getElementById(id);

    if (!target) {
        console.error(`No existe la pantalla: ${id}`);
        return;
    }

    screens.forEach(screen => {
        screen.classList.remove("active");
    });

    target.classList.add("active");

    currentScreen = id;

    document.body.classList.toggle(
        "flashlight-active",
        id === "screen-riddle1"
    );

    document.body.classList.toggle(
        "flashlight-active",
        id === "screen-riddle1"
    );

    window.scrollTo({
        top: 0,
        behavior: "instant"
    });
}


/* =========================================================
   EFECTO DE VIBRACIÓN
========================================================= */

function vibrate(pattern = 40) {

    if ("vibrate" in navigator) {
        navigator.vibrate(pattern);
    }
}


/* =========================================================
   EFECTO DE ERROR
========================================================= */

function showError(element, message) {

    if (!element) return;

	soundError();

    element.textContent = message;

    vibrate([80, 50, 80]);

    const container =
        element.closest(".paper") ||
        element.closest(".agent-registration");

    if (container) {

        container.classList.remove("shake");

        void container.offsetWidth;

        container.classList.add("shake");

    }
}


/* =========================================================
   EFECTO DE ÉXITO
========================================================= */

function successEffect() {

	soundSuccess();

    vibrate([50, 40, 100]);

    document.body.classList.remove("flash-success");

    void document.body.offsetWidth;

    document.body.classList.add("flash-success");

}


/* =========================================================
   NORMALIZAR RESPUESTAS
========================================================= */

function normalize(text) {

    return text
        .trim()
        .toUpperCase()
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "");

}


/* =========================================================
   1. ABRIR EXPEDIENTE
========================================================= */

const btnOpenFile =
    document.getElementById("btnOpenFile");

btnOpenFile.addEventListener("click", () => {

    vibrate(35);

    showScreen("screen-briefing");

});


/* =========================================================
   2. ACEPTAR MISIÓN
========================================================= */

const btnMission =
    document.getElementById("btnMission");

btnMission.addEventListener("click", () => {

    vibrate(35);

    showScreen("screen-riddle1");

});


/* =========================================================
   3. PRIMER ACERTIJO
========================================================= */

const answer1 =
    document.getElementById("answer1");

const btnAnswer1 =
    document.getElementById("btnAnswer1");

const error1 =
    document.getElementById("error1");


function verifyRiddle1() {

    const answer =
        normalize(answer1.value);

    if (answer === CONFIG.correctAnswer1) {

        error1.textContent =
            "✓ CLAVE CORRECTA";

        error1.style.color =
            "#4d6c4d";

        successEffect();

        setTimeout(() => {

            error1.textContent = "";

            showScreen("screen-riddle2");

        }, 700);

    } else {

        error1.style.color =
            "#9d1c1c";

        showError(
            error1,
            "CLAVE INCORRECTA. REVISA LA PALABRA."
        );

    }
}


btnAnswer1.addEventListener(
    "click",
    verifyRiddle1
);


answer1.addEventListener(
    "keydown",
    event => {

        if (event.key === "Enter") {
            verifyRiddle1();
        }

    }
);


/* =========================================================
   4. SEGUNDO ACERTIJO
========================================================= */

const answer2 =
    document.getElementById("answer2");

const btnAnswer2 =
    document.getElementById("btnAnswer2");

const error2 =
    document.getElementById("error2");


function verifyRiddle2() {

    const answer =
        normalize(answer2.value);

    if (answer === CONFIG.correctAnswer2) {

        error2.textContent =
            "✓ CÓDIGO DESCIFRADO";

        error2.style.color =
            "#4d6c4d";

        successEffect();

        setTimeout(() => {

            error2.textContent = "";

            showScreen("screen-unlocked");

        }, 700);

    } else {

        error2.style.color =
            "#9d1c1c";

        showError(
            error2,
            "RESPUESTA INCORRECTA. OBSERVA EL NÚMERO 08."
        );

    }
}


btnAnswer2.addEventListener(
    "click",
    verifyRiddle2
);


answer2.addEventListener(
    "keydown",
    event => {

        if (event.key === "Enter") {
            verifyRiddle2();
        }

    }
);


/* =========================================================
   5. REVELAR UBICACIÓN
========================================================= */

const btnRevealLocation =
    document.getElementById("btnRevealLocation");


btnRevealLocation.addEventListener(
    "click",
    () => {

        successEffect();

        showScreen("screen-radar");

        startRadar();

    }
);


/* =========================================================
   6. RADAR
========================================================= */

function startRadar() {

    if (radarRunning) return;

    radarRunning = true;

    const progress =
        document.getElementById("radarProgress");

    const status =
        document.getElementById("radarStatus");

    let percentage = 0;

    const messages = [
        "ANALIZANDO COORDENADAS...",
        "RASTREANDO SEÑAL...",
        "COMPARANDO UBICACIONES...",
        "SEÑAL DETECTADA...",
        "OBJETIVO LOCALIZADO."
    ];


    progress.style.width = "0%";


    const radarTimer =
        setInterval(() => {

            percentage += 1;

	    if (
  		percentage === 25 ||
    		percentage === 50 ||
    		percentage === 75 ||
    		percentage === 95
	     ) {
    		radarBeep();
	     }

            progress.style.width =
                `${percentage}%`;


            if (percentage < 25) {

                status.textContent =
                    messages[0];

            } else if (percentage < 50) {

                status.textContent =
                    messages[1];

            } else if (percentage < 75) {

                status.textContent =
                    messages[2];

            } else if (percentage < 95) {

                status.textContent =
                    messages[3];

            } else {

                status.textContent =
                    messages[4];

            }


            if (percentage >= 100) {

                clearInterval(radarTimer);

                successEffect();

                setTimeout(() => {

                    radarRunning = false;

                    showScreen("screen-map");

                }, 850);

            }

        }, 35);

}


/* =========================================================
   7. GOOGLE MAPS
========================================================= */

function openGoogleMaps() {

    const {
        latitude,
        longitude
    } = CONFIG;


    /*
       Este formato funciona tanto en navegador
       como en Android/iPhone.

       Si Google Maps está instalado, el sistema
       normalmente ofrecerá abrir la aplicación.
    */

    const mapsURL =
        "https://www.google.com/maps/search/" +
        "?api=1" +
        `&query=${latitude},${longitude}`;


    window.location.href = mapsURL;

}


const btnMaps =
    document.getElementById("btnMaps");

const btnFinalMaps =
    document.getElementById("btnFinalMaps");


btnMaps.addEventListener(
    "click",
    openGoogleMaps
);


btnFinalMaps.addEventListener(
    "click",
    openGoogleMaps
);


/* =========================================================
   8. REVELAR INVITACIÓN
========================================================= */

const btnRevealInvitation =
    document.getElementById(
        "btnRevealInvitation"
    );


btnRevealInvitation.addEventListener(
    "click",
    () => {

        successEffect();

        showScreen(
            "screen-invitation"
        );

    }
);


/* =========================================================
   9. ACEPTAR INVITACIÓN
========================================================= */

const btnAccept =
    document.getElementById("btnAccept");


btnAccept.addEventListener(
    "click",
    () => {

        successEffect();

        showScreen(
            "screen-agent"
        );


        /*
           Esperamos un poco para que aparezca
           el teclado del celular de forma natural.
        */

        setTimeout(() => {

            const input =
                document.getElementById(
                    "agentName"
                );

            if (input) {
                input.focus();
            }

        }, 600);

    }
);


/* =========================================================
   10. REGISTRO DE AGENTE
========================================================= */

const agentName =
    document.getElementById("agentName");

const btnRegisterAgent =
    document.getElementById(
        "btnRegisterAgent"
    );

const agentError =
    document.getElementById(
        "agentError"
    );


function registerAgent() {

    const name =
        agentName.value.trim();


    if (name.length < 2) {

        showError(
            agentError,
            "ESCRIBE TU NOMBRE PARA CONTINUAR."
        );

        return;

    }


    agentError.textContent = "";


    /*
       Guardamos el nombre únicamente
       en el navegador del dispositivo.
    */

    try {

        localStorage.setItem(
            "m12_agent_name",
            name
        );

    } catch (error) {

        console.warn(
            "No se pudo usar localStorage.",
            error
        );

    }


    createAgentCredential(name);

    successEffect();

    showScreen("screen-final");

    confetti();

    missionCompleteSound();

    startCountdown();

}


btnRegisterAgent.addEventListener(
    "click",
    registerAgent
);


agentName.addEventListener(
    "keydown",
    event => {

        if (event.key === "Enter") {

            registerAgent();

        }

    }
);


/* =========================================================
   11. CREAR CREDENCIAL
========================================================= */

function createAgentCredential(name) {

    const finalName =
        document.getElementById(
            "finalAgentName"
        );

    const finalCode =
        document.getElementById(
            "finalAgentCode"
        );


    finalName.textContent =
        name.toUpperCase();


    /*
       Creamos un código de 4 cifras.
    */

    const number =
        Math.floor(
            1000 + Math.random() * 9000
        );


    const code =
        `M12-${number}`;


    finalCode.textContent =
        code;


    try {

        localStorage.setItem(
            "m12_agent_code",
            code
        );

    } catch (error) {

        console.warn(
            "No se pudo guardar el código.",
            error
        );

    }

}


/* =========================================================
   12. CONFETI
========================================================= */

function confetti() {

    const total = 90;


    for (
        let i = 0;
        i < total;
        i++
    ) {

        const piece =
            document.createElement("div");


        piece.className =
            "confetti";


        piece.style.left =
            `${Math.random() * 100}vw`;


        /*
           Usamos colores sobrios,
           manteniendo la estética
           del expediente.
        */

        const colors = [
            "#9d1c1c",
            "#d8cfb8",
            "#4d6c4d",
            "#ffffff"
        ];


        piece.style.background =
            colors[
                Math.floor(
                    Math.random() *
                    colors.length
                )
            ];


        piece.style.animationDuration =
            `${2.5 + Math.random() * 2}s`;


        piece.style.animationDelay =
            `${Math.random() * .8}s`;


        document.body.appendChild(
            piece
        );


        setTimeout(() => {

            piece.remove();

        }, 5200);

    }

}


/* =========================================================
   13. CUENTA REGRESIVA
========================================================= */

function startCountdown() {

    if (countdownInterval) {

        clearInterval(
            countdownInterval
        );

    }


    updateCountdown();


    countdownInterval =
        setInterval(
            updateCountdown,
            1000
        );

}


function updateCountdown() {

    const now =
        new Date();


    const difference =
        CONFIG.eventDate.getTime() -
        now.getTime();


    const days =
        document.getElementById("days");

    const hours =
        document.getElementById("hours");

    const minutes =
        document.getElementById("minutes");

    const seconds =
        document.getElementById("seconds");


    /*
       Si ya llegó la fecha.
    */

    if (difference <= 0) {

        days.textContent = "00";
        hours.textContent = "00";
        minutes.textContent = "00";
        seconds.textContent = "00";


        if (countdownInterval) {

            clearInterval(
                countdownInterval
            );

        }

        return;

    }


    const dayValue =
        Math.floor(
            difference /
            (1000 * 60 * 60 * 24)
        );


    const hourValue =
        Math.floor(
            (
                difference %
                (1000 * 60 * 60 * 24)
            ) /
            (1000 * 60 * 60)
        );


    const minuteValue =
        Math.floor(
            (
                difference %
                (1000 * 60 * 60)
            ) /
            (1000 * 60)
        );


    const secondValue =
        Math.floor(
            (
                difference %
                (1000 * 60)
            ) /
            1000
        );


    days.textContent =
        String(dayValue).padStart(2, "0");


    hours.textContent =
        String(hourValue).padStart(2, "0");


    minutes.textContent =
        String(minuteValue).padStart(2, "0");


    seconds.textContent =
        String(secondValue).padStart(2, "0");

}


/* =========================================================
   14. REINICIAR MISIÓN
========================================================= */

const btnRestart =
    document.getElementById(
        "btnRestart"
    );


btnRestart.addEventListener(
    "click",
    () => {

        if (countdownInterval) {

            clearInterval(
                countdownInterval
            );

        }


        answer1.value = "";
        answer2.value = "";
        agentName.value = "";

        error1.textContent = "";
        error2.textContent = "";
        agentError.textContent = "";


        const radarProgress =
            document.getElementById(
                "radarProgress"
            );

        radarProgress.style.width =
            "0%";


        document.getElementById(
            "radarStatus"
        ).textContent =
            "ANALIZANDO COORDENADAS...";


        showScreen(
            "screen-intro"
        );

    }
);


/* =========================================================
   15. RESTAURAR AGENTE GUARDADA
========================================================= */

function restoreAgent() {

    try {

        const savedName =
            localStorage.getItem(
                "m12_agent_name"
            );


        const savedCode =
            localStorage.getItem(
                "m12_agent_code"
            );


        if (savedName) {

            agentName.value =
                savedName;

        }


        /*
           No saltamos automáticamente
           ninguna pantalla.

           Solo conservamos el nombre
           para cuando vuelva a completar
           la misión.
        */

        if (
            savedName &&
            savedCode
        ) {

            console.log(
                "Agente reconocida:",
                savedName
            );

        }

    } catch (error) {

        console.warn(
            "No se pudo recuperar la agente.",
            error
        );

    }

}


/* =========================================================
   16. PREVENIR DOBLE TOQUE / ZOOM ACCIDENTAL EN BOTONES
========================================================= */

document
    .querySelectorAll("button")
    .forEach(button => {

        button.addEventListener(
            "touchend",
            () => {},
            {
                passive: true
            }
        );

    });


/* =========================================================
   17. INICIALIZACIÓN
========================================================= */

function init() {

    restoreAgent();

    showScreen(
        "screen-intro"
    );


    console.log(
        "OPERACIÓN ENIGMA 12 — SISTEMA INICIADO"
    );

}


document.addEventListener(
    "DOMContentLoaded",
    init
);

/* =========================================================
   18. SISTEMA DE AUDIO
   No necesita archivos MP3
========================================================= */

let audioContext = null;
let masterVolume = 0.22;
let audioEnabled = false;

function initAudio() {

    if (audioEnabled) return;

    try {

        audioContext = new (
            window.AudioContext ||
            window.webkitAudioContext
        )();

        audioEnabled = true;

    } catch (error) {

        console.warn(
            "Audio no disponible.",
            error
        );

    }

}


/* ---------------------------------------------------------
   TONO
--------------------------------------------------------- */

function playTone(
    frequency = 440,
    duration = 0.1,
    type = "sine",
    volume = masterVolume
) {

    if (!audioEnabled || !audioContext) return;

    const oscillator =
        audioContext.createOscillator();

    const gain =
        audioContext.createGain();


    oscillator.type = type;

    oscillator.frequency.setValueAtTime(
        frequency,
        audioContext.currentTime
    );


    gain.gain.setValueAtTime(
        volume,
        audioContext.currentTime
    );


    gain.gain.exponentialRampToValueAtTime(
        0.001,
        audioContext.currentTime + duration
    );


    oscillator.connect(gain);

    gain.connect(
        audioContext.destination
    );


    oscillator.start();

    oscillator.stop(
        audioContext.currentTime +
        duration
    );

}


/* ---------------------------------------------------------
   CLIC
--------------------------------------------------------- */

function soundClick() {

    playTone(
        260,
        0.05,
        "square",
        0.07
    );

}


/* ---------------------------------------------------------
   ERROR
--------------------------------------------------------- */

function soundError() {

    playTone(
        170,
        0.18,
        "sawtooth",
        0.12
    );

    setTimeout(() => {

        playTone(
            120,
            0.25,
            "sawtooth",
            0.1
        );

    }, 120);

}


/* ---------------------------------------------------------
   ACCESO CORRECTO
--------------------------------------------------------- */

function soundSuccess() {

    playTone(
        440,
        0.12,
        "sine",
        0.1
    );

    setTimeout(() => {

        playTone(
            660,
            0.14,
            "sine",
            0.1
        );

    }, 110);

    setTimeout(() => {

        playTone(
            880,
            0.25,
            "sine",
            0.08
        );

    }, 220);

}


/* ---------------------------------------------------------
   RADAR
--------------------------------------------------------- */

function radarBeep() {

    playTone(
        980,
        0.05,
        "sine",
        0.045
    );

}


/* ---------------------------------------------------------
   MISIÓN COMPLETADA
--------------------------------------------------------- */

function missionCompleteSound() {

    const notes = [
        392,
        523,
        659,
        784
    ];

    notes.forEach(
        (note, index) => {

            setTimeout(() => {

                playTone(
                    note,
                    0.35,
                    "sine",
                    0.09
                );

            }, index * 150);

        }
    );

}


/* ---------------------------------------------------------
   ACTIVAR AUDIO CON PRIMER TOQUE
--------------------------------------------------------- */

document.addEventListener(
    "pointerdown",
    () => {

        initAudio();

        if (
            audioContext &&
            audioContext.state === "suspended"
        ) {

            audioContext.resume();

        }

    },
    {
        once: true
    }
);


/* ---------------------------------------------------------
   SONIDO GENERAL DE BOTONES
--------------------------------------------------------- */

document
    .querySelectorAll("button")
    .forEach(button => {

        button.addEventListener(
            "click",
            soundClick
        );

    });

/* =========================================================
   19. LINTERNA INTERACTIVA
========================================================= */

const flashlight = document.getElementById("flashlight");

function updateFlashlight(x, y) {

    if (!flashlight) return;

    flashlight.style.setProperty(
        "--flash-x",
        `${x}px`
    );

    flashlight.style.setProperty(
        "--flash-y",
        `${y}px`
    );
}


/* MOVER MOUSE / DEDO / LÁPIZ */

document.addEventListener(
    "pointermove",
    event => {

        if (currentScreen !== "screen-riddle1") {
            return;
        }

        updateFlashlight(
            event.clientX,
            event.clientY
        );

    },
    {
        passive: true
    }
);


/* PRIMER TOQUE */

document.addEventListener(
    "pointerdown",
    event => {

        if (currentScreen !== "screen-riddle1") {
            return;
        }

        updateFlashlight(
            event.clientX,
            event.clientY
        );

    },
    {
        passive: true
    }
);