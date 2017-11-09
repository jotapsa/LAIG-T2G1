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
