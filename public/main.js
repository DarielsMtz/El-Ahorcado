// Array de palabras
const palabras = [
  ["amazonas", "Un río"],
  ["telescopio", "Para mirar las estrellas"],
  ["jacaranda", "Un árbol con flores violetas"],
  ["mercado", "Lugar de intercambio"],
  ["bicicleta", "Tiene pedales"],
  ["manzana", "Una fruta"],
  ["ajedrez", "Un juego de estrategia"],
  ["manglar", "Un ecosistema costero"],
  ["trueno", "Sigue al relámpago"],
  ["camello", "Animal del desierto"],
  ["andorra", "Un país pequeño"],
  ["paraguay", "Un país sudamericano"],
  ["esbozo", "Un dibujo inicial"],
  ["senderismo", "Caminar por la naturaleza"],
  ["croqueta", "De la freidora"],
  ["tarta", "Se sirve en cumpleaños"],
  ["universidad", "Lugar para aprender"],
  ["maratón", "Una carrera larga"],
  ["miel", "Producida por abejas"],
];

let palabra = ""; // Palabra a adivinar
let rand; // Número aleatorio
let oculta = []; // Palabra oculta
let cont = 6; // Contador de intentos

const hueco = document.getElementById("palabra"); // Div donde se escribe la palabra
const btnInicio = document.getElementById("reset"); // Botón de inicio
const intentosElement = document.getElementById("intentos"); // Intentos restantes
const abcdario = document.getElementById("abcdario"); // Abecedario
const msgFinal = document.getElementById("msg-final"); // Mensaje final
const aciertoMsg = document.getElementById("acierto"); // Mensaje de acierto o fallo
const pistaElement = document.getElementById("hueco-pista"); // Pista

// ### FUNCIONES ###

// Escoger palabra al azar
function generaPalabra() {
  rand = Math.floor(Math.random() * palabras.length);
  palabra = palabras[rand][0].toUpperCase();
}

// Pintar guiones de la palabra
function pintarGuiones() {
  oculta = Array(palabra.length).fill("_");
  hueco.textContent = oculta.join(" ");
}

// Generar abecedario
function generaABC(a, z) {
  abcdario.innerHTML = ""; // Limpia el abecedario
  const start = a.charCodeAt(0);
  const end = z.charCodeAt(0);

  for (let i = start; i <= end; i++) {
    const letra = String.fromCharCode(i).toUpperCase();
    crearBotonLetra(letra);
  }
  crearBotonLetra("Ñ");
}

// Crear un botón de letra
function crearBotonLetra(letra) {
  const button = document.createElement("button");
  button.className = "px-4 py-2 text-white bold rounded m-1";
  button.style.backgroundColor = "#a9a9a9";
  button.textContent = letra;
  button.value = letra;
  button.onclick = () => intento(letra);
  button.disabled = false;
  button.id = letra;
  abcdario.appendChild(button);
}

// Comprobar intento
function intento(letra) {
  document.getElementById(letra).disabled = true;

  if (palabra.includes(letra)) {
    palabra.split("").forEach((char, index) => {
      if (char === letra) oculta[index] = letra;
    });
    hueco.textContent = oculta.join(" ");
    mostrarMensaje("Bien!", "text-green-600");
  } else {
    cont--;
    intentosElement.textContent = cont;
    const imageElement = document.getElementById(`image${cont}`);
    imageElement.classList.add("fade-in", "block");
    imageElement.classList.remove("hidden");

    mostrarMensaje("Fallo!", "text-red-600");
  }
  compruebaFin();
}

// Mostrar mensaje de acierto o fallo
function mostrarMensaje(texto, clase) {
  aciertoMsg.textContent = texto;
  aciertoMsg.className = `${clase} font-bold text-lg `;

  setTimeout(() => {
    aciertoMsg.textContent = "";
  }, 1500);
}

// Obtener pista
function pista() {
  pistaElement.textContent = palabras[rand][1];
}

// Comprobar si el juego ha finalizado
function compruebaFin() {
  if (!oculta.includes("_")) {
    finalizarJuego("Felicidades, ¡Has ganado! :D", true);
  } else if (cont === 0) {
    finalizarJuego("Game Over :(", false);
  }
}

// Finalizar el juego
function finalizarJuego(mensaje, ganado) {
  msgFinal.textContent = mensaje;
  msgFinal.className = "text-3xl font-bold mt-4";
  hueco.classList.add("encuadre");
  ganado
    ? (msgFinal.className += " text-green-600")
    : (msgFinal.className += " text-red-600");
  deshabilitarBotones();

  btnInicio.textContent = "Reiniciar";
  btnInicio.onclick = () => location.reload();
}

// Deshabilitar todos los botones
function deshabilitarBotones() {
  const buttons = abcdario.querySelectorAll("button");
  buttons.forEach((button) => (button.disabled = true));
}

// Restablecer juego
function inicio() {
  generaPalabra();
  pintarGuiones();
  generaABC("a", "z");
  cont;
  intentosElement.textContent = cont;
  pistaElement.textContent = "";
  msgFinal.textContent = "";
}

window.onload = inicio;
