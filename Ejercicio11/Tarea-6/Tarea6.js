"use strict";
class Meteo {
    constructor() {
        this.apikey = "fe188271869579ae59686fdf1b457e6e";
        this.weatherDatos;
    }
    cargarDatos(lat, lon) {
        this.url = "http://api.openweathermap.org/data/2.5/weather?lat=" + lat + "&lon=" + lon + "&lang=es&units=metric&appid=" + this.apikey;
        console.log(this.url);
        var stringDatos = "";
        $.ajax({
            async: false,
            dataType: "json",
            url: this.url,
            method: 'GET',
            success: function (datos) {
                stringDatos += "<h3> Predicción del Tiempo </h3>";
                stringDatos += "<ul><li>Ciudad: " + datos.name + "</li>";
                stringDatos += "<li>Paí­s: " + datos.sys.country + "</li>";
                stringDatos += "<li>Latitud: " + datos.coord.lat + " grados</li>";
                stringDatos += "<li>Longitud: " + datos.coord.lon + " grados</li>";
                stringDatos += "<li>Temperatura: " + parseFloat(datos.main.temp) + " ºC</li>";
                stringDatos += "<li>Temperatura máxima: " + parseFloat(datos.main.temp_max) + " ºC</li>";
                stringDatos += "<li>Temperatura mínima: " + parseFloat(datos.main.temp_min) + " ºC</li>";
                stringDatos += "<li>Presión: " + datos.main.pressure + " milibares</li>";
                stringDatos += "<li>Humedad: " + datos.main.humidity + " %</li>";
                stringDatos += "<li>Amanece a las: " + new Date(datos.sys.sunrise * 1000).toLocaleTimeString() + "</li>";
                stringDatos += "<li>Oscurece a las: " + new Date(datos.sys.sunset * 1000).toLocaleTimeString() + "</li>";
                stringDatos += "<li>Dirección del viento: " + datos.wind.deg + " grados</li>";
                stringDatos += "<li>Velocidad del viento: " + datos.wind.speed + " metros/segundo</li>";
                stringDatos += "<li>Hora de la medida: " + new Date(datos.dt * 1000).toLocaleTimeString() + "</li>";
                stringDatos += "<li>Fecha de la medida: " + new Date(datos.dt * 1000).toLocaleDateString() + "</li>";
                stringDatos += "<li>Descripción: " + datos.weather[0].description + "</li>";
                stringDatos += "<li>Visibilidad: " + datos.visibility + " metros</li>";
                stringDatos += "<li>Nubosidad: " + datos.clouds.all + " %</li>";
                stringDatos += "<li>Icono: <img src= http://openweathermap.org/img/w/" + datos.weather[0].icon + ".png /></li></ul>";


            },
            error: function () {
                stringDatos = "error";
            }
        });
        return stringDatos;
    }

    obtenerJSON(lat, lon) {
        return this.cargarDatos(lat, lon);
    }
}

class MapaDinamico {

    initMap() {
        return function () {
            var position = {
                lat: 43.3672702,
                lng: -5.8502461
            };
            var mapaGeoposicionado = new google.maps.Map(document.getElementById('mapa'), {
                zoom: 8,
                center: position,
                mapTypeId: google.maps.MapTypeId.ROADMAP
            });

            var infoWindow = new google.maps.InfoWindow;
            if (navigator.geolocation) {
                navigator.geolocation.getCurrentPosition(function (position) {
                    var pos = {
                        lat: position.coords.latitude,
                        lng: position.coords.longitude
                    };
                    infoWindow.setPosition(pos);
                    var meteo = new Meteo();
                    var weatherData = meteo.obtenerJSON(position.coords.latitude, position.coords.longitude);
                    console.log(weatherData);
                    infoWindow.setContent(weatherData);
                    infoWindow.open(mapaGeoposicionado);
                    mapaGeoposicionado.setCenter(pos);


                }, function () {
                    handleLocationError(true, infoWindow, mapaGeoposicionado.getCenter());
                });
            } else {
                handleLocationError(false, infoWindow, mapaGeoposicionado.getCenter());
            }
        }
    }

    handleLocationError(browserHasGeolocation, infoWindow, pos) {
        infoWindow.setPosition(pos);
        infoWindow.setContent(browserHasGeolocation ?
            'Error: Ha fallado la geolocalización' :
            'Error: Su navegador no soporta geolocalización');
        infoWindow.open(mapaGeoposicionado);
    }
}


var mapaDinamico = new MapaDinamico().initMap();