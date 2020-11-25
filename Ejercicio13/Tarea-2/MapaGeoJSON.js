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

class MYGeoJSONReader {
    constructor() {
     this.marcadores=[];
    }
    leerArchivoTexto(files) {
        var file = files[0];
        var tipoGeoJSON= ".geojson";
        if (file.name.match(tipoGeoJSON) ) {
            var lector = new FileReader();
            lector.onload = function (evento) {
                this.parsearGeoJSON(lector.result);
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

    parsearGeoJSON(file){
        var geojson = JSON.parse(file)
        var conjuntoPuntos=[]
        geojson.features.forEach(element => {
            if(element.geometry.type=="Point"){
                conjuntoPuntos.push({lat: element.geometry.coordinates[1],lng:element.geometry.coordinates[0]})
            }
            if(element.geometry.type=="LineString"){
                this.marcadores.push(conjuntoPuntos);
                conjuntoPuntos=[];
            }
        });
    }




    dibujarMapa(){
            var arrayColores =["#077B01","#1334E8","#8C0404"]
            var contador=0;
            var gijon = { lat: 43.53573, lng: -5.66152};
            var mapaOriginal = new google.maps.Map(document.getElementById('mapa'), { zoom: 8, center: gijon });

            this.marcadores.forEach(element => {
                var rutas =[];
                element.forEach(coordenadas => {
                    var marcador = new google.maps.Marker({ position: coordenadas, map: mapaOriginal });
                    rutas.push(coordenadas);
                });
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
var reader = new MYGeoJSONReader();
