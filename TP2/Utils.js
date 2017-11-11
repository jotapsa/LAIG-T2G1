var X = 0;
var Y = 1;
var Z = 2;

/**
 * Returns the substraction of point2 with point1.
 * In mathematical terms, it returns the vector from point1 to point2.
 */
function subtractPoints(point1, point2){
    return [point2[X] - point1[X], point2[Y] - point1[Y], point2[Z] - point1[Z]];
}

/**
 * Returns the addition of point1 with point2.
 */
function addPoints(point1, point2) {
    return [point1[X] + point2[X], point1[Y] + point2[Y], point1[Z] + point2[Z]];
}

/**
 * Computes the 3D distance between two 3D points
 */
function distance(point1, point2){
    return Math.sqrt(Math.pow(point1[X] - point2[X], 2) + Math.pow(point1[Y] - point2[Y], 2) + Math.pow(point1[Z] - point2[Z], 2));
}

/**
 * Multiplies a vector by a constant. Does the modify any of the objects.
 */
function multVector(vector, constant){
    return [vector[X] * constant, vector[Y] * constant, vector[Z] * constant];
}

/**
 * Divides a vector by a constant. Does the modify any of the objects.
 */
function divVector(vector, constant){
    return [vector[X]/constant, vector[Y]/constant, vector[Z]/constant];
}

/**
 * Returns a new normalized vector
 * @param vector Vector to be normalized.
 */
function normalizeVector(vector){
   let norm = distance([0, 0, 0], vector);
    return [vector[0]/norm, vector[1]/norm, vector[2]/norm];
}

/*
* Using deCasteljau algorithm we can split a single Bezier curve into two bezier curves,
* in this case line segments.
*/

function deCasteljau(CPoints){
  let left1 = CPoints[0];
  let right4 = CPoints[3];
  //L2 = (P1+P2)/2
  let left2 = divVector(addPoints(CPoints[0], CPoints[1]), 2);
  //R3 = (P3+P4)/2
  let right3 = divVector(addPoints(CPoints[2], CPoints[3]), 2);
  //H = (P2+P3)/2
  let H = divVector(addPoints(CPoints[1], CPoints[2]), 2);
  //L3 = (L2+H)/2
  let left3 = divVector(addPoints(left2, H), 2);
  //R2 = (H+R3)/2
  let right2 = divVector(addPoints(H, right3), 2);
  //L4= R1 = (L3+R2)/2
  let left4 = divVector(addPoints(left3, right2), 2);
  let right1 = left4;
  return [left1, left2, left3, left4, right1, right2, right3, right4];
}
