// sleep
function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

// tab works
function openTab(evt, tabName) {
    // declare all variables
    var i, tabcontent, tablinks;

    // get all elements with class="tabcontent" and hide them
    tabcontent = document.getElementsByClassName("tabcontent");
    for (i = 0; i < tabcontent.length; i++) {
        tabcontent[i].style.display = "none";
    }

    // get all elements with class="tablinks" and remove the class "active"
    tablinks = document.getElementsByClassName("tablinks");
    for (i = 0; i < tablinks.length; i++) {
        tablinks[i].className = tablinks[i].className.replace(" active", "");
    }

    // show the current tab, and add an "active" class to the button that opened the tab
    document.getElementById(tabName).style.display = "block";
    evt.currentTarget.className += " active";

    if (tabName === "SaveOpen") {
        fillFilesList()
    }

    console.log("open tab " + tabName);
}

// save graph
async function saveGraph() {
    validateGraphName(document.getElementById('save-file-id'));
    var name = document.getElementById('save-file-id').value;
    var graphData = {
        name: name,
        data: {
            nodes: nodes.get(),
            edges: edges.get()
        }
    };
    fetch('/save_graph', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(graphData)
    })
        .then(response => response.json())
        .catch(error => console.error('Ошибка:', error));
    // add graph name in select
    await sleep(1000);
    fillFilesList()
    console.log("save graph button click");
    addRecordHistory("сохранение графа " + name);
}

// open graph
function openGraph() {
    var name = document.getElementById('open-file-id').value;
    fetch('/open_graph/' + name)
        .then(response => {
            if (!response.ok) {
                addRecordHistory("граф " + name + " не найден");
                throw new Error('Граф не найден');
            }
            return response.json();
        })
        .then(data => {
            nodes.clear();
            edges.clear();
            json_graph = JSON.parse(data.data)
            json_graph.nodes.forEach(node => nodes.add(node));
            json_graph.edges.forEach(edge => edges.add(edge));
            temp_max_node_id = Math.max(...nodes.getIds());
            temp_max_edge_id = Math.max(...edges.getIds());
            addRecordHistory("граф " + name + " открыт");
        })
        .catch(error => alert('Ошибка: ' + error.message));
    console.log("open graph button click");
}

// fill graph files
function fillFilesList() {
    fetch('/get_graphs_name')
        .then(response => response.json())
        .then(data => {
            var selectList = document.getElementById('open-file-id');
            selectList.innerHTML = '';
            data.names.forEach(name => {
                option = document.createElement('option');
                option.text = name;
                selectList.add(option);
            })
        })
        .catch(error => alert('Ошибка: ' + error.message));
}

// delete graph
async function deleteGraph() {
    var name = document.getElementById('open-file-id').value;
    fetch('/delete_graph/' + name)
        .catch(error => alert('Ошибка: ' + error.message));
    await sleep(1000);
    fillFilesList()
    console.log("delete graph button click");
    addRecordHistory("граф " + name + " удален");
}

// clean graph
function cleanGraph() {
    nodes.clear();
    edges.clear();
    temp_max_node_id = -1;
    temp_max_edge_id = -1;
    console.log("clean graph button click");
    addRecordHistory("граф очищен");
}

// on/off physics
function togglePhysics() {
    options.physics.enabled = document.getElementById('physicsToggle').checked;
    console.log(document.getElementById('physicsToggle').checked);
    network.setOptions(options);
    console.log("graph phisics box click");
    addRecordHistory("значение физики изменено");
}

// edit node
function editNode() {
    var id = parseInt(document.getElementById('node-id').value);
    var label = document.getElementById('node-label').value;
    var shape = document.getElementById('node-shape').value;
    var color = document.getElementById('node-color-text').value;

    var node = nodes.get(id);

    node.label = label;
    node.shape = shape;
    node.color.border = color;
    node.color.background = color;

    nodes.update(node);
    console.log("edit node button click");
    addRecordHistory("узел " + id + " изменен");
}

// find node
function findNode() {
    validateIntInput(document.getElementById('node-id-find'));
    var nodeId = parseInt(document.getElementById('node-id-find').value);
    if (nodeId !== null && nodeId !== undefined) {
        var node = nodes.get(nodeId);
        addRecordHistory("поиск узла " + nodeId);
        if (node) {
            addRecordHistory("узел " + nodeId + " найден");
            network.selectNodes([nodeId])
            if (node.id !== null && node.id !== undefined) {
                document.getElementById('node-id').value = node.id;
            }
            if (node.label) {
                document.getElementById('node-label').value = node.label || '';
            }
            if (node.shape) {
                document.getElementById('node-shape').value = node.shape || '';
            }
            if (node.color) {
                if (node.color.border) {
                    document.getElementById('node-color-text').value = node.color.border || '';
                }
            }
        }
        else {
            addRecordHistory("узел " + nodeId + " не найден");
        }
    }
    console.log("find node button click");
}

// edit edge
function editEdge() {
    var id = parseInt(document.getElementById('edge-id').value);
    var to = document.getElementById('edge-to').value;
    var from = document.getElementById('edge-from').value;
    var color = document.getElementById('edge-color-text').value;

    var edge = edges.get(id);

    edge.to = to;
    edge.from = from;
    edge.color.color = color;

    edges.update(edge);
    console.log("edit edge button click");
    addRecordHistory("ребро " + id + " изменено");
}

// find edge
function findEdge() {
    validateIntInput(document.getElementById('edge-id-find'));
    var edgeId = parseInt(document.getElementById('edge-id-find').value);
    if (edgeId !== null && edgeId !== undefined) {
        var edge = edges.get(edgeId);
        console.log(edge)
        addRecordHistory("поиск ребра " + edgeId);
        if (edge) {
            addRecordHistory("ребро " + edgeId + " найдено");
            network.selectEdges([edgeId])
            if (edge.id !== null && edge.id !== undefined) {
                document.getElementById('edge-id').value = edge.id;
            }
            if (edge.to !== null && edge.to !== undefined) {
                document.getElementById('edge-to').value = edge.to;
            }
            if (edge.from !== null && edge.from !== undefined) {
                document.getElementById('edge-from').value = edge.from;
            }
            if (edge.color) {
                if (edge.color.color) {
                    document.getElementById('edge-color-text').value = edge.color.color || '';
                }
            }
        }
        else {
            addRecordHistory("ребро " + edgeId + " не найдено");
        }
    }
    console.log("find edge button click");
}

// add record in history
function addRecordHistory(action) {
    var action_time = new Date();
    var new_record = "[" + action_time.getDate() + "/"
                        + getMonthName(action_time.getMonth()) + "/"
                        + action_time.getFullYear() + " "
                        + action_time.getHours() + ":" 
                        + action_time.getMinutes() + ":" 
                        + action_time.getSeconds() + "] - " 
                        + action + "\n";
    old_records = document.getElementById('history-list').value;
    document.getElementById('history-list').value = new_record + old_records;
}

// get month in word
function getMonthName(month){
    var month_names = [
        "Январь", "Февраль", "Март", "Апрель", "Май", "Июнь", 
        "Июль", "Август", "Сентябрь", "Октябрь", "Ноябрь", "Декабрь"
    ];
    return month_names[month];
}

// clean history
function cleanHistory() {
    document.getElementById('history-list').value = "";
    console.log("clean history button click");
}

// validator for int input
function validateIntInput(field) {
    field.value = field.value.replace(/\D/g, '');
}

// validator for name graph
function validateGraphName(field) {
    field.value = field.value.replace(/[^\wа-яёА-ЯЁ]/g, '');
    if (field.value.trim().length === 0) {
        field.value = "default";
    }
}

// on/off random color of node
function randomNodeColor() {
    random_node_color = document.getElementById('randomNodeColor').checked;
    console.log("node random-color box click");
}

// on/off random color of edge
function randomEdgeColor() {
    random_edge_color = document.getElementById('randomEdgeColor').checked;
    console.log("edge random-color box click");
}
