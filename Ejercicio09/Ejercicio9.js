"use strict";
class Meteo {
    constructor() {
        this.apikey = "fe188271869579ae59686fdf1b457e6e";
        this.tipo = "&mode=xml";
        this.unidades = "&units=metric";
        this.idioma = "&lang=es";
        this.ciudadesAMostrar = ["Gijon", "Tineo", "Oviedo", "Aviles", "Lugones"];
        this.correcto = "XML obtenido de <a href='http://openweathermap.org/'>OpenWeatherMap</a>"
    }
    cargarDatos(ciudad, iteracion) {
        this.url = "http://api.openweathermap.org/data/2.5/weather?q=" + ciudad + this.tipo + this.unidades + this.idioma + "&APPID=" + this.apikey;
        $.ajax({
            dataType: "xml",
            url: this.url,
            method: 'GET',
            success: function (datos) {

                $("#encabezadoh5" + iteracion).text((new XMLSerializer()).serializeToString(datos));

                var totalNodos = $('*', datos).length;
                var ciudad = $('city', datos).attr("name");
                var longitud = $('coord', datos).attr("lon");
                var latitud = $('coord', datos).attr("lat");
                var pais = $('country', datos).text();
                var amanecer = $('sun', datos).attr("rise");
                var minutosZonaHoraria = new Date().getTimezoneOffset();
                var amanecerMiliSeg1970 = Date.parse(amanecer);
                amanecerMiliSeg1970 -= minutosZonaHoraria * 60 * 1000;
                var amanecerLocal = (new Date(amanecerMiliSeg1970)).toLocaleTimeString("es-ES");
                var oscurecer = $('sun', datos).attr("set");
                var oscurecerMiliSeg1970 = Date.parse(oscurecer);
                oscurecerMiliSeg1970 -= minutosZonaHoraria * 60 * 1000;
                var oscurecerLocal = (new Date(oscurecerMiliSeg1970)).toLocaleTimeString("es-ES");
                var temperatura = $('temperature', datos).attr("value");
                var temperaturaMin = $('temperature', datos).attr("min");
                var temperaturaMax = $('temperature', datos).attr("max");
                var temperaturaUnit = $('temperature', datos).attr("unit");
                var humedad = $('humidity', datos).attr("value");
                var humedadUnit = $('humidity', datos).attr("unit");
                var presion = $('pressure', datos).attr("value");
                var presionUnit = $('pressure', datos).attr("unit");
                var velocidadViento = $('speed', datos).attr("value");
                var nombreViento = $('speed', datos).attr("name");
                var direccionViento = $('direction', datos).attr("value");
                var codigoViento = $('direction', datos).attr("code");
                var nombreDireccionViento = $('direction', datos).attr("name");
                var nubosidad = $('clouds', datos).attr("value");
                var nombreNubosidad = $('clouds', datos).attr("name");
                var visibilidad = $('visibility', datos).attr("value");
                var precipitacionValue = $('precipitation', datos).attr("value");
                var precipitacionMode = $('precipitation', datos).attr("mode");
                var descripcion = $('weather', datos).attr("value");
                var horaMedida = $('lastupdate', datos).attr("value");
                var horaMedidaMiliSeg1970 = Date.parse(horaMedida);
                horaMedidaMiliSeg1970 -= minutosZonaHoraria * 60 * 1000;
                var horaMedidaLocal = (new Date(horaMedidaMiliSeg1970)).toLocaleTimeString("es-ES");
                var fechaMedidaLocal = (new Date(horaMedidaMiliSeg1970)).toLocaleDateString("es-ES");
                var icono = $('weather', datos).attr("icon");

                var stringDatos = "<ul><li>Número de elementos del XML: " + totalNodos + "</li>";
                stringDatos += "<li>Ciudad: " + ciudad + "</li>";
                stringDatos += "<li>Longitud: " + longitud + " grados</li>";
                stringDatos += "<li>Latitud: " + latitud + " grados</li>";
                stringDatos += "<li>Paí­s: " + pais + "</li>";
                stringDatos += "<li>Amanece a las: " + amanecerLocal + "</li>";
                stringDatos += "<li>Oscurece a las: " + oscurecerLocal + "</li>";
                stringDatos += "<li>Temperatura: " + temperatura + " grados Celsius</li>";
                stringDatos += "<li>Temperatura mí­nima: " + temperaturaMin + " grados Celsius</li>";
                stringDatos += "<li>Temperatura máxima: " + temperaturaMax + " grados Celsius</li>";
                stringDatos += "<li>Temperatura (unidades): " + temperaturaUnit + "</li>";
                stringDatos += "<li>Humedad: " + humedad + " " + humedadUnit + "</li>";
                stringDatos += "<li>Presión: " + presion + " " + presionUnit + "</li>";
                stringDatos += "<li>Velocidad del viento: " + velocidadViento + " metros/segundo</li>";
                stringDatos += "<li>Nombre del viento: " + nombreViento + "</li>";
                stringDatos += "<li>Dirección del viento: " + direccionViento + " grados</li>";
                stringDatos += "<li>Código del viento: " + codigoViento + "</li>";
                stringDatos += "<li>Nombre del viento: " + nombreDireccionViento + "</li>";
                stringDatos += "<li>Nubosidad: " + nubosidad + "</li>";
                stringDatos += "<li>Nombre nubosidad: " + nombreNubosidad + "</li>";
                stringDatos += "<li>Visibilidad: " + visibilidad + " metros</li>";
                stringDatos += "<li>Precipitación valor: " + precipitacionValue + "</li>";
                stringDatos += "<li>Precipitación modo: " + precipitacionMode + "</li>";
                stringDatos += "<li>Descripción: " + descripcion + "</li>";
                stringDatos += "<li>Hora de la medida: " + horaMedidaLocal + "</li>";
                stringDatos += "<li>Fecha de la medida: " + fechaMedidaLocal + "</li>";
                stringDatos += "<li>Icono: <img src= http://openweathermap.org/img/w/" + icono + ".png /></li></ul>";
                $("#parrafo" + iteracion).html(stringDatos);

            },
            error: function () {
                $("#encabezadoh3" + iteracion).html("No se pudo obtener XML de <a href='http://openweathermap.org'>OpenWeatherMap</a>");
                $("#encabezadoh4" + iteracion).remove();
                $("#encabezadoh5" + iteracion).remove();
                $("#parrafo" + iteracion).remove();
            }
        });
    }
    crearElemento(tipoElemento, texto, insertarAntesDe, id) {
        var elemento = document.createElement(tipoElemento);
        elemento.id = id;
        elemento.innerHTML = texto;
        $(insertarAntesDe).before(elemento);
    }
    obtenerXML() {
        var contador = 0;
        for (var elemento of this.ciudadesAMostrar) {
            this.crearElemento("h2", elemento, "footer", "encabezadoh2" + contador);
            this.crearElemento("h3", this.correcto, "footer", "encabezadoh3" + contador);
            this.crearElemento("h4", "XML", "footer", "encabezadoh4" + contador);
            this.crearElemento("h5", "", "footer", "encabezadoh5" + contador);
            this.crearElemento("h4", "Datos", "footer", "encabezadoDatos" + contador);
            this.crearElemento("p", "", "footer", "parrafo" + contador);
            this.cargarDatos(elemento, contador);
            $("button").attr("disabled", "disabled");
            contador++;
        }

    }
}
var meteo = new Meteo();