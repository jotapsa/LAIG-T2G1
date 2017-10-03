/**
 * MyGraphLeaf class, representing a leaf in the scene graph.
 * @constructor
**/

function MyGraphLeaf(graph, type, args) {
    this.reader = new CGFXMLreader();
    this.type = type;
    this.args = args;

    
    switch(this.type){
        case 'rectangle':
        if(this.args.length != 4){
            console.log("error: Wrong number of arguments");
            break;
            }
        case 'cylinder':
            if(this.args.length != 5){
            console.log("error: Wrong number of arguments");
            break;
            }
        case 'sphere':
            if(this.args.length != 3){
                console.log("error: Wrong number of arguments");
                break;
            }
        case 'triangle':
            if(this.args.length != 9){
                console.log("error: Wrong number of arguments");
                break;
            }
        default:
            break;
    }
    
    console.log (xmlelem);
}

