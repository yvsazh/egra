class InterfaceHandler {
    constructor() {

    }

    addGraph() {
        var graph = graphs[graphs.length-1]
        var graphId = graph.id
        $(".graphs").append(`
            <div class="info-block" id="info-block-${graphId}" id_item = "${graphId}">
                <a class="graph-button" id_item = "${graphId}" id="graph-${graphId}" href="#">${graph.name} | ${graphId}</a>
                <a class="remove-graph-button" id_item = "${graphId}" id="remove-graph-${graphId}" href="#">-</a>
            </div>
        `)

        $(".modal-windows").append(`
            <div class="modal animate__animated animate__fadeInRight" id="modal-${graphId}" id_item="${graphId}">
                <div class="header" id="header-${graphId}">
                    <a style="float: right;" class="close-modal" id="close-modal-${graphId}" id_item="${graphId}" href="#">X</a>
                    <h3>Settings of <input class="header-input" minlength = "3" maxlength = "10" oninput="expandInput($(this))" type="text" id="rename-graph-${graphId}" id_item="${graphId}" value="${graph.name}"> graph:</h3>
                </div>
                <div class="settings">
                    <center style="align-self: center;">
                        <p style="font-size: 40px; margin-top: 60px;">
                            <input class="settings-input" oninput="updateGraph($(this))" type="number" id="m-${graphId}" id_item = "${graphId}" value="${graph.m}">
                            <select class="settings-select" onchange="updateGraph($(this))" id="select-func-${graphId}" id_item="${graphId}">
                                <option value="null" selected>func</option>
                                <option value="sqrt">sqrt</option>
                                <option value="cos">cos</option>
                                <option value="sin">sin</option>
                                <option value="tan">tan</option>
                                <option value="asin">asin</option>
                                <option value="acos">acos</option>
                            </select>
                            (<input class="settings-input" oninput="updateGraph($(this))" type="number" id="k-${graphId}" id_item = "${graphId}" value="${graph.k}">x<input class="settings-input-small" oninput="updateGraph($(this))" type="number" id="d-${graphId}" id_item = "${graphId}" value="${graph.d}"> + <input class="settings-input" oninput="updateGraph($(this))" type="number" id="b-${graphId}" id_item = "${graphId}" value="${graph.b}">) + <input class="settings-input" oninput="updateGraph($(this))" type="number" id="n-${graphId}" id_item = "${graphId}" value="${graph.n}"></p>
                        <br>
                        <br>
                    </center>
                </div>
            </div>    
        `)
        $(`#select-func-${graphId}`)[0].value = graph.textfunc;
    }

    updateDotInformation(info) {
        $("#dot-information-here").text(`Dot coordinates: (${info.x}, ${info.y})`);
    }

    update() {
        if (graphs.length > 0) {
            $("#your-graphs-here").css('display', "none");
        } else {
            $("#your-graphs-here").css('display', "block");
        }
    }
}

function expandInput(inputElement) {
    inputElement[0].style.width = (inputElement[0].value.length + 1) + "ch";
    var item_id = Number(inputElement.attr("id_item"));
    for (var graph of graphs) {
        if (graph.id == item_id) {
            graph.name = inputElement.val();
            $(`#graph-${item_id}`).text(`${graph.name} | ${graph.id}`)
        }
    }
}

function updateGraph(inputElement) {
    var item_id = Number(inputElement.attr("id_item"));
    var m = Number($(`#m-${item_id}`).val());
    var k = Number($(`#k-${item_id}`).val());
    var b = Number($(`#b-${item_id}`).val());
    var d = Number($(`#d-${item_id}`).val());
    var n = Number($(`#n-${item_id}`).val());

    var func = $(`#select-func-${item_id}`).val();

    for (var graph of graphs) {
        if (graph.id == item_id) {
            graph.m = m;
            graph.k = k;
            graph.b = b;
            graph.d = d;
            graph.n = n;

            graph.textfunc = func;
            graph.updateFunc();
        };
    }; 
}

// deleting graph
$(".graphs").on("click", ".remove-graph-button", function() {
    var item_id = Number($(this).attr("id_item"));
    for (var graph of graphs) {
        if (graph.id == item_id) {
            graphs.splice(graphs.indexOf(graph), 1);
            $(`#info-block-${item_id}`).remove();
            $(`#modal-${item_id}`).remove();
        };
    };
});

$(".modal-windows").on("click", ".close-modal", function() {
    var item_id = Number($(this).attr("id_item"));
    $(`#modal-${item_id}`).css("display", "none");
    $(`#modal-${item_id}`).removeClass("animate__fadeInRight");
    $(`#modal-${item_id}`).css("display", "block");
    $(`#modal-${item_id}`).addClass("animate__zoomOut");
    $(`.graph-button`).removeClass("active");
    for (var graph of graphs) {
        if (graph.id == item_id) {
            var notSelectFunc = (graph) => {graph.selected = false;$(`#modal-${item_id}`).css("display", "none")}
            setTimeout(notSelectFunc, 300, graph);
        };
    };
});

// selecting graph
$(".graphs").on("click", ".graph-button", function() {
    var item_id = Number($(this).attr("id_item"));
    $(`.graph-button`).removeClass("active");
    $(`.modal`).css("display", "none");
    
    for (var graph of graphs) {
        if (!graph.selected) {
            graph.selected = false;
            if (graph.id == item_id) {
                $(this).addClass("active");
                $(`#modal-${item_id}`).draggable({containment: "window", handle: `#header-${item_id}`});
                $(`#modal-${item_id}`).css("display", "none");
                $(`#modal-${item_id}`).removeClass("animate__zoomOut");
                $(`#modal-${item_id}`).css("display", "block");
                $(`#modal-${item_id}`).addClass("animate__fadeInRight");

                var selectFunc = (graph) => {graph.selected = true;}
                setTimeout(selectFunc, 10, graph);

            };
        } else {
            $(`#modal-${item_id}`).css("display", "none");
            $(`#modal-${item_id}`).removeClass("animate__fadeInRight");
            $(`#modal-${item_id}`).css("display", "block");
            $(`#modal-${item_id}`).addClass("animate__zoomOut");
            var notSelectFunc = (graph) => {graph.selected = false;$(`#modal-${item_id}`).css("display", "none")}
            setTimeout(notSelectFunc, 300, graph);
        }
    };
});

$("#custom").click(function() {
    var name = prompt("Enter name of your custom graph: ")
    if (name == "" || name == null) {name = "custom"}
    graphs.push(new Graph("null", name, nextGraphId, 1, 0, 0, 0, 1));
    graphs[graphs.length-1].init();
    nextGraphId++;

    interfaceHandler.addGraph();
});

// popular functions

$("#parabola").click(function() {
    graphs.push(new Graph("null", "parabola", nextGraphId, 1, 1, 0, 0, 2));
    graphs[graphs.length-1].init();
    nextGraphId++;

    interfaceHandler.addGraph();
});


$("#yx").click(function() {
    graphs.push(new Graph("null", "y = x", nextGraphId, 1, 1, 0, 0, 1));
    graphs[graphs.length-1].init();
    nextGraphId++;

    interfaceHandler.addGraph();
});

$("#hyperbolaGraph").click(function() {
    graphs.push(new Graph("null", "hyperbola", nextGraphId, 1, 1, 0, 0, -1));
    graphs[graphs.length-1].init();
    nextGraphId++;

    interfaceHandler.addGraph();
});

$("#sinGraph").click(function() {
    graphs.push(new Graph("sin", "sin graph", nextGraphId, 1, 1, 0, 0, 1));
    graphs[graphs.length-1].init();
    nextGraphId++;

    interfaceHandler.addGraph();
});

$("#cosGraph").click(function() {
    graphs.push(new Graph("cos", "cos graph", nextGraphId, 1, 1, 0, 0, 1));
    graphs[graphs.length-1].init();
    nextGraphId++;

    interfaceHandler.addGraph();
});

$(".delete_project-in").click(function(){
    $(this).css("display", "none");
    $(".are_you_sure").css("display", "block");
});

$(".delete_project-back").click(function() {
    $(".delete_project-in").css("display", "block");
    $(".are_you_sure").css("display", "none");    
});