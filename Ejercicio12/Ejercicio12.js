class NavigatorChecker {
    constructor() {

    }
    checkNavigator() {
        if (window.File && window.FileReader && window.FileList && window.Blob) {
            document.write("<p>API File es soportado por este navegador. </p>");
        }
        else {
            document.write("<p>API File no es soportado por este navegador.</p>")

        }
    }
}

class MyFileReader {
    constructor() {

    }
    leerArchivoTexto(files) {
        var file = files[0];
        $(document).ready(function(){
            $("#fileName").text("Nombre del archivo: "+ file.name);
            $("#fileSize").text("Tamaño del archivo: " + file.size + " bytes");
            $("#fileType").text("Tipo del archivo: " + file.type);
            $("#lastUpdate").text("Fecha de la última modificación: " + file.lastModifiedDate);
            $("#fileContent").text("Contenido del archivo cargado: ");
        });
        var tipoTextoAndXML= /text.*/;
        var tipoJSON = /application.json/;
        if (file.type.match(tipoTextoAndXML) || file.type.match(tipoJSON) ) {
            var lector = new FileReader();
            lector.onload = function (evento) {
                $(document).ready(function(){
                    $("#textArea").text(lector.result);
                });
            }
            lector.readAsText(file);
        }
        else {
            $(document).ready(function(){
                $("#readError").text("No se puede mostrar el contenido de este archivo.");
                $("#textArea").text("");
            });
           
        }
    };
}
var checker = new NavigatorChecker();
checker.checkNavigator();
var reader = new MyFileReader();
