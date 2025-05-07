let horas = document.getElementById('horas');
let minutos = document.getElementById('minutos');
let segundos = document.getElementById('segundos');
let countstate = false;



let opacointerval = null;
function spanAnimation(stateopaco = false) {
    const spans = document.getElementsByClassName("span");
    let opaco = true;

    if (stateopaco && opacointerval === null) {
        opacointerval = setInterval(() => {
            for (let i = 0; i < spans.length; i += 1) {
                spans[i].style.opacity = opaco ? "1" : "0.3";
            }
            opaco = !opaco;
        }, 500);
    } else {
        clearInterval(opacointerval);
        opacointerval = null;
        for (let i = 0; i < spans.length; i += 1) {
            spans[i].style.opacity = "1";
        }
    }
}


let interval = null;
document.getElementById("button-iniciar").addEventListener("click", function() {
    let h = parseInt(horas.innerText) || 0;
    let m = parseInt(minutos.innerText) || 0;
    let s = parseInt(segundos.innerText) || 0;
    
    totalsegundos = h * 3600 + m * 60 + s;

    if (countstate || (totalsegundos <= 0)) {
        console.log('teste')
        return;
    }

    countstate = true;
    spanAnimation(false);

    horas.contentEditable = "false";
    minutos.contentEditable = "false";
    segundos.contentEditable = "false";
    
    iniciarContagem(totalsegundos);

    function iniciarContagem(totalsegundos) {
        interval = setInterval(() => {
            if (totalsegundos <= 0 || interval <= 0) {
                clearInterval(interval);
                return;
            }

            totalsegundos = totalsegundos - 1

            h = Math.floor(totalsegundos / 3600);
            m = Math.floor((totalsegundos % 3600) / 60);
            s = totalsegundos % 60;

            horas.innerText = String(h).padStart(2, "0");
            minutos.innerText = String(m).padStart(2, "0");
            segundos.innerText = String(s).padStart(2, "0");

        }, 1000);
    }
});


document.getElementById("button-parar").addEventListener("click", function() {
    if (!countstate) {
        return;
    }
    countstate = false
    clearInterval(interval)
});



document.getElementById("button-reiniciar").addEventListener("click", function() {
    countstate = false;
    clearInterval(interval);
    horas.innerText = "00";
    minutos.innerText = "00";
    segundos.innerText = "00";
});


let inputsJaTemEventos = false;
document.getElementById("button-editar").addEventListener("click", function() {

    if (countstate) {
        return;
    }

    spanAnimation(true);

    horas.contentEditable = "true";
    minutos.contentEditable = "true";
    segundos.contentEditable = "true";

    function validarEntrada(event, element, limite) {
        
        let limiteatual = element.innerText.length;

        if (!(event.key >= "0" && event.key <= "9") && event.key !== "Backspace") {
            event.preventDefault();
            return;
        }
        
        if (limiteatual >= limite && event.key !== "Backspace") {
            event.preventDefault();
            return;
        }

        setTimeout(() => {
            const valor = Number(element.innerText);
            if (valor > 60) {
                element.innerText = "60";
            }
        }, 0);
    }
    if (!inputsJaTemEventos) {
        horas.addEventListener("keydown", function(event) {
            validarEntrada(event, horas, 3);
        });
    
        minutos.addEventListener("keydown", function(event) {
            validarEntrada(event, minutos, 2);
        });
    
        segundos.addEventListener("keydown", function(event) {
            validarEntrada(event, segundos, 2);
        });

        inputsJaTemEventos = true;
    }
});