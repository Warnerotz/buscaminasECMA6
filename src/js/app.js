import _ from 'lodash';

window.onload = function () {
    //variable que controla el nivel de dificultad
    var nivel = 0;
    //variable que controla la longitud del teclado
    var longitud = 0;
    //variable que controla el numero de bombas
    var numBombas = 0;
    //variable para la matriz con la que crearemos el tablero de juego.
    var minas = [];
    var minasVacia = [];
    //variable que controla el numero de bombas acertadas
    var numAciertos = 0;
    //variable que controla el numero de espacios vacios descubiertos
    var casillasNoBomba = 0;
    //variables para las imagenes
    var blanco;
    var bandera;
    var fallo;
    var valor0;
    var valor1;
    var valor2;
    var valor3;
    var valor4;
    var valor5;
    var valor6;
    var valor7;
    var valor8;
    //--------------------------

    //funcion que crea las imagenes
    crearImagenes();
    //listener para el nivel principiante que llama a la funcion crearTablero y le manda el numero de filas y columnas.
    document.getElementById("prin").addEventListener("click", iniciarJuego, false)


    document.getElementById("inter").addEventListener("click", iniciarJuego, false)

    function iniciarJuego() {

        if (this.id == "prin") {
            nivel = 1;
        } else {

            nivel = 2;
        }

        comprobarNivel();
        minasVacia = iniMatrizMinas();
        minas = generadorBombas(minasVacia);
        comprobarMinasAl();
        crearTablero();
        //crearTablero2();
    }

    function contadorMinas(matriz) {
        //--------------------------
        var contador = 0;
        var contador0 = 0;
        for (var i = 0; i < longitud; i++) {
            for (var j = 0; j < longitud; j++) {
                if (matriz[i][j] == "*") {
                    contador++;
                } else
                    contador0++;
            }

        }
        alert("numero de minas introducidas:111" + contador);
        alert("numero de 0 introducidas:" + contador0);
        //-----------------------------------

    }
    //funcion que segun el nivel pone el tamaño del grid y el numero de bombas.
    function comprobarNivel() {

        switch (nivel) {
            case 1:
                longitud = 9;
                numBombas = 10;

                break;
            case 2:
                longitud = 10;
                numBombas = 15
                break;
        }

        casillasNoBomba = (longitud * longitud) - numBombas;
    }

    function crearTablero() {
        //creamos la tabla y le asignamos las clases y atributos q necesitemos
        var div = document.createElement("div");
        var tabla = document.createElement("table");
        tabla.setAttribute("id", "tablaTablero");
        //bucle para introducir filas y columnas.
        for (var i = 0; i < longitud; i++) {
            var fila = document.createElement("tr");
            for (var j = 0; j < longitud; j++) {
                var columna = document.createElement("td");
                columna.setAttribute("id", i + "_" + j);
                columna.setAttribute("class", "celdas");
                var DOM_img = document.createElement("img");
                DOM_img.setAttribute("id", "imagen-" + i + "_" + j);
                DOM_img.src = "img/facingDown.png";
                //hacemos que el input cuelgue del td.
                columna.appendChild(DOM_img);
                //hacemos que el td cuelgue de la fila.
                fila.appendChild(columna);
            }
            tabla.appendChild(fila);
        }

        document.getElementById("tablero").appendChild(tabla);
        crearListeners();
    }
    //montar matriz numeros
       function crearTablero2() {
        //creamos la tabla y le asignamos las clases y atributos q necesitemos
        var div = document.createElement("div");
        var tabla = document.createElement("table");
        tabla.setAttribute("id", "tablaTablero");
        //bucle para introducir filas y columnas.
        for (var i = 0; i < longitud; i++) {
            var fila = document.createElement("tr");
            for (var j = 0; j < longitud; j++) {
                var columna = document.createElement("td");
                columna.setAttribute("id", i + "_" + j);
                columna.setAttribute("class", "celdas");
                var DOM_img =minas[i][j];
                DOM_img.setAttribute("id", "imagen-" + i + "_" + j);
                DOM_img.src = "img/facingDown.png";
                //hacemos que el input cuelgue del td.
                columna.appendChild(DOM_img);
                //hacemos que el td cuelgue de la fila.
                fila.appendChild(columna);
            }
            tabla.appendChild(fila);
        }

        document.getElementById("tablero").appendChild(tabla);
        crearListeners();
    }
    
    
    function iniMatrizMinas() {
        var matriz = [];
        for (var i = 0; i < longitud; i++) {
            matriz[i] = [];
        }

        // ponemos el valor de cada celda de la matriz
        for (var i = 0; i < longitud; i++) {
            for (var j = 0; j < longitud; j++) {
                matriz[i][j] = 0;
            }
        }
        return matriz


    }

    function generadorBombas(matriz) {
        var aux = numBombas;

        while (aux > 0) {

            var randFila = Math.floor((Math.random() * longitud));
            var randCol = Math.floor((Math.random() * longitud));

            if (matriz[randFila][randCol] == 0) {
                matriz[randFila][randCol] = "*";
                aux--;

            }

        }

        return matriz;


    }

    //funcion que evalua unas coordenadas y si hay bomba suma 1 y si no hay bomba o se sale del rango de la matriz suma 0
    function sumatorioBombas(coordX, coordY) {
        var sumatorio = 0;
        if (coordX < 0 || coordX >= longitud || coordY < 0 || coordY >= longitud) {
            sumatorio = 0;

        } else {
            if (minas[coordX][coordY] == "*") {
                sumatorio = 1;

            }
        }
        return sumatorio;

    }

    //funcion que suma los numeros de las casillas adyacentes a la casilla evaluadada
    function calcularMinasAlrededor(coordX, coordY) {

        var minasAlrededor =
            sumatorioBombas(coordX - 1, coordY - 1) +
            sumatorioBombas(coordX - 1, coordY) +
            sumatorioBombas(coordX - 1, coordY + 1) +
            sumatorioBombas(coordX, coordY - 1) +
            sumatorioBombas(coordX, coordY) +
            sumatorioBombas(coordX, coordY + 1) +
            sumatorioBombas(coordX + 1, coordY - 1) +
            sumatorioBombas(coordX + 1, coordY) +
            sumatorioBombas(coordX + 1, coordY + 1);
        //alert(minasAlrededor);
        return minasAlrededor;

    }

    //funcion que recorre todo el array y en cada casilla comprobamos cuantas bombas tiene alrededor
    function comprobarMinasAl() {

        for (var i = 0; i < longitud; i++) {
            for (var j = 0; j < longitud; j++) {
                if (minas[i][j] == "*") {
                    minas[i][j] = calcularMinasAlrededor(i, j);
                }
            }
        }
    }


    function clickIzquierdo(event) {
        var evento = event || window.Event;

        if (evento.button == 0 && (document.getElementById("imagen-" + this.id).src == blanco.src)) {
            var coorMatriz = this.id.split("_");
            var x = coorMatriz[0];
            var y = coorMatriz[1];
            mostrarTablero(x, y);

        }


    }

    function clickDerecho(event) {}

    function mostrarTablero(coordX, coordY) {
        if (coordX >= 0 && coordX < longitud && coordY >= 0 && coordY < longitud && (document.getElementById("imagen-" + coordX + "_" + coordY).src == blanco.src)) {
            var valor = minas[coordX][coordY];
            
            switch (valor) {
                case 1:
                    document.getElementById("imagen-" + coordX + "_" + coordY).src = valor1.src;
                    break;
                case 2:
                    document.getElementById("imagen-" + coordX + "_" + coordY).src = valor2.src;
                    break;
                case 3:
                    document.getElementById("imagen-" + coordX + "_" + coordY).src = valor3.src;
                    break;
                case 4:
                    document.getElementById("imagen-" + coordX + "_" + coordY).src = valor4.src;
                    break;
                case 5:
                    document.getElementById("imagen-" + coordX + "_" + coordY).src = valor5.src;
                    break;
                case 6:
                    document.getElementById("imagen-" + coordX + "_" + coordY).src = valor6.src;
                    break;
                case 7:
                    document.getElementById("imagen-" + coordX + "_" + coordY).src = valor7.src;
                    break;
                case 8:
                    document.getElementById("imagen-" + coordX + "_" + coordY).src = valor8.src;
                    break;
                case 0:
                    document.getElementById("imagen-" + coordX + "_" + coordY).src = valor0.src;
                    expansor(coordX, coordY);
                    break;
                case "*":
                    document.getElementById("imagen-" + coordX + "_" + coordY).src = fallo.src;
                    break;

            }

            casillasNoBomba--;

        }

    }
    // funcion para expandir la casilla de alrededor
    function expansor(coordX, coordY) {
       
        for (var i = parseInt(coordX) - 1; i <= parseInt(coordX) + 1; i++) {
            for (var j = parseInt(coordY) - 1; j <= parseInt(coordY) + 1; j++) {
                // anulamos mostrar lso rangos fuera de la cuadricula
                if (i >= 0 && i < longitud && j >= 0 && j < longitud) {
                    
                    if (document.getElementById("imagen-" + i + "_" + j).src == blanco.src && minas[i][j] != "*") {
                        console.log(document.getElementById("imagen-" + i + "_" + j).src);
                        console.log("blanco.src "+blanco.src);
                        console.log("minas[i][j] " +minas[i][j] );
                        console.log(i+" "+j);
                        mostrarTablero(i, j);

                    }

                }
            }
        }

    }

    function crearListeners() {
        for (var i = 0; i < longitud; i++) {
            for (var j = 0; j < longitud; j++) {
                document.getElementById(i + "_" + j).addEventListener('click', clickIzquierdo, false);
                document.getElementById(i + "_" + j).addEventListener('contextmenu', clickDerecho, false);
            }
        }
    }

    function crearImagenes() {
        // variables que recogen los iconos del juego
        blanco = new Image;
        blanco.src = "img/facingDown.png";

        bandera = new Image;
        bandera.src = "img/flagged.png";

        fallo = new Image;
        fallo.src = "img/fallo.gif";

        valor0 = new Image;
        valor0.src = "img/0.png";

        valor1 = new Image;
        valor1.src = "img/1.png";

        valor2 = new Image;
        valor2.src = "img/2.png";

        valor3 = new Image;
        valor3.src = "img/3.png";

        valor4 = new Image;
        valor4.src = "img/4.png";

        valor5 = new Image;
        valor5.src = "img/5.png";

        valor6 = new Image;
        valor6.src = "img/6.png";

        valor7 = new Image;
        valor7.src = "img/7.png";

        valor8 = new Image;
        valor8.src = "img/8.png";


    }




}