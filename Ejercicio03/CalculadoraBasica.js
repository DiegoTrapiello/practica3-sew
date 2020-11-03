class Calculadora
 {
    constructor (){
        this.pantalla =   document.getElementById('expresion');
        this.memoria = [];
    }

    
    digitos(valor){
      this.pantalla.value += valor; 
    }

    //Operaciones Basicas
    suma(){
       this.pantalla.value += "+"; 
    }

    resta(){
       this.pantalla.value += "-"; 
    }

    multiplicacion(){
       this.pantalla.value += "*"; 
    }

    division(){
       this.pantalla.value += "/"; 
    }


    igual(){
       this.pantalla.value = eval(this.pantalla.value);
    }

    borrar(){
       this.pantalla.value = "";
    }

    punto(){
       this.pantalla.value += ".";
    }

    mMenos(){
         this.memoria.pop();
    }

    mMas(){
      this.valor = eval(this.pantalla.value);
      if (!isNaN(this.valor)){
         this.memoria.push( this.valor);
         this.pantalla.value="";
      }
    }

    mrc(){

      if(this.memoria.length>0){
       this.valorPila = this.memoria.pop();
       this.pantalla.value+=this.valorPila;
      }
    }
}


var calculadora= new Calculadora();
