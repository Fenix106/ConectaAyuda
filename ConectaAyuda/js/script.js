// IMPORTANTE: reemplaza este número por el WhatsApp real del asilo.
// Formato internacional: 51 + número, sin +, espacios ni guiones.
const NUMERO_WHATSAPP = "519XXXXXXXX";

const mensajes = {
  general: "¡Hola! Vi la página Conecta Ayuda y quisiera recibir más información sobre la Casa de Reposo Mis Tatas.",
  donar: "¡Hola! Vi la página Conecta Ayuda y quisiera colaborar con la Casa de Reposo Mis Tatas mediante la donación de víveres. ¿Podrían indicarme qué productos necesitan y cómo puedo realizar la entrega?",
  voluntario: "¡Hola! Estoy interesado(a) en ser voluntario(a) en la Casa de Reposo Mis Tatas. ¿Podrían brindarme información sobre los horarios y las actividades en las que puedo apoyar?",
  comunitario: "¡Hola! Me gustaría realizar servicio comunitario en la Casa de Reposo Mis Tatas. ¿Podrían indicarme qué actividades de apoyo necesitan y cómo puedo coordinar mi participación?",
  certificados: "¡Hola! Quisiera recibir información sobre las prácticas para estudiantes de medicina y los certificados que brinda la Casa de Reposo Mis Tatas."
};

function abrirWhatsApp(tipo) {
  if (NUMERO_WHATSAPP.includes("X")) {
    alert("Primero configura el número de WhatsApp del asilo en el archivo js/script.js.");
    return;
  }
  const texto = encodeURIComponent(mensajes[tipo] || mensajes.general);
  const url = `https://wa.me/${NUMERO_WHATSAPP}?text=${texto}`;
  window.open(url, "_blank", "noopener,noreferrer");
}

document.querySelectorAll("[data-whatsapp]").forEach((elemento) => {
  elemento.addEventListener("click", (evento) => {
    evento.preventDefault();
    abrirWhatsApp(elemento.dataset.whatsapp);
  });
});

// Menú adaptable para celulares.
const menuToggle = document.getElementById("menuToggle");
const navegacion = document.getElementById("navegacion");
menuToggle.addEventListener("click", () => {
  const abierto = navegacion.classList.toggle("visible");
  menuToggle.setAttribute("aria-expanded", String(abierto));
});
navegacion.querySelectorAll("a").forEach((enlace) => {
  enlace.addEventListener("click", () => navegacion.classList.remove("visible"));
});

// Chatbot básico de preguntas frecuentes. No utiliza inteligencia artificial externa.
const chatVentana = document.getElementById("chatVentana");
const chatMensajes = document.getElementById("chatMensajes");
const chatInput = document.getElementById("chatInput");

function abrirChat() {
  chatVentana.classList.add("abierto");
  chatVentana.setAttribute("aria-hidden", "false");
  chatInput.focus();
}
function cerrarChat() {
  chatVentana.classList.remove("abierto");
  chatVentana.setAttribute("aria-hidden", "true");
}
document.getElementById("abrirChat").addEventListener("click", abrirChat);
document.getElementById("chatFlotante").addEventListener("click", abrirChat);
document.getElementById("cerrarChat").addEventListener("click", cerrarChat);

function agregarMensaje(texto, tipo) {
  const burbuja = document.createElement("div");
  burbuja.className = `mensaje ${tipo}`;
  burbuja.textContent = texto;
  chatMensajes.appendChild(burbuja);
  chatMensajes.scrollTop = chatMensajes.scrollHeight;
}

function responder(pregunta) {
  const texto = pregunta.toLowerCase();
  let respuesta = "Gracias por tu interés. Para recibir información precisa, puedes comunicarte directamente con el asilo mediante el botón de WhatsApp.";
  if (texto.includes("don") || texto.includes("víver") || texto.includes("alimento")) {
    respuesta = "¡Gracias por querer ayudar! Puedes donar víveres y productos de primera necesidad. Pulsa el botón “Donar víveres” para consultar qué productos se necesitan y coordinar la entrega.";
  } else if (texto.includes("volunt") || texto.includes("ayudar") || texto.includes("visita")) {
    respuesta = "¡Qué bueno que quieras colaborar! Puedes apoyar compartiendo tu tiempo y talento. Pulsa “Ser voluntario” para consultar horarios y actividades disponibles.";
  } else if (texto.includes("comunit") || texto.includes("servicio")) {
    respuesta = "Puedes consultar las actividades disponibles para realizar servicio comunitario. Pulsa el botón “Servicio comunitario” para coordinar con el asilo.";
  } else if (texto.includes("certif") || texto.includes("medicina") || texto.includes("práctica") || texto.includes("practica")) {
    respuesta = "La Casa de Reposo Mis Tatas brinda información sobre prácticas para estudiantes de medicina y certificados. Pulsa “Solicitar información” en la sección de certificados para consultar los requisitos y condiciones.";
  } else if (texto.includes("horario") || texto.includes("ubic") || texto.includes("direc")) {
    respuesta = "Para confirmar horarios de visita y ubicación, comunícate con el asilo mediante el botón de WhatsApp.";
  }
  setTimeout(() => agregarMensaje(respuesta, "bot"), 350);
}

document.getElementById("chatForm").addEventListener("submit", (evento) => {
  evento.preventDefault();
  const pregunta = chatInput.value.trim();
  if (!pregunta) return;
  agregarMensaje(pregunta, "usuario");
  chatInput.value = "";
  responder(pregunta);
});

document.querySelectorAll("[data-pregunta]").forEach((boton) => {
  boton.addEventListener("click", () => {
    const tema = boton.dataset.pregunta;
    const preguntas = {
      donaciones: "¿Cómo puedo donar víveres?",
      voluntariado: "Quiero ser voluntario",
      certificados: "Quisiera información sobre certificados para estudiantes de medicina"
    };
    agregarMensaje(preguntas[tema], "usuario");
    responder(preguntas[tema]);
  });
});
