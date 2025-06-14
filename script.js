let preguntas_aleatorias = true;
let mostrar_pantalla_juego_términado = true;
let reiniciar_puntos_al_reiniciar_el_juego = true;

var videoFight = document.getElementById("videofight");
var videoFine = document.getElementById("videofine");
var videoWin = document.getElementById("videowin");
var videoFail = document.getElementById("videofail");
var videoLose = document.getElementById("videolose");

//boton comenzar
comenzar.addEventListener("click", function(event) {
  document.getElementById("pantalla-inicial").style.display = "none";
  var mediaElem = document.getElementById("videofight");
  mediaElem.load();
  videoFight.play();
  document.getElementById("pantalla-fight").style.display = "block";
  setTimeout(function(){
    document.getElementById("pantalla-panel").style.display = "block";
  }, 6000);
});


const reload1 = document.getElementById("reload1");

reload1.addEventListener('click', _ => {
  location.reload();
  var mediaElem = document.getElementById("videofight");
  mediaElem.pause(); // Pausar el video
  mediaElem = document.getElementById("videofine");
  mediaElem.pause(); // Pausar el video
  mediaElem = document.getElementById("videowin");
  mediaElem.pause(); // Pausar el video
  mediaElem = document.getElementById("videofail");
  mediaElem.pause(); // Pausar el video
  mediaElem = document.getElementById("videolose");
  mediaElem.pause(); // Pausar el video
});

const reload2 = document.getElementById("reload2");

reload2.addEventListener('click', _ => {
  location.reload();
  var mediaElem = document.getElementById("videofight");
  mediaElem.pause(); // Pausar el video
  mediaElem = document.getElementById("videofine");
  mediaElem.pause(); // Pausar el video
  mediaElem = document.getElementById("videowin");
  mediaElem.pause(); // Pausar el video
  mediaElem = document.getElementById("videofail");
  mediaElem.pause(); // Pausar el video
  mediaElem = document.getElementById("videolose");
  mediaElem.pause(); // Pausar el video
});

window.onload = function () {
  eval1 = readText("eval.json");
  interprete_bp = JSON.parse(eval1);
  escogerPreguntaAleatoria();
};

let pregunta;
let posibles_respuestas;
btn_correspondiente = [
  select_id("btn1"),
  select_id("btn2"),
  select_id("btn3"),
  select_id("btn4")
];
let npreguntas = [];

let preguntas_hechas = 0;
let preguntas_correctas = 0;
let preguntas_incorrectas = 0;

function escogerPreguntaAleatoria() {
  let n;
  if (preguntas_aleatorias) {
    n = Math.floor(Math.random() * interprete_bp.length);
  } else {
    n = 0;
  }

  while (npreguntas.includes(n)) {
    n++;
    if (n >= interprete_bp.length) {
      n = 0;
    }
    if (npreguntas.length == interprete_bp.length) {
      //Aquí es donde el juego se reinicia
      if (mostrar_pantalla_juego_términado) {
        swal.fire({
          title: "Juego finalizado",
          icon: "success"
        });
      }
      if (reiniciar_puntos_al_reiniciar_el_juego) {
        preguntas_correctas = 0
        preguntas_hechas = 0
      }
      npreguntas = [];
    }
  }
  npreguntas.push(n);
  preguntas_hechas++;

  escogerPregunta(n);
}


function escogerPregunta(n) {
  pregunta = interprete_bp[n];
  select_id("categoria").innerHTML = pregunta.categoria;
  select_id("pregunta").innerHTML = pregunta.pregunta;
  select_id("numero").innerHTML = n;
  let pc = preguntas_correctas;
  if (preguntas_hechas > 1) {
    select_id("puntaje").innerHTML = pc + "/" + (preguntas_hechas - 1);
  } else {
    select_id("puntaje").innerHTML = "";
  }

  style("imagen").objectFit = pregunta.objectFit;
  desordenarRespuestas(pregunta);
  if (pregunta.imagen) {
    select_id("imagen").setAttribute("src", pregunta.imagen);
    style("imagen").height = "200px";
    style("imagen").width = "100%";
  } else {
    style("imagen").height = "0px";
    style("imagen").width = "0px";
    setTimeout(() => {
      select_id("imagen").setAttribute("src", "");
    }, 500);
  }
}

function desordenarRespuestas(pregunta) {
  posibles_respuestas = [
    pregunta.respuesta,
    pregunta.incorrecta1,
    pregunta.incorrecta2,
    pregunta.incorrecta3,
  ];
  posibles_respuestas.sort(() => Math.random() - 0.5);

  select_id("btn1").innerHTML = posibles_respuestas[0];
  select_id("btn2").innerHTML = posibles_respuestas[1];
  select_id("btn3").innerHTML = posibles_respuestas[2];
  select_id("btn4").innerHTML = posibles_respuestas[3];
}

let suspender_botones = false;

  function oprimir_btn(i) {
  if (suspender_botones) {
    return;
  }
  suspender_botones = true;
  if (posibles_respuestas[i] == pregunta.respuesta) {
    preguntas_correctas++;
    btn_correspondiente[i].style.background = "lightgreen";

    var elem = document.getElementById("myBar1");
    var width = 100;
    var bien = width-(preguntas_correctas*20);
     elem.style.width = bien + '%';
     
     if (bien <= 60 && bien >= 30) {
     elem.style.background = "yellow";
     }

     if (bien <= 20) {
      elem.style.background = "red";
      }
        
    setTimeout(function(){
      document.getElementById("pantalla-fight").style.display = "none";
      document.getElementById("pantalla-panel").style.display = "none";
      var mediaElem = document.getElementById(id="videofine");
    mediaElem.load();
    videoFine.play();
    document.getElementById("pantalla-fine").style.display = "block";
    setTimeout(function(){
      document.getElementById("pantalla-fine").style.display = "none";
      document.getElementById("pantalla-fight").style.display = "block";
    document.getElementById("pantalla-panel").style.display = "block";
    
    if (bien == 0) {
        document.getElementById("pantalla-fight").style.display = "none";
        document.getElementById("pantalla-fine").style.display = "none";
        document.getElementById("pantalla-panel").style.display = "none";
        var mediaElem = document.getElementById(id="videowin");
    mediaElem.load();
    videoWin.play();
        document.getElementById("pantalla-win").style.display = "block";
       
      
      setTimeout(function(){
          document.getElementById("pantalla-victoria").style.display = "block";

        }, 15000);

    }
    }, 6000);
    }, 3000);

    
    
  } else {
    preguntas_incorrectas++;
    btn_correspondiente[i].style.background = "pink";

    var elem = document.getElementById("myBar2");
    var width = 100;
    var mal= width-(preguntas_incorrectas*20);
     elem.style.width = mal + '%';

     if (mal <= 60 && mal>= 30) {
      elem.style.background = "yellow";
      }
 
      if (mal <= 20) {
       elem.style.background = "red";
       }
        
    setTimeout(function(){
      document.getElementById("pantalla-fight").style.display = "none";
      document.getElementById("pantalla-panel").style.display = "none";
      var mediaElem = document.getElementById(id="videofail");
    mediaElem.load();
    videoFail.play();
      document.getElementById("pantalla-fail").style.display = "block";
    setTimeout(function(){
      document.getElementById("pantalla-fail").style.display = "none";
      document.getElementById("pantalla-fight").style.display = "block";
    document.getElementById("pantalla-panel").style.display = "block";
    
    if (mal == 0) {
        document.getElementById("pantalla-fight").style.display = "none";
        document.getElementById("pantalla-fail").style.display = "none";
        document.getElementById("pantalla-panel").style.display = "none";
        var mediaElem = document.getElementById(id="videolose");
    mediaElem.load();
    videoLose.play();
        document.getElementById("pantalla-lose").style.display = "block";
      
      setTimeout(function(){
        document.getElementById("pantalla-derrota").style.display = "block";

      }, 10000);

    }
    }, 6000);
    }, 3000);


    
  }
  for (let j = 0; j < 4; j++) {
    if (posibles_respuestas[j] == pregunta.respuesta) {
      btn_correspondiente[j].style.background = "lightgreen";
      break;
    }
  }
  setTimeout(() => {
    reiniciar();
    suspender_botones = false;
  }, 3000);
}

// let p = prompt("numero")

function reiniciar() {
  for (const btn of btn_correspondiente) {
    btn.style.background = "white";
  }
  escogerPreguntaAleatoria();
}

function select_id(id) {
  return document.getElementById(id);
}

function style(id) {
  return select_id(id).style;
}

function readText(ruta_local) {
  var texto = null;
  var xmlhttp = new XMLHttpRequest();
  xmlhttp.open("GET", ruta_local, false);
  xmlhttp.send();
  if (xmlhttp.status == 200) {
    texto = xmlhttp.responseText;
  }
  return texto;
}

// Verificar si el dispositivo móvil es compatible con la API de Orientación
if (window.DeviceOrientationEvent) {
  // Escuchar el evento de cambio de orientación
  window.addEventListener('orientationchange', function() {
    // Verificar la orientación actual del dispositivo
    if (window.orientation !== 90 && window.orientation !== -90) {
      // Si la orientación no es horizontal, bloquear la rotación
      if (window.screen && window.screen.orientation && window.screen.orientation.lock) {
        window.screen.orientation.lock('landscape').catch(function(error) {
          console.log('No se pudo bloquear la orientación:', error);
        });
      }
    }
  });
}
