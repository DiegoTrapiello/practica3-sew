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
        if (this.valor!=""){
            this.memoria.apilar(this.valor);
            this.pantalla.value = "";
        }
    }
}




class Pila{
    
    constructor(){
        this.pila=new Array();
        this.contenido=  document.getElementById('contenido');
    }

    apilar(valor){
        this.pila.push(valor);
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

    mostrar(){
        var stringPila = "<h2>" +this.nombre +"</h2>" + "<ul>";
        for (var i in this.pila) stringPila += "<li>Pila[" + i + "] = " + this.pila[i] + "</li>";
        stringPila += "</ul>"
        return stringPila;
    }
    
    count(){
        return this.pila.length;
    }

}

var calculadora= new Calculadora();