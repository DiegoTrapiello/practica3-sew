
class MapaDinamico {

    initMap() {
        return function () {
            var gijon = { lat: 43.53573, lng: -5.66152};
            var mapaOriginal = new google.maps.Map(document.getElementById('mapa'), { zoom: 8, center: gijon });
            var marcador = new google.maps.Marker({ position: gijon, map: mapaOriginal });
        }
    }

}


var mapaDinamico = new MapaDinamico().initMap();