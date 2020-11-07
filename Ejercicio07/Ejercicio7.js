"use strict";
class Ocultador {

    constructor() {
    }

    ocultarParrafo() {
        $(document).ready(function () {
            $("p").hide();
        });
    }
    ocultarH1() {
        $(document).ready(function () {
            $("h1").hide();
        });
    }
    ocultarH2() {
        $(document).ready(function () {
            $("h2").hide();
        });
    }
    ocultarH3() {
        $(document).ready(function () {
            $("h3").hide();
        });
    }
    ocultarHeader() {
        $(document).ready(function () {
            $("header").hide();
        });
    }
    ocultarFooter() {
        $(document).ready(function () {
            $("footer").hide();
        });
    }
    ocultarTabla() {
        $(document).ready(function () {
            $("table").hide();
        });
    }

}
"use strict";
class Mostrador {
    constructor() {
    }

    mostrarParrafo() {
        $(document).ready(function () {
            $("p").show();
        });
    }
    mostrarH1() {
        $(document).ready(function () {
            $("h1").show();
        });
    }
    mostrarH2() {
        $(document).ready(function () {
            $("h2").show();
        });
    }
    mostrarH3() {
        $(document).ready(function () {
            $("h3").show();
        });
    }
    mostrarHeader() {
        $(document).ready(function () {
            $("header").show();
        });
    }
    mostrarFooter() {
        $(document).ready(function () {
            $("footer").show();
        });
    }
    mostrarTabla() {
        $(document).ready(function () {
            $("table").show();
        });
    }

}

class Modificador {
    constructor() {

    }
    invertir(cadena) {
        var x = cadena.length;
        var inverse = "";

        while (x >= 0) {
            inverse = inverse + cadena.charAt(x);
            x--;
        }
        return inverse;
    }
    invertirTextoParrafos() {
        var texto = $("p").text();
        var textoMod = this.invertir(texto);
        $("p").text(textoMod);
    }

    invertirTextoH1() {
        var texto = $("h1").text();
        var textoMod = this.invertir(texto);
        $("h1").text(textoMod);
    }

    invertirTextoTabla() {
        var texto = $("table").text();
        var textoMod = this.invertir(texto);
        $("table").text(textoMod);
    }

}

class Aniadidor {
    constructor() {

    }
    aniadirParrafoDespuesDeH2() {
        $(document).ready(function () {
            $("h2").after("<p> Párrafo añadido después de h2 <p>");
        });

    }
    aniadirH2despuesDeH1() {
        $(document).ready(function () {
            $("h1").after("<h2> H2 añadido <h2>");
        });
    }

    aniadirH3antesDeParrafo() {
        $(document).ready(function () {
            $("p").before("<h3> H3 añadido <h3>");
        });
    }

    aniadirParrafoAntesDeParrafo() {
        $(document).ready(function () {
            $("p").before("<p> Párrafo añadido antes de párrafo <p>");
        });
    }

    aniadirContenidoAFooter() {
        $(document).ready(function () {
            $("footer").append(".Texto añadido en footer");
        });
    }
}

class Eliminador {
    constructor() {

    }

    eliminarParrafos() {
        $(document).ready(function () {
            $("p").remove();
        });
    }
    eliminarTabla() {
        $(document).ready(function () {
            $("table").remove();
        });
    }

    eliminarH3() {
        $(document).ready(function () {
            $("h3").remove();
        });
    }



}
"use strict";
class Recorredor {
    constructor() {

    }

    recorrer() {
        $("*", document.body).each(function () {
            var etiquetaPadre = $(this).parent().get(0).tagName;
            $(this).prepend(document.createTextNode("(Etiqueta padre: " + etiquetaPadre + " Elemento: " + $(this).get(0).tagName + ") "));
        });




    }
}

"use strict";
class Sumador {
    constructor() {

    }



    sumarFilasYColumnas() {

        $(document).ready(function () {
            var contador = 0;
            $("table tr").each(function () {
                contador++;
            });
            $("table td").each(function () {
                contador++;
            });
            $("footer").before("<h2> Número de filas contadas: " + contador + " <h2>");
        });


    }
}




var recorredor = new Recorredor();
var ocultador = new Ocultador();
var mostrador = new Mostrador();
var modificador = new Modificador();
var aniadidor = new Aniadidor();
var eliminador = new Eliminador();
var sumador = new Sumador();