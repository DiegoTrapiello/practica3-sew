"use strict";
class Meteo {
    constructor() {
        this.apikey = "fe188271869579ae59686fdf1b457e6e";
        this.codigoPais = "ES";
        this.unidades = "&units=metric";
        this.idioma = "&lang=es";
        this.ciudadesAMostrar = ["Gijón", "Tineo", "Oviedo"];
    }
    cargarDatos(ciudad, iteracion) {
        this.url = "http://api.openweathermap.org/data/2.5/weather?q=" + ciudad + "," + this.codigoPais + this.unidades + this.idioma + "&APPID=" + this.apikey;
        console.log(this.url);
        $.ajax({
            dataType: "json",
            url: this.url,
            method: 'GET',
            success: function (datos) {
                $("#pre"+iteracion).text(JSON.stringify(datos, null, 2));
                $("#encabezado"+iteracion).text(ciudad);

                var stringDatos = "<ul><li>Ciudad: " + datos.name + "</li>";
                stringDatos += "<li>Paí­s: " + datos.sys.country + "</li>";
                stringDatos += "<li>Latitud: " + datos.coord.lat + " grados</li>";
                stringDatos += "<li>Longitud: " + datos.coord.lon + " grados</li>";
                stringDatos += "<li>Temperatura: " + datos.main.temp + " grados Celsius</li>";
                stringDatos += "<li>Temperatura máxima: " + datos.main.temp_max + " grados Celsius</li>";
                stringDatos += "<li>Temperatura mínima: " + datos.main.temp_min + " grados Celsius</li>";
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
                $("#parrafo"+iteracion).html(stringDatos);
            },
            error: function () {
                $("h2").html("No se pudo obtener JSON de <a href='http://openweathermap.org'>OpenWeatherMap</a>");
                $("p").remove();
            }
        });
    }
    crearElemento(tipoElemento, texto, insertarAntesDe, id) {
        var elemento = document.createElement(tipoElemento);
        elemento.id = id;
        elemento.innerHTML = texto;
        $(insertarAntesDe).before(elemento);
    }
    obtenerJSON() {
        var contador = 0 ;
        for (var valor of this.ciudadesAMostrar) {
            var ciudad = valor;

            this.crearElemento("h2", ciudad+"", "footer", "encabezado"+contador);
            this.crearElemento("h4","JSON","footer", "encabezadoh4"+contador);      
            this.crearElemento("pre","","footer", "pre"+contador);
            this.crearElemento("h4","Datos","footer", "encabezadoDatos"+contador);  
            this.crearElemento("p", "", "footer", "parrafo"+contador);
            this.cargarDatos(ciudad,contador);
            $("button").attr("disabled", "disabled");
            contador++;
        }


    }
}
var meteo = new Meteo();
meteo.obtenerJSON();
