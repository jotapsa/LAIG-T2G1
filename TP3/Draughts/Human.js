function Human(){
};

Human.checkValidMove = function(game, move, map){
  let forcedMoves, startingPos, finalPos, playerCell;

  startingPos = move.getStartingPos();
  finalPos = move.getFinalPos();
  playerCell = map.getPos(startingPos[0], startingPos[1]);

  //Calculate forced moves for piece at startingPosition
  forcedMoves = Human.ObtainForcedMovesForPiece(startingPos, map);

  if(forcedMoves.length > 0){
    for(let i=0; i<forcedMoves.length; i++){
      //Check if the move is a forced move
      if(move.Equals(forcedMoves[i])){
        //Check if further forced moves are possible
        let furtherForcedMoves = Human.ObtainForcedMovesForPiece(finalPos, map, playerCell);
        if (furtherForcedMoves.length > 0){
          game.forceConsecutiveMove(finalPos);
        }
        else{
          game.toggleOFFselectLOCK();
        }
        return true;
      }
    }
    return false;
  }

  //Calculate forced moves for the player
  forcedMoves = Human.ObtainAllForcedMovesForPlayer(playerCell, map);

  if(forcedMoves.length > 0){
    return false;
  }

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

Human.ObtainAllForcedMovesForPlayer = function(playerCell, map){
  let forcedMoves = [], forcedMove = null;

  for(let y=0; y<map.getsizeN(); y++){
    for(let x=0; x<map.getsizeN(); x++){
      if ((playerCell == CELL.BLACK_KING || playerCell == CELL.BLACK_PIECE) &&
      (map.getPos(y,x) == CELL.BLACK_KING || map.getPos(y,x) == CELL.BLACK_PIECE)){
        forcedMoves = forcedMoves.concat(Human.ObtainForcedMovesForPiece([y, x], map));
      }
      else if ((playerCell == CELL.WHITE_KING || playerCell == CELL.WHITE_PIECE) &&
      (map.getPos(y,x) == CELL.WHITE_KING || map.getPos(y,x) == CELL.WHITE_PIECE)){
        forcedMoves = forcedMoves.concat(Human.ObtainForcedMovesForPiece([y,x], map));
      }
      else{
        //do nothing
      }
    }
  }

  return forcedMoves;
}

Human.ObtainForcedMovesForPiece = function(startingPos, map, playerCell){
  let forcedMoves = [], forcedMove = null;
  playerCell = playerCell || map.getPos(startingPos[0], startingPos[1]);

  switch(playerCell){
    case CELL.BLACK_KING:{
      if ((forcedMove = Human.UpLeftCapture(playerCell, startingPos, map)) != null){
        forcedMoves.push(forcedMove);
        forcedMove = null;
      }
      if ((forcedMove = Human.UpRightCapture(playerCell, startingPos, map)) != null){
        forcedMoves.push(forcedMove);
        forcedMove = null;
      }
    }
    //trickle
    case CELL.BLACK_PIECE:{
      if ((forcedMove = Human.DownLeftCapture(playerCell, startingPos, map)) != null){
        forcedMoves.push(forcedMove);
        forcedMove = null;
      }
      if ((forcedMove = Human.DownRightCapture(playerCell, startingPos, map)) != null){
        forcedMoves.push(forcedMove);
        forcedMove = null;
      }
    }
    break;
    case CELL.WHITE_KING:{
      if ((forcedMove = Human.DownLeftCapture(playerCell, startingPos, map)) != null){
        forcedMoves.push(forcedMove);
        forcedMove = null;
      }
      if ((forcedMove = Human.DownRightCapture(playerCell, startingPos, map)) != null){
        forcedMoves.push(forcedMove);
        forcedMove = null;
      }
    }
    //trickle
    case CELL.WHITE_PIECE:{
      if ((forcedMove = Human.UpLeftCapture(playerCell, startingPos, map)) != null){
        forcedMoves.push(forcedMove);
        forcedMove = null;
      }
      if ((forcedMove = Human.UpRightCapture(playerCell, startingPos, map)) != null){
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

Human.UpLeftCapture = function(playerCell, startingPos, map){
  let move = null;
  let finalPos = [startingPos[0]+2, startingPos[1]-2];

  switch(playerCell){
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

Human.UpRightCapture = function(playerCell, startingPos, map){
  let move = null;
  let finalPos = [startingPos[0]+2, startingPos[1]+2];

  switch(playerCell){
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

Human.DownLeftCapture = function(playerCell, startingPos, map){
  let move = null;
  let finalPos = [startingPos[0]-2, startingPos[1]-2];

  switch(playerCell){
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

Human.DownRightCapture = function(playerCell, startingPos, map){
  let move = null;
  let finalPos = [startingPos[0]-2, startingPos[1]+2];

  switch(playerCell){
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