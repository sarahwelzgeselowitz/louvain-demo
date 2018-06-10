/* Implementation of undirected, unweighted graph*/
function ConstructGraph(){
    this._nodes = new Set();
    this._edges = {}
    this.addNode = (node) => {
        this._nodes.add(node);
    }
    this.hasNode = (node) => this._nodes.has(node)
    this.hasEdge = (node1, node2) => {
        return !!(this._edges[node1] && this._edges[node1][node2]);
    }
    this.addEdge = (node1, node2) => {
        [node1, node2].forEach( (node) => {
            if(!this.hasNode(node)) { this.addNode(node)}
        })
        if(!this._edges[node1]){
            this._edges[node1] = {};
        }
        this._edges[node1][node2] = 1
        if(!this._edges[node2]){
            this._edges[node2] = {};
        }
        this._edges[node2][node1] = 1
    }
    this.nodes = () => sorted([...this._nodes]);
    this.edges = () => {
        const alreadyAddedEdges = {};
        return Object.keys(this._edges).reduce((acc, node1) => {
            const edgeTuples =  Object.keys(this._edges[node1]).reduce((acc, node2)=> {
                    const [key1, key2] = sorted([node1, node2])
                    if(alreadyAddedEdges[key1] && alreadyAddedEdges[key1][key2]){
                        return acc;
                    }
                    if(!alreadyAddedEdges[key1]){
                        alreadyAddedEdges[key1] = {};
                    }
                    alreadyAddedEdges[key1][key2] = true;
                    return acc.concat([[key1, key2]])
            }, [])
            return acc.concat(edgeTuples);
        }, []);
    }
    this.neighbors = (node) => {
        return Object.keys(this._edges[node] || []);
    }
}

function unique(list){
    return list.filter((v, i, a) => a.indexOf(v) === i);
}

function sorted(list){
    return list.slice().sort();
}

function Graph(){
    return new ConstructGraph();
}


module.exports = {
    Graph: Graph
}
