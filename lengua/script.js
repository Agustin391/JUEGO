// Variables para controlar el estado del juego
let pistas = [];
let objetos = [];
let escenaActual = "castillo";
let sospechosoActual = "";
let culpable = "Larsan";  // Culpable predeterminado
let pistasCorrectas = ["Pañuelo con sangre", "Carta misteriosa", "Llave del cuarto cerrado", "Guante perdido"];
let pistasFalsas = ["Anillo roto", "Libro antiguo"];
let objetosDisponibles = ["Llave vieja", "Nota rota", "Carta misteriosa", "Nota rota (Despacho Secreto)"];
let resolucion = false;
let cartaCombinada = false; // Para verificar si la carta rota fue combinada

// Función para cambiar de escena
function cambiarEscena(lugar) {
    let escenaImagen = document.getElementById('sceneImage'); // Aquí es donde colocas la imagen del cuarto
    let descripcion = document.getElementById('description');

    switch (lugar) {
        case 'cuartoAmarillo':
            escenaActual = 'cuartoAmarillo';
            escenaImagen.src = 'algo.png';  // Imagen del Cuarto Amarillo
            descripcion.innerHTML = 'Estás en el Cuarto Amarillo, la escena del crimen.';
            break;
        case 'biblioteca':
            escenaActual = 'biblioteca';
            escenaImagen.src = 'b.png';  // Imagen de la Biblioteca
            descripcion.innerHTML = 'Estás en la biblioteca, un lugar lleno de libros antiguos.';
            break;
        case 'jardin':
            escenaActual = 'jardin';
            escenaImagen.src = 'o.png';  // Imagen del Jardín
            descripcion.innerHTML = 'Estás en el jardín, donde todo parece tranquilo.';
            break;
        case 'sotano':
            escenaActual = 'sotano';
            escenaImagen.src = 'batman.png';  // Imagen del Sótano
            descripcion.innerHTML = 'Estás en el oscuro y frío sótano.';
            break;
        case 'salaComedor':
            escenaActual = 'salaComedor';
            escenaImagen.src = 'tio.png';  // Imagen de la Sala de Comedor
            descripcion.innerHTML = 'Estás en la sala de comedor, donde ocurrieron eventos extraños.';
            break;
        case 'despachoSecreto': // Nuevo escenario
            escenaActual = 'despachoSecreto';
            escenaImagen.src = 'unir.png';  // Imagen del Despacho Secreto
            descripcion.innerHTML = 'Estás en el Despacho Secreto, un lugar oculto en el castillo.';
            break;
        default:
            escenaActual = 'castillo';
            escenaImagen.src = 'castillo.png';  // Imagen del Castillo
            descripcion.innerHTML = 'Estás en el castillo de Glandier. Explora los diferentes cuartos.';
    }
}

// Función para investigar en la escena
function investigar() {
    let pista = "";
    let objeto = "";

    switch (escenaActual) {
        case 'cuartoAmarillo':
            pista = "Pañuelo con sangre";
            break;
        case 'biblioteca':
            pista = "Carta misteriosa";
            break;
        case 'jardin':
            pista = "Llave del cuarto cerrado";
            break;
        case 'sotano':
            pista = "Anillo roto"; // pista falsa
            objeto = "Llave vieja";
            break;
        case 'salaComedor':
            pista = "Guante perdido";
            objeto = "Nota rota"; // objeto para usar en el juego
            break;
        case 'despachoSecreto': // Añadimos otra nota rota aquí
            pista = "";
            objeto = "Nota rota (Despacho Secreto)";
            break;
    }

    if (pista && !pistas.includes(pista)) {
        pistas.push(pista);
        document.getElementById('pistasList').innerHTML += `<li>${pista}</li>`;
        alert("Has encontrado una pista: " + pista);
    } else if (pista && pistas.includes(pista)) {
        alert("Ya has encontrado esta pista.");
    }

    if (objeto && !objetos.includes(objeto)) {
        objetos.push(objeto);
        document.getElementById('pistasList').innerHTML += `<li>${objeto} (objeto)</li>`;
        alert("Has encontrado un objeto: " + objeto);
    }
}

// Función para hablar con sospechosos
function hablarConSospechoso() {
    let mensaje = "";

    switch (escenaActual) {
        case 'cuartoAmarillo':
            sospechosoActual = "Mathilde";
            mensaje = `${sospechosoActual}: "No sé cómo alguien pudo entrar en este cuarto cerrado. ¡Es un misterio!"`;
            break;
        case 'biblioteca':
            sospechosoActual = "Larsan";
            mensaje = `${sospechosoActual}: "He estado investigando este caso por mi cuenta. Tal vez se me adelantaron."`;
            break;
        case 'jardin':
            sospechosoActual = "Sainclair";
            mensaje = `${sospechosoActual}: "He visto a alguien merodear por el jardín, pero no estoy seguro de quién."`;
            break;
        case 'sotano':
            sospechosoActual = "Portero";
            mensaje = `${sospechosoActual}: "Nadie baja al sótano... excepto yo, claro."`;
            break;
        case 'salaComedor':
            sospechosoActual = "Tío de Mathilde";
            mensaje = `${sospechosoActual}: "Algo extraño sucedió durante la cena, pero no pude ver quién lo hizo."`;
            break;
        default:
            sospechosoActual = "Nadie";
            mensaje = "No hay nadie aquí para hablar.";
    }

    alert(mensaje);
}

// Función para usar objetos
function usarObjeto() {
    if (escenaActual === 'despachoSecreto') {
        if (objetos.includes("Nota rota") && objetos.includes("Nota rota (Despacho Secreto)")) {
            alert("Has combinado las dos Notas rotas. La nota combinada revela un nombre incompleto: 'L...an'. ¡Parece que apunta a alguien cuyo nombre empieza con esas letras!");
            cartaCombinada = true;
        } else {
            alert("Necesitas ambas partes de la Nota rota para combinarlas.");
        }
    } else if (objetos.includes("Llave vieja") && escenaActual === "sotano") {
        alert("Has usado la llave vieja para abrir un cofre. Dentro, encuentras una pista: Guante perdido.");
        pistas.push("Guante perdido");
        document.getElementById('pistasList').innerHTML += `<li>Guante perdido</li>`;
    } else if (cartaCombinada) {
        alert("La carta revela un plan secreto: ¡alguien intentaba incriminar a otro!");
    } else {
        alert("No puedes usar ningún objeto aquí.");
    }
}

// Función para resolver el caso
function resolverCaso() {
    if (pistasCorrectas.every(pista => pistas.includes(pista))) {
        if (sospechosoActual === culpable) {
            document.getElementById('resultado').innerHTML = "¡Has resuelto el caso! El culpable es Larsan.";
            resolucion = true;
        } else {
            document.getElementById('resultado').innerHTML = "¡Tienes todas las pistas, pero fallaste al identificar al culpable!";
        }
    } else if (pistasFalsas.some(pista => pistas.includes(pista))) {
        document.getElementById('resultado').innerHTML = "Algunas de las pistas que has encontrado no son relevantes. Sigue buscando.";
    } else {
        document.getElementById('resultado').innerHTML = "Aún no tienes todas las pistas necesarias para resolver el caso.";
    }
}

// Función para finalizar el juego si fallas
function perderJuego() {
    document.getElementById('resultado').innerHTML = "¡Has fallado en tu investigación! Sigue buscando o inténtalo de nuevo.";
}
