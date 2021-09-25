class Display {
    constructor(displayValorAnterior, displayValorActual) {
        this.displayValorActual = displayValorActual;
        this.displayValorAnterior = displayValorAnterior;
        this.historial = "";
        this.calculador = new Calculadora();
        this.tipoOperacion = undefined;
        this.valorActual = '';
        this.count = 0;
        this.operacion = "";
        this.valorAnterior = '';
        this.signos = {
            sumar: '+',
            dividir: '%',
            multiplicar: 'x',
            restar: '-', 
        }
    }

    borrar() {
        this.valorActual = this.valorActual.toString().slice(0,-1);
        this.imprimirValores();
    }

    borrarTodo() {
        this.valorActual = '';
        this.valorAnterior = '';
        this.tipoOperacion = undefined;
        this.imprimirValores();
    }

    computar(tipo) {
        this.tipoOperacion !== 'igual' && this.calcular();
        this.tipoOperacion = tipo;
        this.valorAnterior = this.valorActual || this.valorAnterior;
        this.valorActual = '';
        
        this.imprimirValores();
    }

    agregarNumero(numero) {
        if(numero === '.' && this.valorActual.includes('.')) return
        this.valorActual = this.valorActual.toString() + numero.toString();
        this.imprimirValores();
    }

    imprimirValores() {
        this.displayValorActual.textContent = this.valorActual;
        this.displayValorAnterior.textContent = `${this.valorAnterior} ${this.signos[this.tipoOperacion] || ''}`;
        
    }

    guardarHistorial(resultado){
        localStorage.setItem(this.count,resultado);
        this.count = this.count + 1;
        if(this.count == 3){
            this.count = 0;
        }
    }

    calcular() {
        const valorAnterior = parseFloat(this.valorAnterior);
        const valorActual = parseFloat(this.valorActual);
        var primerNumero = valorActual;

        if( isNaN(valorActual)  || isNaN(valorAnterior) ) return
        this.valorActual = this.calculador[this.tipoOperacion](valorAnterior, valorActual);
        if(this.tipoOperacion.toString() == "sumar"){
            this.operacion = "+"
        }
        if(this.tipoOperacion.toString() == "restar"){
            this.operacion = "-"
        }
        if(this.tipoOperacion.toString() == "multiplicar"){
            this.operacion = "x"
        }
        if(this.tipoOperacion.toString() == "dividir"){
            this.operacion = "/"
        }
        this.guardarHistorial(valorAnterior.toString() + this.operacion + primerNumero.toString() + '=' + this.valorActual.toString() + "\n");
    }
}