// Obtén el canvas y su contexto
var canvas = document.getElementById('miCanvas');
var ctx = canvas.getContext('2d');
var imagenSelect = document.getElementById('imagenSelect');

// Crea una nueva instancia de Image
var imagen = new Image();

var imagenes = {
    pikachu: "img/pikachu.png",
    mike: "img/mike.png"
};

// Agregar un evento al elemento select para detectar cambios en la selección
imagenSelect.addEventListener('change', function() {
    // Obtener el valor seleccionado del elemento select
    var seleccion = imagenSelect.value;

    // Limpiar el canvas si se selecciona "En blanco"
    if (seleccion === 'blanco') {
        enBlanco();
    } else if (imagenes.hasOwnProperty(seleccion)) {
        // Si existe, cargar la imagen correspondiente
        imagen.src = imagenes[seleccion];
    }
});

// Define las coordenadas de la imagen
var imagenX = 0;
var imagenY = 0;
var imagenAncho;
var imagenAlto;

// Cuando la imagen se cargue, calcula las coordenadas para centrarla
imagen.onload = function() {
    var canvasWidth = canvas.width;
    var canvasHeight = canvas.height;

    // Ajusta el tamaño de la imagen si es demasiado grande para el canvas
    var imageWidth = imagen.width;
    var imageHeight = imagen.height;

    if (imageWidth > canvasWidth || imageHeight > canvasHeight) {
        var ratioWidth = canvasWidth / imageWidth;
        var ratioHeight = canvasHeight / imageHeight;
        var scaleFactor = Math.min(ratioWidth, ratioHeight);

        imageWidth *= scaleFactor;
        imageHeight *= scaleFactor;
    }

    // Calcula las coordenadas para centrar la imagen
    imagenX = (canvasWidth - imageWidth) / 2;
    imagenY = (canvasHeight - imageHeight) / 2;
    imagenAncho = imageWidth;
    imagenAlto = imageHeight;

    // Borra el canvas antes de dibujar la imagen
    ctx.clearRect(0, 0, canvasWidth, canvasHeight);

    // Dibuja la imagen en las coordenadas calculadas con el nuevo tamaño
    ctx.drawImage(imagen, imagenX, imagenY, imagenAncho, imagenAlto);
};


// Función para dibujar la imagen en el canvas
function colocarImagen() {
    var imageWidth = imagen.width;
    var imageHeight = imagen.height;

    // Ajusta el tamaño de la imagen si es demasiado grande para el canvas
    var canvasWidth = canvas.width;
    var canvasHeight = canvas.height;

    if (imageWidth > canvasWidth || imageHeight > canvasHeight) {
        var ratioWidth = canvasWidth / imageWidth;
        var ratioHeight = canvasHeight / imageHeight;

        // Usa el factor de escala más pequeño para ajustar la imagen
        var scaleFactor = Math.min(ratioWidth, ratioHeight);

        // Calcula las nuevas dimensiones de la imagen
        imageWidth *= scaleFactor;
        imageHeight *= scaleFactor;
    }

    // Calcula las coordenadas para centrar la imagen
    var x = (canvasWidth - imageWidth) / 2;
    var y = (canvasHeight - imageHeight) / 2;

    // Borra el canvas antes de dibujar la imagen
    ctx.clearRect(0, 0, canvasWidth, canvasHeight);

    // Dibuja la imagen en las coordenadas calculadas con el nuevo tamaño
    ctx.drawImage(imagen, x, y, imageWidth, imageHeight);
}
// Configuramos el color y el tamaño del pincel
var colorSelector = document.getElementById('colorSelector');
var tamanoSelector = document.getElementById('tamanoSelector');
var color = colorSelector.value;
var tamano = tamanoSelector.value;

colorSelector.addEventListener('input', function() {
    color = colorSelector.value;
});

tamanoSelector.addEventListener('input', function() {
    tamano = tamanoSelector.value;
});

var dibujando = false; // Variable para rastrear si estamos dibujando o no

// Función para dibujar en el canvas
function dibujar(e) {
    if (!dibujando) return;

    ctx.strokeStyle = color;
    ctx.lineWidth = tamano;
    ctx.lineCap = 'round';

    // Calcular las coordenadas en función del tamaño real del canvas
    var rect = canvas.getBoundingClientRect();
    var x, y;

    if (e.type === 'touchmove' || e.type === 'touchstart') {
        x = (e.touches[0].clientX - rect.left) * (canvas.width / rect.width);
        y = (e.touches[0].clientY - rect.top) * (canvas.height / rect.height);
    } else {
        x = (e.clientX - rect.left) * (canvas.width / rect.width);
        y = (e.clientY - rect.top) * (canvas.height / rect.height);
    }

    // Asegúrate de que las coordenadas estén dentro de los límites de la imagen
    //x = Math.min(Math.max(x, imagenX), imagenX + imagenAncho);
    //y = Math.min(Math.max(y, imagenY), imagenY + imagenAlto);

    ctx.lineTo(x, y);
    ctx.stroke();
    ctx.beginPath();
    ctx.moveTo(x, y);
}

// Agregamos el evento de dibujo al canvas para dispositivos táctiles y de mouse
canvas.addEventListener('mousedown', function(e) {
    dibujando = true;
    ctx.beginPath();
    dibujar(e);
});

canvas.addEventListener('mousemove', dibujar);

canvas.addEventListener('mouseup', function() {
    dibujando = false;
    ctx.beginPath();
});

canvas.addEventListener('touchstart', function(e) {
    dibujando = true;
    ctx.beginPath();
    e.preventDefault();
    dibujar(e);
});

canvas.addEventListener('touchmove', function(e) {
    if (!dibujando) return;
    e.preventDefault();
    dibujar(e);
});

canvas.addEventListener('touchend', function() {
    dibujando = false;
    ctx.beginPath();
});

// Función para actualizar el label con el valor actual del rango
function actualizarTamanoLabel() {
    tamanoLabel.textContent = tamanoSelector.value;
}

// Agregamos un evento al input range para actualizar el label cuando cambia el valor
tamanoSelector.addEventListener('input', actualizarTamanoLabel);

// Llamamos a la función inicialmente para establecer el valor predeterminado
actualizarTamanoLabel();

function enBlanco() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
}

// Función para limpiar el canvas y volver a colocar la imagen
function limpiarCanvas() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    colocarImagen(); // Vuelve a colocar la imagen en el canvas
}
