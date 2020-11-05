class CalculadoraCientifica extends Calculadora
 {
    constructor (){
        super();
    }

    sen(){
      this.pantalla.value = Math.sin(eval(this.pantalla.value));
    }

    cos(){
      this.pantalla.value = Math.cos(eval(this.pantalla.value));
    }

    tan(){
      this.pantalla.value = Math.tan(eval(this.pantalla.value));
    }

    arcsen(){
      this.pantalla.value = Math.asin(eval(this.pantalla.value));
    }

    arccos(){
      this.pantalla.value = Math.acos(eval(this.pantalla.value));
    }

    arctan(){
      this.pantalla.value = Math.atan(eval(this.pantalla.value));
    }
    exponencial(){
       this.pantalla.value= Math.exp(eval(this.pantalla.value));
    }

    log(){
       this.pantalla.value = Math.log(eval(this.pantalla.value));
    }

    cuadrado(){
       this.pantalla.value=Math.pow(eval(this.pantalla.value),2);
    }

    raizCuadrada(){
      this.pantalla.value = Math.sqrt(eval(this.pantalla.value));
    }

    elevado(){
      this.pantalla.value+="**";
    }



}


var calculadora= new CalculadoraCientifica();
