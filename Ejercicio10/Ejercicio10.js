class Noticias{
    constructor(){
        this.apikey = "17e55a59c8msh5ebc9f8985a5b90p1b041ajsn8f5e234b533d"
        this.apihost = "bing-news-search1.p.rapidapi.com"
        this.url="https://bing-news-search1.p.rapidapi.com/news/search?q=";
        this.query="";
        this.lang="&setLang=ES";
        this.freshness="&freshness=Day";
        this.textFormat="&textFormat=Raw";
        this.safeSearch="&safeSearch=Off"
        this.contador=0;



    }

    cargarDatos() {

        const settings = {
            "async": true,
            "crossDomain": true,
            "url": this.url+this.query+this.lang+this.freshness+this.textFormat+this.safeSearch,
            "method": "GET",
            "headers": {
                "x-bingapis-sdk": "true",
                "x-rapidapi-key": this.apikey,
                "x-rapidapi-host": this.apihost
            }
        };

        $.ajax(settings).done(function (datos) {
            $("ul").remove();
            $("h4").remove();
            $("p").remove();
            $.each(datos.value, function(i, item) {
                var iteracion = item;

                //this.crearElemento("h4","JSON","footer","encabezado" +i);      
                //this.crearElemento("pre","","footer","pre"+i);
                this.crearElemento("h4","Noticia","footer","encabezadoDatos"+this.contador);  
                this.crearElemento("p", "", "footer","parrafo"+this.contador);
               
                //$("pre").text(JSON.stringify(iteracion, null, 2));

                var stringDatos ="<ul><li>"+ iteracion.name +"</li>";
                 stringDatos +="<li> <a href=\""+ iteracion.url +"\">Enlace de la noticia</a></li>";
                 stringDatos+="<li><figure><img src=\"" +iteracion.image.thumbnail.contentUrl +"\"></figure></li>"
                 stringDatos+="<li>" + iteracion.description +"</li></ul>"
                 $("#parrafo"+this.contador).html(stringDatos);
                this.contador++;
            }.bind(this));

        }.bind(this)).fail(function (datos){
            $("h2").html("No se pudo obtener JSON de <a href='bing-news-search1.p.rapidapi.com'>BingApi</a>");
        })
    }

    crearElemento(tipoElemento, texto, insertarAntesDe,id) {
        var elemento = document.createElement(tipoElemento);
        elemento.innerHTML = texto;
        elemento.id = id;
        $(insertarAntesDe).before(elemento);
    }

    obtenerJSON() {
            this.query = document.getElementById("busqueda").value;
            this.crearElemento("h2", "Noticias relevantes");
            this.cargarDatos();
            $("button").attr("disabled", "disabled");
            
        }

    habilitarBoton(){
        this.busqueda = document.getElementById("busqueda").value;
        if(this.busqueda!=""){
           document.getElementById("buscar").disabled=false;
        }
        else{
            document.getElementById("buscar").disabled=true;
        }
    }



    }
var noticias = new Noticias();