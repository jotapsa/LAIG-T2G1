/**
 * MyGraphLeaf class, representing a leaf in the scene graph.
 * @constructor
**/

function MyGraphLeaf(graph, type, args) {
    this.reader = new CGFXMLreader();
    this.type = type;
    this.args = args;

    this.obj = null;
    
    switch(this.type){
        case 'rectangle':
            if(this.args.length != 4){
                console.log("error: number of arguments");
                break;
            }
            else
                this.object = new Rectangle(graph.scene,this.args[0],this.args[1],this.args[2],this.args[3]);
            break;
        case 'cylinder':
            if(this.args.length != 5){
                console.log("error: number of arguments");
                break;
            }
            else
                this.object = new Cylinder(graph.scene,this.args[0],this.args[1],this.args[2],this.args[3],this.args[4]);
            break;
        case 'sphere':
            if(this.args.length != 3){
                console.log("error: number of arguments");
                break;
            }
            else
                this.object = new Sphere(graph.scene,this.args[0],this.args[1],this.args[2]);
            break;
        case 'triangle':
            if(this.args.length != 9){
                console.log("error: number of arguments");
                break;
            }
            else
                this.object = new Triangle(graph.scene,this.args[0],this.args[1],this.args[2],this.args[3],this.args[4],this.args[5],this.args[6],this.args[7],this.args[8]);
            break;
        default:
            break;
    }
}

