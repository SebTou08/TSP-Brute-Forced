var ciudades = [];
var totalCiudades = 1;
var distanciaRecord;
var mejorOrden;
var orden = [];
var permutacionesTotales = [];
var contador = 0;
var c = 0;

var longitudArray = [];
var latitudArray = [];
var distrito = [];


async function readable() {

    const response = await fetch('poblaciones.csv');
    const data = await response.text();
    const rows = data.split('\n').slice(1);
    rows.forEach(elt => {
        const row = elt.split(',');

        const _distrito = row[2];
        const _longitudString = row[4];
        const _latitudString = row[5];


        var longitudInt = parseFloat(_longitudString);
        var latitudInt = parseFloat(_latitudString);
        var distr = String(_distrito);

        longitudArray.push(longitudInt);
        latitudArray.push(latitudInt);
        distrito.push(distr);
        totalCiudades = longitudArray.length;

    })
}




async function setup() {


    await readable();

    var a = 0;
    createCanvas(800, 800);
    //NOTE asignando indices al verctor [(0),(1),(2),(3)...]
    for (var i = 0; i < totalCiudades; i++) {
        if (distrito[i] == "CHIMBOTE") {
            ciudades[a] = createVector(longitudArray[i], latitudArray[i]);
            orden[a] = a;
            a = a + 1;
        }
    }
    totalCiudades = a;

    var d = CalcularDistancia(ciudades, orden);
    distanciaRecord = d;
    mejorOrden = orden.slice();
    permutacionesTotales = Factorial(totalCiudades);


}

async function draw() {



    background(0);
    DibujarElipse();
    DibujarLineas();
    CalcularMejorOrden();
    SiguienteOrdenLexicografico();
    Porcentaje();

    //frameRate(1);


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
        console.log(mejorOrden);

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