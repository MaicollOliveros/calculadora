const displayValorAnterior = document.getElementById('valor-anterior');
const displayValorActual = document.getElementById('valor-actual');
const botonesNumeros = document.querySelectorAll('.numero');
const botonesOperadores = document.querySelectorAll('.operador');
const d = document.getElementById('valor-anterior');

function consultarHistorial(){
    document.getElementById("Historial1").textContent = localStorage.getItem(0);
    document.getElementById("Historial2").textContent = localStorage.getItem(1);
    document.getElementById("Historial3").textContent = localStorage.getItem(2);    
}

const display = new Display(displayValorAnterior, displayValorActual);

botonesNumeros.forEach(boton => {
    boton.addEventListener('click', () => display.agregarNumero(boton.innerHTML));
});

botonesOperadores.forEach(boton => {
    boton.addEventListener('click', () => display.computar(boton.value))
});

