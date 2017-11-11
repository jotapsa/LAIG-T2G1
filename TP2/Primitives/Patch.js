/**
 * Patch
 * @constructor
 */
 function Patch(scene, args, argsP) {
 	CGFobject.call(this,scene);
  
    this.partsU = args[0];
    this.partsV = args[1];
    this.CLines = argsP;

    //degrees - the list size is: degree + control points - 1 elements
    this.degree1 = this.CLines.length - 1; //degree on U (length of CLines of Patch)
    this.degree2 = this.CLines[0].length - 1; //degree on V (length of CPoints in one CLine of Patch)

    //knots
    this.knots1 = this.getKnotsVector(this.degree1); // to be built inside webCGF in later versions ()
	this.knots2 = this.getKnotsVector(this.degree2); // to be built inside webCGF in later versions

    //surface -> new CGFnurbsSurface( degree1, degree2, knots1, knots2, controlPoints )
 	this.surfaceNurbs = new CGFnurbsSurface(this.degree1,this.degree2,this.knots1,this.knots2,this.CLines);

 	//object -> CGFnurbsObject.call(this,scene, func, uDivs, vDivs ) : CGFnurbsObject
    CGFnurbsObject.call(this,this.scene,this.getSurfacePoint,this.partsU,this.partsV);
 };

 Patch.prototype = Object.create(CGFnurbsObject.prototype);
 Patch.prototype.constructor = Patch;

 Patch.prototype.getKnotsVector = function(degree) { // TODO (CGF 0.19.3): add to CGFnurbsSurface
	/*
	Degree 1 [0, 1]
	Degree 2 [0, 0, 1, 1]
	Degree 3 [0, 0, 0, 1, 1, 1]
	Degree 4 [0, 0, 0, 0, 1, 1, 1, 1]
	Degree 5 [0, 0, 0, 0, 0, 1, 1, 1, 1, 1] */
	
	var v = new Array();
	for (var i=0; i<=degree; i++) {
		v.push(0);
	}
	for (var i=0; i<=degree; i++) {
		v.push(1);
	}
	return v;
}


Patch.prototype.getSurfacePoint = function(u, v) {
	return this.surfaceNurbs.getPoint(u, v);
};
