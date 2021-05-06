// ANCHOR calcular distancia
function CalcularDistancia(puntos, orden) {
    //NOTE se asigna un punto y el siguiente nodo de ese punto 
    // calular las distancias. Nodo 1= A, Nodo 2 =b 
    var distanciaTotal = 0;
    for (var i = 0; i < orden.length - 1; i++) {
        var indexCiudad_A = orden[i];
        var ciudad_A = puntos[indexCiudad_A];
        var indexCiudad_B = orden[i + 1];
        var ciudad_B = puntos[indexCiudad_B];
        var d = dist(ciudad_A.x, ciudad_A.y, ciudad_B.x, ciudad_B.y);
        distanciaTotal += d;
    }
    return distanciaTotal;
}



//ANCHOR funcion para calcular el factorial de un numero 
function Factorial(n) {
    if (n == 1) {
        return 1;
    } else {
        return n * Factorial(n - 1);
    }
}


//ANCHOR fun para cambiar (medio obvio) 
function Swap(a, i, j) {
    var tmp = a[i];
    a[i] = a[j];
    a[j] = tmp;
}


//? ANCHOR funs para dibujar el circu

function DibujarElipse() {
    fill(255);
    for (var i = 0; i < orden.length; i++) {
        ellipse((ciudades[i].x) + 50, (ciudades[i].y) + 50, 8, 8);
    }
}

function DibujarLineas() {
    //STUB dibujo de arriba 
    stroke(255);
    strokeWeight(1);
    noFill();
    beginShape();
    for (var i = 0; i < orden.length; i++) {
        var n = orden[i];
        vertex(ciudades[n].x, ciudades[n].y);
    }
    endShape();
    //STUB dibujo de abajo
    stroke(255, 0, 255);
    strokeWeight(4);
    noFill();
    beginShape();
    for (var i = 0; i < orden.length; i++) {
        var n = mejorOrden[i];
        vertex(ciudades[n].x, ciudades[n].y);
    }

    endShape();
}

//ANCHOR mostrar porcentaje 
function Porcentaje() {
    var porcentaje = 100 * (contador / permutacionesTotales);
    fill(255);

    text(nf(porcentaje, 0, 2) + " Completado", 20, height / 2 - 50);
}