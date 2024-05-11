// create an array with nodes
var nodes = new vis.DataSet([]);
var temp_max_node_id = -1;

// node color
var random_node_color = true;
var node_color;
  
// create an array with edges
var edges = new vis.DataSet([]);
var temp_max_edge_id = -1;

// edge color
var random_edge_color = true;
var edge_color;

// create a network
var container = document.getElementById("graph");
var data = {
    nodes: nodes,
    edges: edges,
};
var options = {
    physics: {
        enabled: false
    }
};
var network = new vis.Network(container, data, options);

// prev node for create edge
var prevNodeId = null;

// create node
network.on("doubleClick", function (params) {
    if (params.nodes.length === 0 && params.edges.length === 0) {
        temp_max_node_id++;

        var id = temp_max_node_id;
        var color = document.getElementById('default-node-color').value;
        if (random_node_color) {
            color = '#' + (Math.random().toString(16) + '000000').substring(2,8);
        }
        var newNode = {
            id: id,
            label: "Node " + id,
            color: {
                background: color,
                border: color
            },
            shape: 'circle'
        };
        nodes.add(newNode);
        addRecordHistory("узел " + id + " создан");
    }
});

// delete node
network.on("doubleClick", function (params) {
    if (params.nodes.length > 0) {
        var nodeId = params.nodes[0];
        var connected_edges = network.getConnectedEdges(nodeId);
        connected_edges.forEach(function(edgeId) {
            edges.remove({ id: edgeId });
        });
        nodes.remove({ id: nodeId });
        addRecordHistory("узел " + nodeId + " удален");
    }
});

// create edge
network.on("click", function (params) {
    if (params.nodes.length === 1) {
        var nodeId = params.nodes[0];
        if (prevNodeId !== null) {
            temp_max_edge_id++;

            var color = document.getElementById('default-edge-color').value;
            if (random_edge_color) {
                color = '#' + (Math.random().toString(16) + '000000').substring(2,8);
            }

            var id = temp_max_edge_id;
            var newEdge = {
                id: id,
                from: prevNodeId,
                to: nodeId,
                color: {
                    color: color
                }
            };
            edges.add(newEdge);
            addRecordHistory("ребро " + id + " создан");
            prevNodeId = null;
        } 
        else {
            prevNodeId = nodeId;
        }
    } 
    else {
        prevNodeId = null;
    }
});

// delete edge
network.on("doubleClick", function(params) {
    if (params.edges.length > 0) {
        var edgeId = params.edges[0];
        edges.remove({ id: edgeId });
        addRecordHistory("ребро " + edgeId + " удалено");
    }
});

// click on node
network.on("click", function(params) {
    var nodeId = params.nodes[0];
    var node = nodes.get(nodeId);
    if (node) {
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
});

// click on edge
network.on("click", function(params) {
    var edgeId = params.edges[0];
    var edge = edges.get(edgeId);
    if (edge) {
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
});
