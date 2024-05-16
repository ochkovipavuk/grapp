from app import app
from app import db
from app.models import Graph
from flask import render_template, request, jsonify # type: ignore
import json

@app.route('/')
@app.route('/index')
def index():
    db.create_all()
    return render_template('index.html')

@app.route('/documentation')
def documentation():
    return render_template('documentation.html')

@app.route('/save_graph', methods=['POST'])
def save_graph():
    data = request.get_json()
    name = data['name']
    graph_data = json.dumps(data['data'])
    exist_graph = Graph.query.filter_by(name=name).first()
    if exist_graph:
        exist_graph.data = graph_data
    else:
        new_graph = Graph(name=name, data=graph_data)
        db.session.add(new_graph)
    db.session.commit()
    return jsonify ({'message': 'save graph'})

@app.route('/open_graph/<string:name>')
def open_graph(name):
    graph = Graph.query.filter_by(name=name).first()
    if not graph:
        return jsonify ({'message': 'graph not found'})
    return jsonify ({'name': graph.name, 
                     'data': graph.data})

@app.route('/get_graphs_name')
def get_graphs_name():
    names = [graph.name for graph in Graph.query.all()]
    return jsonify ({'names': names})

@app.route('/delete_graph/<string:name>')
def delete_graph(name):
    graph = Graph.query.filter_by(name=name).first()
    if graph:
        db.session.delete(graph)
        db.session.commit()
        return jsonify ({'message': 'graph delete'})
    return jsonify ({'message': 'graph not found'})
