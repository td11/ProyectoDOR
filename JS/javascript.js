var titulopelicula = "";
var id = "";
var horarios = "";
var precios = "";
let precioSeleccionado, horarioSeleccionado;
var btnReservarYa = $('#btnReservarYa');

/* Inicio */
$(function () {

    $("#contenedorButacas").hide();
    $('#formularioPago').hide();
    

    $('img').keyup(function (e) {
        if (e.keyCode == 13) {
            ventanaModal(this);
        }
    });

    $('.close').keyup(function (e) {
        if (e.keyCode == 13) {
            cerrarModal();
        }
    });

    $('#btnIrButacas').on('click', function (event) {
        esconderContenidoModal();
        mostrarReservaEntradas();
        llamadaButacas();
        horarioSeleccionado = $('#horarios select option:selected').text();
        precioSeleccionado = $('#precios select option:selected').text();

    });

    btnReservarYa.on('click', function (event) {
        mostrarDetallesDePago();
    });


});

//Llamada a funciones de butacas
function llamadaButacas() {
    //cargaEscenario();
    cargaEventos();
}



/* Reserva de entradas */
function mostrarReservaEntradas() {
    var contenedorButacas = $('#contenedorButacas');
    contenedorButacas.show();
}


/* Cargar ventana modal */
function ventanaModal(elemento) {
    limpiarVentanaModal();
    id = $(elemento).attr("id");
    $("body .modal").css('display', 'block');
    $.getJSON("JS/datosimagenes.json", function (json) {
        horarios = json.datosImagenes[parseInt(id)].horario.split("/");
        precios = json.datosImagenes[parseInt(id)].precio.split("/");
        $(".modal-header #tituloPelicula").append("<span>" + json.datosImagenes[parseInt(id)].titulo + "</span>");
        $(".modal-body #sinopsis").append("<p>" + json.datosImagenes[parseInt(id)].sinopsis + "</p>");
        llenarComboHorarios();
        llenarComboPrecios();
    });
}

function llenarComboHorarios() {
    var combo = $('#horarios select');
    for (var i = 0; i < horarios.length; i++) {
        var select = $('<option></option>');
        var span = horarios[i];
        select.append(span);
        select.attr('value', horarios[i]);
        combo.append(select);
    }
}

function llenarComboPrecios() {
    var combo = $('#precios select');
    for (var i = 0; i < precios.length; i++) {
        var select = $('<option></option>');
        var span = precios[i];
        var precioValor = precios[i].split('-');
        select.append(span);
        select.attr('value', precioValor[1]);
        combo.append(select);
    }
}



/* Cerrar modal */
function cerrarModal() {
    $("body .modal").css('display', 'none');
    $("#contenido form").css('display', 'block');
    $('#contenedorButacas').hide();
    $('#formularioPago').hide();
    $('#confirmacionPago').hide();
    $('#confirmacionPago').children().remove();
    $('#sinopsis').show();
    $('#horarios').show();
    $('#precios').show();
    $('#btnIrButacas').show();
}

/* Vaciar ventana modal */
function limpiarVentanaModal() {
    $(".modal-header #tituloPelicula span").remove();
    $("#contenido p").remove();
}

function esconderContenidoModal() {
    $("#contenido").children().hide();
}

/* Slider */
var slideIndex = 1;
showDivs(slideIndex);

function plusDivs(n) {
    showDivs(slideIndex += n);
}

function showDivs(n) {
    var i;
    var x = document.getElementsByClassName("mySlides");
    if (n > x.length) {
        slideIndex = 1
    }
    if (n < 1) {
        slideIndex = x.length
    }
    for (i = 0; i < x.length; i++) {
        x[i].style.display = "none";
    }
    x[slideIndex - 1].style.display = "block";
}


/* Graficos */


// Callback that creates and populates a data table,
// instantiates the pie chart, passes in the data and
// draws it.
function drawChart() {

    // Create the data table.
    var data = new google.visualization.DataTable();
    data.addColumn('string', 'Topping');
    data.addColumn('number', 'Slices');
    data.addRows([
          ['Blade Runner 2049', votos[0]],
          ['John Wick 2', votos[1]],
          ['Jumanji', votos[2]],
          ['La Liga de la Justicia', votos[3]],
          ['El Rey Arturo', votos[4]],
          ['Logan', votos[5]],
          ['Mazinger Z', votos[6]],
          ['Star Wars TLJ', votos[7]],
          ['Thor Ragnarok', votos[8]],
          ['Valerian', votos[9]]
    ]);

    // Set chart options
    var options = {
        'title': 'Votaciones Mejor Pelicula del año',
        'width': 400,
        'height': 300
    };

    // Instantiate and draw our chart, passing in some options.
    var chart = new google.visualization.PieChart(document.getElementById('chart_div'));
    chart.draw(data, options);
}

// dibujar grafico donut
function drawDonut() {
    // Create the data table.
    var data = new google.visualization.DataTable();
    data.addColumn('string', 'Topping');
    data.addColumn('number', 'Slices');
    data.addRows([
          ['Blade Runner 2049', votos[0]],
          ['John Wick 2', votos[1]],
          ['Jumanji', votos[2]],
          ['La Liga de la Justicia', votos[3]],
          ['El Rey Arturo', votos[4]],
          ['Logan', votos[5]],
          ['Mazinger Z', votos[6]],
          ['Star Wars TLJ', votos[7]],
          ['Thor Ragnarok', votos[8]],
          ['Valerian', votos[9]]
    ]);

    var options = {
        title: 'Votos mejor pelicula del año segundo grafico',
        pieHole: 0.4,
    };

    var chart = new google.visualization.PieChart(document.getElementById('donutchart'));
    chart.draw(data, options);
}
