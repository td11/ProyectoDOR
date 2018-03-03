//VARIABLES GLOBALES
var listadoButacas = [];
const FILAS = 2,
    COLUMNAS = 4;
var cantidadButacas = 8;
var butacasSeleccionadas = 0;



/**
 * Carga los datos del fichero JSON externo para modificar el estado de los asientos.
 */
/* function cargaReservas() {

    var cantidadAsientos, almacenamiento = (localStorage.length == 0);
    (almacenamiento ? cantidadAsientos = (COLUMNAS * FILAS) : cantidadAsientos = localStorage.length);

    for (let i = 1; i <= cantidadButacas; i++) {
        if (!almacenamiento) {
            let obj = JSON.parse(localStorage.getItem('objeto' + i));
            listadoButacas.push({
                'iden': obj.iden,
                'clase': obj.clase
            });
        } else {
            listadoButacas.push({
                'iden': 'butaca' + i,
                'clase': 'disponible'
            });
        }
    }
} */

/**
 * Cargamos las butacas
 */
function cargaEscenario() {

    var svgNS = "http://www.w3.org/2000/svg";
    var svg = document.createElementNS(svgNS, "svg");
    var xlink = "http://www.w3.org/1999/xlink";

    let contenedor = document.getElementById('butaca');

    let contador = 1;

    var rect = document.createElementNS(svgNS, 'rect');
    rect.setAttribute('style', 'stroke:#000000;stroke-width:3;stroke-linecap:round;stroke-linejoin:round;stroke-miterlimit:4;stroke-dasharray:none;stroke-opacity:1;paint-order:stroke fill markers');
    rect.setAttribute('id', 'rect817');
    rect.setAttribute('x', 0);
    rect.setAttribute('y', 10);
    rect.setAttribute('width', 60);
    rect.setAttribute('height', 20);
    rect.setAttribute('ry', '4.4099426');

    svg.appendChild(rect);

    rect = document.createElementNS(svgNS, 'rect');
    rect.setAttribute('style', 'stroke:#000000;stroke-width:3;stroke-linecap:round;stroke-linejoin:round;stroke-miterlimit:4;stroke-dasharray:none;stroke-opacity:1;paint-order:stroke fill markers');
    rect.setAttribute('id', 'rect821');
    rect.setAttribute('x', 10);
    rect.setAttribute('y', 3);
    rect.setAttribute('width', 46);
    rect.setAttribute('height', 26);
    rect.setAttribute('ry', '4.2763014');

    svg.appendChild(rect);

    for (let i = 1; i <= FILAS; i++) {
        for (let j = 1; j <= COLUMNAS; j++) {
            var butaca = document.createElementNS("http://www.w3.org/2000/svg", "use");

            butaca.setAttribute('id', 'butaca' + contador);
            butaca.setAttribute('title', i + '-' + j);
            butaca.setAttribute('class', listadoButacas[contador - 1].clase);
            butaca.setAttribute('y', (i * 95));
            butaca.setAttribute('x', (j * 95));


            butaca.setAttributeNS(xlink, 'xlink:href', '#layer1');
            butaca.appendChild(svg);

            contenedor.appendChild(butaca);
            contador++;
        }
    }
}

/**
 * Carga los eventos para cada butaca
 */
function cargaEventos() {

    document.getElementById('guardar').addEventListener('click', function () {
        contarNumeroButacasReservadas();
        gestionReservas('guardar');
    }, false);

    document.getElementById('limpiar').addEventListener('click', function () {
        gestionReservas('limpiar');
    }, false);
    

    for (let i = 1; i <= listadoButacas.length; i++) {
        document.getElementById('butaca' + i).addEventListener('click', function () {
            let clase = this.getAttribute('class');

            switch (clase) {
                case 'disponible':
                    this.setAttribute('class', 'seleccionado');
                    break;
                case 'seleccionado':
                    this.setAttribute('class', 'disponible');
                    break;
                case 'reservado':
                    alert('Este asiento esta reservado');
                    butacasSeleccionadas = butacasSeleccionadas + 1;
                    break;
            }

        }, false);
    }

}


/**
 * Guarda o cancela las reservas.
 */
function gestionReservas(opcion) {

    for (let i = 1; i <= cantidadButacas; i++) {
        let elem = document.getElementById('butaca' + i);
        let clase = elem.getAttribute('class');
        if (opcion == 'guardar') {
            if (clase == 'seleccionado') {
                elem.setAttribute('class', 'reservado');
            }
        } else {
            elem.setAttribute('class', 'disponible');
        }
        var obj = {
            'iden': elem.id,
            'clase': elem.getAttribute('class')
        };
        localStorage.setItem('objeto' + i, JSON.stringify(obj));
    }

    $('#contenedorButacas').hide();
    $('#formularioPago').show();
}

function contarNumeroButacasReservadas(){
    var butacasReservadas = $('#butaca .seleccionado');
    butacasSeleccionadas = butacasReservadas.length;
}

/* Mostrar detalles de pago */
function mostrarDetallesDePago() {
    var precioValor = precioSeleccionado.split('-');
    var contenedor = $('#confirmacionPago');
    var titulo = $('<h3>Confirmacion de pago</h3>');
    var pagoTotal = $('<span>Pago a realizar: ' + parseFloat(precioValor[1]) * parseFloat(butacasSeleccionadas) + '</span><br>');
    var numeroDeEntradas = $('<span>Numero de entradas: ' + butacasSeleccionadas + '</span><br>');
    var pagoPorEntrada = $('<span>Precio de entrada: ' + precioSeleccionado + '</span><br>');
    $('#formularioPago').hide();
    var d = new Date();
    var month = d.getMonth() + 1;
    var day = d.getDate();
    var fecha = d.getFullYear() + '/' +
        (month < 10 ? '0' : '') + month + '/' +
        (day < 10 ? '0' : '') + day;
    var horario = $('<span>Fecha:'+fecha+' horario:'+horarioSeleccionado+'</span><br>');
    contenedor.append(titulo);
    contenedor.append(numeroDeEntradas);
    contenedor.append(pagoPorEntrada);
    contenedor.append(pagoTotal);
    contenedor.append(horario);
    contenedor.show();

}
