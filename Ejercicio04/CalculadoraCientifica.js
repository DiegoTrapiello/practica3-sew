class CalculadoraCientifica extends Calculadora
 {
    constructor (){
        super();
    }

    sen(){
      this.valor = eval(this.pantalla.value);
      if (!isNaN(this.valor)){
        this.pantalla.value = Math.sin(this.valor);
      }
    }

    cos(){
      this.valor = eval(this.pantalla.value);
      if (!isNaN(this.valor)){
        this.pantalla.value = Math.cos(this.valor);
      }
    }

    tan(){
      this.valor = eval(this.pantalla.value);
      if (!isNaN(this.valor)){
        this.pantalla.value = Math.tan(this.valor);
      }
    }

    arcsen(){
      this.valor = eval(this.pantalla.value);
      if (!isNaN(this.valor)){
        this.pantalla.value = Math.asin(this.valor);
      }
    }

    arccos(){
      this.valor = eval(this.pantalla.value);
      if (!isNaN(this.valor)){
        this.pantalla.value = Math.acos(this.valor);
      }
    }

    arctan(){
      this.valor = eval(this.pantalla.value);
      if (!isNaN(this.valor)){
        this.pantalla.value = Math.atan(this.valor);
      }
    }
    exponencial(){
      this.valor = eval(this.pantalla.value);
      if (!isNaN(this.valor)){
        this.pantalla.value = Math.exp(this.valor);
      }
    }

    log(){
      this.valor = eval(this.pantalla.value);
      if (!isNaN(this.valor)){
        this.pantalla.value = Math.log(this.valor);
      }
    }

    cuadrado(){
      this.valor = eval(this.pantalla.value);
      if (!isNaN(this.valor)){
        this.pantalla.value = Math.pow(this.valor,2);
      }
    }

    raizCuadrada(){
      this.valor = eval(this.pantalla.value);
      if (!isNaN(this.valor)){
        this.pantalla.value = Math.sqrt(this.valor);
      }
    }

    elevado(){
      this.pantalla.value+="**";
    }



}


var calculadora= new CalculadoraCientifica();
