var gridSize = 16;
var maxGridSize = 25;
var rectSide;

var centerx = window.innerHeight/2;
var centery = window.innerHeight/2;

rectSide = window.innerHeight/gridSize;

var graphs = [];

var nextGraphId = 1;

var lastGraphsLength = graphs.length;
var interfaceHandler = new InterfaceHandler();

var data = JSON.parse($("#saving-area").val());
for (var elem of data) {
    graphs.push(new Graph(elem.textfunc, elem.name, elem.id, elem.m, elem.k, elem.b, elem.n, elem.d));
    graphs[graphs.length-1].selected = elem.selected;
    for (var dot of elem.dots) {
        graphs[graphs.length-1].dots.push(new Dot(dot.x, dot.y));
    }
    interfaceHandler.addGraph();
}

nextGraphId = graphs[graphs.length-1].id+1;

function setup() {
    createCanvas(window.innerHeight, window.innerHeight);
}

function draw() {
    background(0, 0, 0);
    drawingCoordinateSystem();

    for (var graph of graphs) {
        graph.update();
    }

    interfaceHandler.update();

    lastGraphsLength = graphs.length;

    $("#saving-area").val(JSON.stringify(graphs));
    $("#preview").val($("#defaultCanvas0")[0].toDataURL("image/jpeg"))
}

function mouseWheel(event) {
    if (event.target == $("#defaultCanvas0")[0]) {
        if (event.delta > 0) {
            if (gridSize < 50) {
                gridSize += 2;
            }
            
        }
        if (event.delta < 0) {
            if (gridSize > 4) {
                gridSize -= 2;
            }
            
        }
    }
}

function mouseClicked() {
    for (var graph of graphs) {
        for (var dot of graph.dots) {
            if (dot.selected) {
                interfaceHandler.updateDotInformation(dot.giveInfo());
            } 
        }
    }
}


function drawingCoordinateSystem() {
    rectSide = window.innerHeight/gridSize;

    // drawing grid
    for (var i = 0; i < gridSize; i++) {
        for (var j = 0; j < gridSize; j++){
            stroke(100, 100, 100);
            strokeWeight(1);
            noFill();
            rect(rectSide*i, rectSide*j, rectSide, rectSide);
        }
        
    }

    // lines x, y
    stroke(255, 255, 255);
    strokeWeight(4);
    line(centerx, 0, centerx, window.innerHeight);
    line(0, centery, window.innerHeight, centery);
    strokeWeight(1);
    textSize(30);
    
    var yCord = centerx*2-20;
    var xCord = centery*2-(centery*2-30);
    if (centerx*2 < window.innerHeight) {
        yCord = window.innerHeight-20
    }
    if (centery*2 > window.innerHeight) {
        var xCord = 30;
    }
    text('y', centerx+10, xCord);
    text('x', yCord-20, centery+25); 
}