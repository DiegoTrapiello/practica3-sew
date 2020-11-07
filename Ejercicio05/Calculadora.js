class Calculadora
{
    constructor(){
        this.pantalla =   document.getElementById('expresion');
        this.memoria = new Pila();
    }

    digitos(valor){
        this.pantalla.value += valor; 
      }

    suma(){
        if(this.memoria.count()>1){
        this.segundo =this.memoria.desapilar();
        this.primero = this.memoria.desapilar();
        this.resultado = this.primero + this.segundo;
        this.memoria.apilar(this.resultado);
        }
    }


    resta(){
        if(this.memoria.count()>1){
        this.segundo =this.memoria.desapilar();
        this.primero = this.memoria.desapilar();
        this.resultado = this.primero - this.segundo;
        this.memoria.apilar(this.resultado);    
        }
    }

    multiplicacion(){
        if(this.memoria.count()>1){
        this.segundo =this.memoria.desapilar();
        this.primero = this.memoria.desapilar();
        this.resultado = this.primero * this.segundo;
        this.memoria.apilar(this.resultado);    }
    }

    division(){
        if(this.memoria.count()>1){
        this.segundo =this.memoria.desapilar();
        this.primero = this.memoria.desapilar();
        this.resultado = this.primero / this.segundo;
        this.memoria.apilar(this.resultado);    }
    }

    enter(){
        this.valor = this.pantalla.value;
        if (this.valor!="" && this.memoria.count()<8){
            this.memoria.apilar(this.valor);
            this.pantalla.value = "";
        }
    }

    sen(){
        if(this.memoria.count()>0){
            this.primero = this.memoria.desapilar();
            this.resultado = Math.sin(this.primero);
            this.memoria.apilar(this.resultado);    }
      }
  
      cos(){
        if(this.memoria.count()>0){
            this.primero = this.memoria.desapilar();
            this.resultado = Math.cos(this.primero);
            this.memoria.apilar(this.resultado);    }
      }
  
      tan(){
        if(this.memoria.count()>0){
            this.primero = this.memoria.desapilar();
            this.resultado = Math.tan(this.primero);
            this.memoria.apilar(this.resultado);    }
      }
  
      arcsen(){
        if(this.memoria.count()>0){
            this.primero = this.memoria.desapilar();
            this.resultado = Math.asin(this.primero);
            this.memoria.apilar(this.resultado);    }
      }
  
      arccos(){
        if(this.memoria.count()>0){
            this.primero = this.memoria.desapilar();
            this.resultado = Math.acos(this.primero);
            this.memoria.apilar(this.resultado);    }
      }
  
      arctan(){
        if(this.memoria.count()>0){
            this.primero = this.memoria.desapilar();
            this.resultado = Math.atan(this.primero);
            this.memoria.apilar(this.resultado);    }
      }
      exponencial(){
        if(this.memoria.count()>0){
            this.primero = this.memoria.desapilar();
            this.resultado = Math.exp(this.primero);
            this.memoria.apilar(this.resultado);    }
      }

      limpiarUltimo(){
            this.memoria.desapilar();
            this.memoria.mostrarMemoria();
      }

      limpiarMemoria(){
        this.memoria.limpiarTodo();
        this.memoria.mostrarMemoria();
      }
}




class Pila{
    
    constructor(){
        this.pila=new Array();
        this.contenido=  document.getElementById('contenido');
    }

    apilar(valor){
        this.pila.push(valor);
        this.mostrarMemoria();
    }

    mostrarMemoria(){
        this.contenido.innerHTML="";
        var contador =0;
        for(var i in this.pila.reverse()){
            contador++;
            this.contenido.innerHTML+="<p>"+  this.pila[i] +"</p>"
        }
        this.pila.reverse();
    }

    desapilar(){
        return (this.pila.pop());
    }

    
    count(){
        return this.pila.length;
    }

    limpiarTodo(){
        this.pila=new Array();
    }

}

var calculadora= new Calculadora();