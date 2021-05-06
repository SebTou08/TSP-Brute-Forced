var ciudades = [];
var totalCiudades = 4;
var distanciaRecord;
var mejorOrden;
var orden = [];
var permutacionesTotales = [];
var contador = 0;
var c = 0;

var longi_tud = [];
var lati_tud = [];

async function readable() {

    const response = await fetch('a.csv');
    const data = await response.text();
    const rows = data.split('\n').slice(1);
    rows.forEach(elt => {
        const row = elt.split(';');
        const centropoblado = row[0];
        const longitud = row[4];
        const lati = row[5];
        longi_tud.push(longitud);
        lati_tud.push(lati);

    })

}




function setup() {
    readable();

    createCanvas(800, 800);
    // NOTE asignando ciudades
    var pedregalBajo = createVector(-4.882495, -80.385018);
    var narihuala = createVector(-5.291134, -80.687515);
    var sacobsa = createVector(15, 20);
    var bellavista = createVector(105, 200);

    ciudades[0] = pedregalBajo;
    ciudades[1] = narihuala;
    ciudades[2] = sacobsa;
    ciudades[3] = bellavista;

    //NOTE asignando indices al verctor [(0),(1),(2),(3)...]
    for (var i = 0; i < totalCiudades; i++) {
        orden[i] = i;
    }

    var d = CalcularDistancia(ciudades, orden);
    distanciaRecord = d;
    mejorOrden = orden.slice();
    permutacionesTotales = Factorial(totalCiudades);
    console.log(longi_tud);
    console.log(lati_tud);

}

function draw() {

    //frameRate(1);
    background(0);
    DibujarElipse();
    DibujarLineas();
    CalcularMejorOrden();
    SiguienteOrdenLexicografico();
    Porcentaje();

}


function CalcularMejorOrden() {

    var d = CalcularDistancia(ciudades, orden);
    if (d == distanciaRecord && c > 0) {
        console.log("Uno de los mejores recorridos es : " + orden);
    }
    if (d < distanciaRecord) {
        distanciaRecord = d;
        mejorOrden = orden.slice();
    }
    c++;
}



function SiguienteOrdenLexicografico() {
    contador++;
    //LINK https://www.quora.com/How-would-you-explain-an-algorithm-that-generates-permutations-using-lexicographic-ordering
    //* ANCHOR  STEP 1: Find the largest x such that P[x]<P[x+1].

    var masLargoX = -1;
    for (var i = 0; i < orden.length - 1; i++) {
        if (orden[i] < orden[i + 1]) {
            masLargoX = i;
        }
    }
    if (masLargoX == -1) {
        noLoop();
        console.log("Terminado Satisfactoriamente");
        ImprimirMejores(mejorOrden);

    }

    //*ANCHOR STEP 2:   Find the largest y such that P[x]<P[y].

    var masLargoY = -1;
    for (var j = 0; j < orden.length; j++) {
        if (orden[masLargoX] < orden[j]) {
            masLargoY = j;
        }
    }

    //* ANCHOR STEP 3: Swap P[x] and P[y]

    Swap(orden, masLargoX, masLargoY);

    //* ANCHOR STEP 4: Reverse P[x+1 .. n].

    var finalArreglo = orden.splice(masLargoX + 1);
    finalArreglo.reverse();
    orden = orden.concat(finalArreglo);

}



function ImprimirMejores(_mejorOrden) {

    for (var i = 0; i < _mejorOrden.length; i++) {
        console.log(ciudades[_mejorOrden[i]]);
    }
}