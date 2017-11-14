/**
 * MyGraphNode class, representing an intermediate node in the scene graph.
 * @constructor
**/

function MyGraphNode(graph, nodeID) {
    this.graph = graph;

    this.nodeID = nodeID;

    // IDs of child nodes.
    this.children = [];

    // IDs of child nodes.
    this.leaves = [];

    // The material ID.
    this.materialID = null ;

    // The texture ID.
    this.textureID = null ;

    //The animations
    this.animations = null;

    this.transformMatrix = mat4.create();
    mat4.identity(this.transformMatrix);
}

/**
 *
 */
MyGraphNode.prototype.addAnimation = function(animation){
  //null
  //console.log(animation);
  //console.log(animation.clone());
  
  if (this.animations==null){
    this.animations=[animation.clone()];
  }else {
    this.animations.push(animation.clone());
  }
}

/**
 * Adds the reference (ID) of another node to this node's children array.
 */
MyGraphNode.prototype.addChildren = function(nodeID) {
    this.children.push(nodeID);
}

/**
 * Adds a leaf to this node's leaves array.
 */
MyGraphNode.prototype.addChild = function(leaf) {
    this.leaves.push(leaf);
}
