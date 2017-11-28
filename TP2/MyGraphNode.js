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
    this.animations = [];

    //The Current Animation
    this.currAnimationIndex = null;

    // The Transformation Matrix
    this.transformMatrix = mat4.create();
    mat4.identity(this.transformMatrix);
}

/**
 * Adds a clone of an animation of this node.
 */
MyGraphNode.prototype.addAnimation = function(animation){
  this.animations.push(animation.clone());
  this.currAnimationIndex = 0;
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
