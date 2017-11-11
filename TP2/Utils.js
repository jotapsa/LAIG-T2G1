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

function deCasteljau(controlPoints){
  let L1 = controlPoints[0];
  let R4 = controlPoints[3];
  //L2 = (P1+P2)/2
  let L2 = divVector(addPoints(controlPoints[0], controlPoints[1]), 2);
  //R3 = (P3+P4)/2
  let R3 = divVector(addPoints(controlPoints[2], controlPoints[3]), 2);
  //H = (P2+P3)/2
  let H = divVector(addPoints(controlPoints[1], controlPoints[2]), 2);
  //L3 = (L2+H)/2
  let L3 = divVector(addPoints(L2, H), 2);
  //R2 = (H+R3)/2
  let R2 = divVector(addPoints(H, R3), 2);
  //L4= R1 = (L3+R2)/2
  let L4 = divVector(addPoints(L3, R2, 2);
  let R1 = L4;

  return [L1, L2, L3, L4, R1, R2, R3, R4];
}
