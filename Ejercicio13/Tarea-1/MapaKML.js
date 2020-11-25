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

class MyKMLReader {
    constructor() {
     this.marcadores=[];
    }
    leerArchivoTexto(files) {
        var file = files[0];
        var tipoKML= ".kml";
        if (file.name.match(".kml") ) {
            var lector = new FileReader();
            lector.onload = function (evento) {
                this.parsearXML(lector.result);
                this.dibujarMapa();
            }.bind(this);
            lector.readAsText(file);
        }
        else {
            $(document).ready(function(){
                $("#readError").text("No se puede mostrar el contenido de este archivo.");
                $("#textArea").text("");
            });
           
        }
    };

    parsearXML(file){
        var text, parser, xmlDoc;
        parser = new DOMParser(); 
        xmlDoc = parser.parseFromString(file,"text/xml");
        var rutas = xmlDoc.getElementsByTagName("Document")[0].childNodes;

        rutas.forEach(element => {
            //llegar hasta las coordenadas
            var coordenadas=element.childNodes[1].childNodes[2].innerHTML;

            //obtener los puntos
            var coordenadasParsed = coordenadas.split("\n")
            console.log(coordenadasParsed);

            this.marcadores.push(coordenadasParsed);
        });
    }




    dibujarMapa(){
            var arrayColores =["#077B01","#1334E8","#8C0404"]
            var contador=0;
            var gijon = { lat: 43.53573, lng: -5.66152};
            var mapaOriginal = new google.maps.Map(document.getElementById('mapa'), { zoom: 8, center: gijon });
            this.marcadores.forEach(element => {
                var rutas =[];
                element.forEach(coord => {
                    if (coord!="" && coord!=undefined && coord!=null){
                    var parsedCoordenada = coord.split(",");
                    var coordenada = {lat: parseFloat(parsedCoordenada[1]), lng: parseFloat(parsedCoordenada[0])}
                    rutas.push(coordenada);
                    var marcador = new google.maps.Marker({ position: coordenada, map: mapaOriginal });
                 } });
                console.log(rutas); 
                const lineaRuta = new google.maps.Polyline({
                    path: rutas,
                    geodesic: true,
                    strokeColor: arrayColores[contador],
                    strokeOpacity: 1.0,
                    strokeWeight: 2,
                    map:mapaOriginal
                  });
                  contador++;
            });
    }
}
var checker = new NavigatorChecker();
checker.checkNavigator();
var reader = new MyKMLReader();
