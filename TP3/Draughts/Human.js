function Human(){
};

Human.checkValidMove = function(move, map){
  let forcedMoves;

  //Calculate forced moves for piece at startingPosition
  forcedMoves = Human.ObtainForcedMoves(move, map);

  if(forcedMoves.length > 0){
    //do stuff
    return false;
  }

  //Calculate all forced moves for player

  //If there are no forced moves for player


  return Human.isValidStandardMove(move, map);
}

Human.isValidStandardMove = function(move, map){
  let startingPos, finalPos;

  startingPos = move.getStartingPos();
  finalPos = move.getFinalPos();

  switch(map.getPos(startingPos[0], startingPos[1])){
    case CELL.BLACK_KING:{
      if((finalPos[0]-startingPos[0] == 1) && (Math.abs(finalPos[1]-startingPos[1]) == 1)){
        return true;
      }
    }
    //trickle down
    case CELL.BLACK_PIECE:{
      if((finalPos[0]-startingPos[0] == -1) && (Math.abs(finalPos[1]-startingPos[1]) == 1)){
        return true;
      }
    }
    break;
    case CELL.WHITE_KING:{
      if((finalPos[0]-startingPos[0] == -1) && (Math.abs(finalPos[1]-startingPos[1]) == 1)){
        return true;
      }
    }
    case CELL.WHITE_PIECE:{
      if((finalPos[0]-startingPos[0] == 1) && (Math.abs(finalPos[1]-startingPos[1]) == 1)){
        return true;
      }
    }
    break;
    default:
    break;
  }

  return false;
}

Human.ObtainForcedMoves = function(move, map){
  let forcedMoves = [], forcedMove = null;
  let startingPos = move.getStartingPos();

  switch(map.getPos(startingPos[0], startingPos[1])){
    case CELL.BLACK_KING:{
      if ((forcedMove = Human.UpLeftCapture(startingPos, map)) != null){
        forcedMoves.push(forcedMove);
        forcedMove = null;
      }
      if ((forcedMove = Human.UpRightCapture(startingPos, map)) != null){
        forcedMoves.push(forcedMove);
        forcedMove = null;
      }
    }
    //trickle
    case CELL.BLACK_PIECE:{
      if ((forcedMove = Human.DownLeftCapture(startingPos, map)) != null){
        forcedMoves.push(forcedMove);
        forcedMove = null;
      }
      if ((forcedMove = Human.DownRightCapture(startingPos, map)) != null){
        forcedMoves.push(forcedMove);
        forcedMove = null;
      }
    }
    break;
    case CELL.WHITE_KING:{
      if ((forcedMove = Human.DownLeftCapture(startingPos, map)) != null){
        forcedMoves.push(forcedMove);
        forcedMove = null;
      }
      if ((forcedMove = Human.DownRightCapture(startingPos, map)) != null){
        forcedMoves.push(forcedMove);
        forcedMove = null;
      }
    }
    //trickle
    case CELL.WHITE_PIECE:{
      if ((forcedMove = Human.UpLeftCapture(startingPos, map)) != null){
        forcedMoves.push(forcedMove);
        forcedMove = null;
      }
      if ((forcedMove = Human.UpRightCapture(startingPos, map)) != null){
        forcedMoves.push(forcedMove);
        forcedMove = null;
      }
    }
    break;
    default:
    break;
  }
  
  return forcedMoves;
}

Human.UpLeftCapture = function(startingPos, map){
  let move = null;
  let finalPos = [startingPos[0]+2, startingPos[1]-2];

  switch(map.getPos(startingPos[0], startingPos[1])){
    case CELL.BLACK_KING:
    case CELL.BLACK_PIECE:{
      if ((startingPos[0] < (map.getsizeN()-2)) && (startingPos[1] >= 2) &&
        (map.getPos(startingPos[0]+1, startingPos[1]-1)==CELL.WHITE_PIECE ||
        map.getPos(startingPos[0]+1, startingPos[1]-1)==CELL.WHITE_KING) &&
        (map.getPos(finalPos[0], finalPos[1])==CELL.EMPTY_SQUARE)){
          move = new Move (startingPos, finalPos);
        }
    }
    break;
    case CELL.WHITE_KING:
    case CELL.WHITE_PIECE:{
      if ((startingPos[0] < (map.getsizeN()-2)) && (startingPos[1] >= 2) &&
        (map.getPos(startingPos[0]+1, startingPos[1]-1)==CELL.BLACK_PIECE ||
        map.getPos(startingPos[0]+1, startingPos[1]-1)==CELL.BLACK_KING) &&
        (map.getPos(finalPos[0], finalPos[1])==CELL.EMPTY_SQUARE)){
          move = new Move (startingPos, finalPos);
        }
    }
    default:
    break;
  }
  return move;
}

Human.UpRightCapture = function(startingPos, map){
  let move = null;
  let finalPos = [startingPos[0]+2, startingPos[1]+2];

  switch(map.getPos(startingPos[0], startingPos[1])){
    case CELL.BLACK_KING:
    case CELL.BLACK_PIECE:{
      if ((startingPos[0] < (map.getsizeN()-2)) && (startingPos[1] < (map.getsizeN()-2)) &&
        (map.getPos(startingPos[0]+1, startingPos[1]+1)==CELL.WHITE_PIECE ||
        map.getPos(startingPos[0]+1, startingPos[1]+1)==CELL.WHITE_KING) &&
        (map.getPos(finalPos[0], finalPos[1])==CELL.EMPTY_SQUARE)){
          move = new Move (startingPos, finalPos);
        }
    }
    break;
    case CELL.WHITE_KING:
    case CELL.WHITE_PIECE:{
      if ((startingPos[0] < (map.getsizeN()-2)) && (startingPos[1] < (map.getsizeN()-2)) &&
        (map.getPos(startingPos[0]+1, startingPos[1]+1)==CELL.BLACK_PIECE ||
        map.getPos(startingPos[0]+1, startingPos[1]+1)==CELL.BLACK_KING) &&
        (map.getPos(finalPos[0], finalPos[1])==CELL.EMPTY_SQUARE)){
          move = new Move (startingPos, finalPos);
        }
    }
    default:
    break;
  }
  return move;
}

Human.DownLeftCapture = function(startingPos, map){
  let move = null;
  let finalPos = [startingPos[0]-2, startingPos[1]-2];

  switch(map.getPos(startingPos[0], startingPos[1])){
    case CELL.BLACK_KING:
    case CELL.BLACK_PIECE:{
      if ((startingPos[0] >= 2) && (startingPos[1] >= 2) &&
        (map.getPos(startingPos[0]-1, startingPos[1]-1)==CELL.WHITE_PIECE ||
        map.getPos(startingPos[0]-1, startingPos[1]-1)==CELL.WHITE_KING) &&
        (map.getPos(finalPos[0], finalPos[1])==CELL.EMPTY_SQUARE)){
          move = new Move (startingPos, finalPos);
        }
    }
    break;
    case CELL.WHITE_KING:
    case CELL.WHITE_PIECE:{
      if ((startingPos[0] >= 2) && (startingPos[1] >= 2) &&
        (map.getPos(startingPos[0]-1, startingPos[1]-1)==CELL.BLACK_PIECE ||
        map.getPos(startingPos[0]-1, startingPos[1]-1)==CELL.BLACK_KING) &&
        (map.getPos(finalPos[0], finalPos[1])==CELL.EMPTY_SQUARE)){
          move = new Move (startingPos, finalPos);
        }
    }
    default:
    break;
  }
  return move;
}

Human.DownRightCapture = function(startingPos, map){
  let move = null;
  let finalPos = [startingPos[0]-2, startingPos[1]+2];

  switch(map.getPos(startingPos[0], startingPos[1])){
    case CELL.BLACK_KING:
    case CELL.BLACK_PIECE:{
      if ((startingPos[0] >= 2) && (startingPos[1] < (map.getsizeN()-2)) &&
        (map.getPos(startingPos[0]-1, startingPos[1]+1)==CELL.WHITE_PIECE ||
        map.getPos(startingPos[0]-1, startingPos[1]+1)==CELL.WHITE_KING) &&
        (map.getPos(finalPos[0], finalPos[1])==CELL.EMPTY_SQUARE)){
          move = new Move (startingPos, finalPos);
        }
    }
    break;
    case CELL.WHITE_KING:
    case CELL.WHITE_PIECE:{
      if ((startingPos[0] >= 2) && (startingPos[1] < (map.getsizeN()-2)) &&
        (map.getPos(startingPos[0]-1, startingPos[1]+1)==CELL.BLACK_PIECE ||
        map.getPos(startingPos[0]-1, startingPos[1]+1)==CELL.BLACK_KING) &&
        (map.getPos(finalPos[0], finalPos[1])==CELL.EMPTY_SQUARE)){
          move = new Move (startingPos, finalPos);
        }
    }
    default:
    break;
  }
  return move;
}
