// Obtenemos el canvas y su contexto
var canvas = document.getElementById('miCanvas');
var ctx = canvas.getContext('2d');
var rango = document.getElementById('rango');


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
    var x = (e.clientX - rect.left) * (canvas.width / rect.width);
    var y = (e.clientY - rect.top) * (canvas.height / rect.height);

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
    var touch = e.touches[0];
    var rect = canvas.getBoundingClientRect();
    var x = (touch.clientX - rect.left) * (canvas.width / rect.width);
    var y = (touch.clientY - rect.top) * (canvas.height / rect.height);
    ctx.moveTo(x, y);
});

canvas.addEventListener('touchmove', function(e) {
    if (!dibujando) return;
    e.preventDefault();
    var touch = e.touches[0];
    var rect = canvas.getBoundingClientRect();
    var x = (touch.clientX - rect.left) * (canvas.width / rect.width);
    var y = (touch.clientY - rect.top) * (canvas.height / rect.height);
    ctx.lineTo(x, y);
    ctx.stroke();
});

canvas.addEventListener('touchend', function() {
    dibujando = false;
    ctx.beginPath();
});

// Función para actualizar el label con el valor actual del rango
function actualizarTamanoLabel() {
    tamanoLabel.textContent = 'Tamaño del pincel: ' + tamanoSelector.value;
  }
  
  // Agregamos un evento al input range para actualizar el label cuando cambia el valor
  tamanoSelector.addEventListener('input', actualizarTamanoLabel);
  
  // Llamamos a la función inicialmente para establecer el valor predeterminado
  actualizarTamanoLabel();
  
// Función para limpiar el canvas
function limpiarCanvas() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
}
