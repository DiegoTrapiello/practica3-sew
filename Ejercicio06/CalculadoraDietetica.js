class CalculadoraDietetica
 {
    constructor (){
        this.memoria = [];
    }

    AddCalorias(valor){
      this.pantalla =   document.getElementById('expresion');
      this.pantalla.value += this.pantalla.value=="" ? valor : "+" + valor;
    }

    RestarCalorias(valor){
      this.pantalla =   document.getElementById('expresion');
       this.pantalla.value +=  "-" + valor;
    }

    calcularIMC(){
       this.peso = parseFloat(document.getElementById("peso").value);
       this.altura = parseFloat(document.getElementById("altura").value);
       if(!isNaN(this.peso)&& !isNaN(this.altura)){
          document.getElementById("imc").value =this.peso/(Math.pow(this.altura/100,2));
       }
       else{
         document.getElementById("imc").value = "";
       }
    }

    calcular(){
      this.pantalla = document.getElementById('expresion');
      this.total = 0;
      this.valor = this.pantalla.value.match(/[+\-]*(\.\d+|\d+(\.\d+)?)/g) || [];

      while (this.valor.length) {
         this.total += parseInt(this.valor.shift());
       }

       this.pantalla.value = this.total;
    }


    resetear(){
      this.pantalla = document.getElementById('expresion');
      this.pantalla.value ="";

    }

}


var calculadora= new CalculadoraDietetica();
