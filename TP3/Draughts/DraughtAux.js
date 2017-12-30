function DraughtAux(){
};

DraughtAux.checkValidMove = function(move, map){
  let forcedMoves, startingPos, finalPos, cell;

  startingPos = move.getStartingPos();
  finalPos = move.getFinalPos();
  cell = map.getPos(startingPos[0], startingPos[1]);

  //Calculate forced moves for piece at startingPosition
  forcedMoves = DraughtAux.ObtainForcedMovesForPiece(startingPos, map);

  if(forcedMoves.length > 0){
    for(let i=0; i<forcedMoves.length; i++){
      //Check if the move is a forced move
      if(move.Equals(forcedMoves[i])){
        //Check if further forced moves are possible
        let furtherForcedMoves = DraughtAux.ObtainForcedMovesForPiece(finalPos, map, cell);
        move.setForcedMove(true);
        return true;
      }
    }
    return false;
  }

  //Calculate forced moves for the player
  forcedMoves = DraughtAux.ObtainAllForcedMovesForPlayer(cell, map);

  if(forcedMoves.length > 0){
    return false;
  }

  return DraughtAux.isValidStandardMove(move, map);
}

DraughtAux.isValidStandardMove = function(move, map){
  let startingPos, finalPos, cell;

  startingPos = move.getStartingPos();
  finalPos = move.getFinalPos();
  cell = map.getPos(startingPos[0], startingPos[1]);

  switch(cell){
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
    //trickle down
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

DraughtAux.getAllPossibleMovesForPlayer = function(player, map){
  let moves = [], cell;

  if(player == "Whites"){
    cell=CELL.WHITE_PIECE;
  }
  else{
    cell=CELL.BLACK_PIECE
  }

  //Check if there are forced moves
  moves = DraughtAux.ObtainAllForcedMovesForPlayer(cell, map);
  if(moves.length>0){
    return moves;
  }

  moves = DraughtAux.ObtainAllNonForcedMovesForPlayer(cell, map);
  return moves;
}

DraughtAux.ObtainAllNonForcedMovesForPlayer = function(playerCell, map){
  let nonForcedMoves = [];

  for(let y=0; y<map.getsizeN(); y++){
    for(let x=0; x<map.getsizeN(); x++){
      if ((playerCell == CELL.BLACK_KING || playerCell == CELL.BLACK_PIECE) &&
      (map.getPos(y,x) == CELL.BLACK_KING || map.getPos(y,x) == CELL.BLACK_PIECE)){
        nonForcedMoves = nonForcedMoves.concat(DraughtAux.ObtainNonForcedMovesForPiece([y, x], map));
      }
      else if ((playerCell == CELL.WHITE_KING || playerCell == CELL.WHITE_PIECE) &&
      (map.getPos(y,x) == CELL.WHITE_KING || map.getPos(y,x) == CELL.WHITE_PIECE)){
        nonForcedMoves = nonForcedMoves.concat(DraughtAux.ObtainNonForcedMovesForPiece([y,x], map));
      }
      else{
        //do nothing
      }
    }
  }

  return nonForcedMoves;
}

DraughtAux.ObtainAllForcedMovesForPlayer = function(playerCell, map){
  let forcedMoves = [];

  for(let y=0; y<map.getsizeN(); y++){
    for(let x=0; x<map.getsizeN(); x++){
      if ((playerCell == CELL.BLACK_KING || playerCell == CELL.BLACK_PIECE) &&
      (map.getPos(y,x) == CELL.BLACK_KING || map.getPos(y,x) == CELL.BLACK_PIECE)){
        forcedMoves = forcedMoves.concat(DraughtAux.ObtainForcedMovesForPiece([y, x], map));
      }
      else if ((playerCell == CELL.WHITE_KING || playerCell == CELL.WHITE_PIECE) &&
      (map.getPos(y,x) == CELL.WHITE_KING || map.getPos(y,x) == CELL.WHITE_PIECE)){
        forcedMoves = forcedMoves.concat(DraughtAux.ObtainForcedMovesForPiece([y,x], map));
      }
      else{
        //do nothing
      }
    }
  }

  return forcedMoves;
}

DraughtAux.ObtainNonForcedMovesForPiece = function(startingPos, map, playerCell){
  let nonForcedMoves = [], nonForcedMove = null;
  playerCell = playerCell || map.getPos(startingPos[0], startingPos[1]);

  switch(playerCell){
    case CELL.BLACK_KING:{
      if((nonForcedMove = DraughtAux.UpLeft(playerCell, startingPos, map)) != null){
        nonForcedMoves.push(nonForcedMove);
        nonForcedMove=null;
      }
      if((nonForcedMove = DraughtAux.UpRight(playerCell, startingPos, map)) != null){
        nonForcedMoves.push(nonForcedMove);
        nonForcedMove=null;
      }
    }
    //trickle
    case CELL.BLACK_PIECE:{
      if((nonForcedMove = DraughtAux.DownLeft(playerCell, startingPos, map)) != null){
        nonForcedMoves.push(nonForcedMove);
        nonForcedMove=null;
      }
      if((nonForcedMove = DraughtAux.DownRight(playerCell, startingPos, map)) != null){
        nonForcedMoves.push(nonForcedMove);
        nonForcedMove=null;
      }
    }
    break;
    case CELL.WHITE_KING:{
      if((nonForcedMove = DraughtAux.DownLeft(playerCell, startingPos, map)) != null){
        nonForcedMoves.push(nonForcedMove);
        nonForcedMove=null;
      }
      if((nonForcedMove = DraughtAux.DownRight(playerCell, startingPos, map)) != null){
        nonForcedMoves.push(nonForcedMove);
        nonForcedMove=null;
      }
    }
    //trickle
    case CELL.WHITE_PIECE:{
      if((nonForcedMove = DraughtAux.UpLeft(playerCell, startingPos, map)) != null){
        nonForcedMoves.push(nonForcedMove);
        nonForcedMove=null;
      }
      if((nonForcedMove = DraughtAux.UpRight(playerCell, startingPos, map)) != null){
        nonForcedMoves.push(nonForcedMove);
        nonForcedMove=null;
      }
    }
    break;
    default:
    break;
  }

  return nonForcedMoves;
}

DraughtAux.ObtainForcedMovesForPiece = function(startingPos, map, playerCell){
  let forcedMoves = [], forcedMove = null;
  playerCell = playerCell || map.getPos(startingPos[0], startingPos[1]);

  switch(playerCell){
    case CELL.BLACK_KING:{
      if ((forcedMove = DraughtAux.UpLeftCapture(playerCell, startingPos, map)) != null){
        forcedMoves.push(forcedMove);
        forcedMove = null;
      }
      if ((forcedMove = DraughtAux.UpRightCapture(playerCell, startingPos, map)) != null){
        forcedMoves.push(forcedMove);
        forcedMove = null;
      }
    }
    //trickle
    case CELL.BLACK_PIECE:{
      if ((forcedMove = DraughtAux.DownLeftCapture(playerCell, startingPos, map)) != null){
        forcedMoves.push(forcedMove);
        forcedMove = null;
      }
      if ((forcedMove = DraughtAux.DownRightCapture(playerCell, startingPos, map)) != null){
        forcedMoves.push(forcedMove);
        forcedMove = null;
      }
    }
    break;
    case CELL.WHITE_KING:{
      if ((forcedMove = DraughtAux.DownLeftCapture(playerCell, startingPos, map)) != null){
        forcedMoves.push(forcedMove);
        forcedMove = null;
      }
      if ((forcedMove = DraughtAux.DownRightCapture(playerCell, startingPos, map)) != null){
        forcedMoves.push(forcedMove);
        forcedMove = null;
      }
    }
    //trickle
    case CELL.WHITE_PIECE:{
      if ((forcedMove = DraughtAux.UpLeftCapture(playerCell, startingPos, map)) != null){
        forcedMoves.push(forcedMove);
        forcedMove = null;
      }
      if ((forcedMove = DraughtAux.UpRightCapture(playerCell, startingPos, map)) != null){
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
/*
* Keep in mind every capture is a forced move
*/
DraughtAux.UpLeftCapture = function(playerCell, startingPos, map){
  let move = null;
  let finalPos = [startingPos[0]+2, startingPos[1]-2];

  switch(playerCell){
    case CELL.BLACK_KING:{
      if ((startingPos[0] < (map.getsizeN()-2)) && (startingPos[1] >= 2) &&
        (map.getPos(startingPos[0]+1, startingPos[1]-1)==CELL.WHITE_PIECE ||
        map.getPos(startingPos[0]+1, startingPos[1]-1)==CELL.WHITE_KING) &&
        (map.getPos(finalPos[0], finalPos[1])==CELL.EMPTY_SQUARE)){
          move = new Move (startingPos, finalPos, TURN.BLACKS, true);
        }
    }
    break;
    case CELL.WHITE_KING:
    case CELL.WHITE_PIECE:{
      if ((startingPos[0] < (map.getsizeN()-2)) && (startingPos[1] >= 2) &&
        (map.getPos(startingPos[0]+1, startingPos[1]-1)==CELL.BLACK_PIECE ||
        map.getPos(startingPos[0]+1, startingPos[1]-1)==CELL.BLACK_KING) &&
        (map.getPos(finalPos[0], finalPos[1])==CELL.EMPTY_SQUARE)){
          move = new Move (startingPos, finalPos, TURN.WHITES, true);
        }
    }
    default:
    break;
  }
  return move;
}

/*
*
*/
DraughtAux.UpLeft = function(playerCell, startingPos, map){
  let move = null;
  let finalPos = [startingPos[0]+1, startingPos[1]-1];

  switch(playerCell){
    case CELL.BLACK_KING:{
      if ((startingPos[0] < (map.getsizeN()-1)) && (startingPos[1] >= 1) &&
        (map.getPos(finalPos[0], finalPos[1])==CELL.EMPTY_SQUARE)){
          move = new Move (startingPos, finalPos, TURN.BLACKS, false);
      }
    }
    break;
    case CELL.WHITE_PIECE:
    case CELL.WHITE_KING:{
      if ((startingPos[0] < (map.getsizeN()-1)) && (startingPos[1] >= 1) &&
        (map.getPos(finalPos[0], finalPos[1])==CELL.EMPTY_SQUARE)){
          move = new Move (startingPos, finalPos, TURN.WHITES, false);
      }
    }
    break;
    default:
    break;
  }
  return move;
}

DraughtAux.UpRightCapture = function(playerCell, startingPos, map){
  let move = null;
  let finalPos = [startingPos[0]+2, startingPos[1]+2];

  switch(playerCell){
    case CELL.BLACK_KING:{
      if ((startingPos[0] < (map.getsizeN()-2)) && (startingPos[1] < (map.getsizeN()-2)) &&
        (map.getPos(startingPos[0]+1, startingPos[1]+1)==CELL.WHITE_PIECE ||
        map.getPos(startingPos[0]+1, startingPos[1]+1)==CELL.WHITE_KING) &&
        (map.getPos(finalPos[0], finalPos[1])==CELL.EMPTY_SQUARE)){
          move = new Move (startingPos, finalPos, TURN.BLACKS, true);
        }
    }
    break;
    case CELL.WHITE_KING:
    case CELL.WHITE_PIECE:{
      if ((startingPos[0] < (map.getsizeN()-2)) && (startingPos[1] < (map.getsizeN()-2)) &&
        (map.getPos(startingPos[0]+1, startingPos[1]+1)==CELL.BLACK_PIECE ||
        map.getPos(startingPos[0]+1, startingPos[1]+1)==CELL.BLACK_KING) &&
        (map.getPos(finalPos[0], finalPos[1])==CELL.EMPTY_SQUARE)){
          move = new Move (startingPos, finalPos, TURN.WHITES, true);
        }
    }
    break;
    default:
    break;
  }
  return move;
}

DraughtAux.UpRight = function(playerCell, startingPos, map){
  let move = null;
  let finalPos = [startingPos[0]+1, startingPos[1]+1];

  switch(playerCell){
    case CELL.BLACK_KING:{
      if ((startingPos[0] < (map.getsizeN()-1)) && (startingPos[1] < (map.getsizeN()-1)) &&
        (map.getPos(finalPos[0], finalPos[1])==CELL.EMPTY_SQUARE)){
          move = new Move (startingPos, finalPos, TURN.BLACKS, false);
      }
    }
    break;
    case CELL.WHITE_PIECE:
    case CELL.WHITE_KING:{
      if ((startingPos[0] < (map.getsizeN()-1)) && (startingPos[1] < (map.getsizeN()-1)) &&
        (map.getPos(finalPos[0], finalPos[1])==CELL.EMPTY_SQUARE)){
          move = new Move (startingPos, finalPos, TURN.WHITES, false);
      }
    }
    break;
    default:
    break;
  }
  return move;
}

DraughtAux.DownLeftCapture = function(playerCell, startingPos, map){
  let move = null;
  let finalPos = [startingPos[0]-2, startingPos[1]-2];

  switch(playerCell){
    case CELL.BLACK_KING:
    case CELL.BLACK_PIECE:{
      if ((startingPos[0] >= 2) && (startingPos[1] >= 2) &&
        (map.getPos(startingPos[0]-1, startingPos[1]-1)==CELL.WHITE_PIECE ||
        map.getPos(startingPos[0]-1, startingPos[1]-1)==CELL.WHITE_KING) &&
        (map.getPos(finalPos[0], finalPos[1])==CELL.EMPTY_SQUARE)){
          move = new Move (startingPos, finalPos, TURN.BLACKS, true);
        }
    }
    break;
    case CELL.WHITE_KING:{
      if ((startingPos[0] >= 2) && (startingPos[1] >= 2) &&
        (map.getPos(startingPos[0]-1, startingPos[1]-1)==CELL.BLACK_PIECE ||
        map.getPos(startingPos[0]-1, startingPos[1]-1)==CELL.BLACK_KING) &&
        (map.getPos(finalPos[0], finalPos[1])==CELL.EMPTY_SQUARE)){
          move = new Move (startingPos, finalPos, TURN.WHITES, true);
        }
    }
    break;
    default:
    break;
  }
  return move;
}

DraughtAux.DownLeft = function(playerCell, startingPos, map){
  let move = null;
  let finalPos = [startingPos[0]-1, startingPos[1]-1];

  switch(playerCell){
    case CELL.BLACK_KING:
    case CELL.BLACK_PIECE:{
      if ((startingPos[0] >= 1) && (startingPos[1] >= 1) &&
        (map.getPos(finalPos[0], finalPos[1])==CELL.EMPTY_SQUARE)){
          move = new Move (startingPos, finalPos, TURN.BLACKS, false);
      }
    }
    break;
    case CELL.WHITE_KING:{
      if ((startingPos[0] >= 1) && (startingPos[1] >= 1) &&
        (map.getPos(finalPos[0], finalPos[1])==CELL.EMPTY_SQUARE)){
          move = new Move (startingPos, finalPos, TURN.WHITES, false);
      }
    }
    break;
    default:
    break;
  }
  return move;
}


DraughtAux.DownRightCapture = function(playerCell, startingPos, map){
  let move = null;
  let finalPos = [startingPos[0]-2, startingPos[1]+2];

  switch(playerCell){
    case CELL.BLACK_KING:
    case CELL.BLACK_PIECE:{
      if ((startingPos[0] >= 2) && (startingPos[1] < (map.getsizeN()-2)) &&
        (map.getPos(startingPos[0]-1, startingPos[1]+1)==CELL.WHITE_PIECE ||
        map.getPos(startingPos[0]-1, startingPos[1]+1)==CELL.WHITE_KING) &&
        (map.getPos(finalPos[0], finalPos[1])==CELL.EMPTY_SQUARE)){
          move = new Move (startingPos, finalPos, TURN.BLACKS, true);
        }
    }
    break;
    case CELL.WHITE_KING:{
      if ((startingPos[0] >= 2) && (startingPos[1] < (map.getsizeN()-2)) &&
        (map.getPos(startingPos[0]-1, startingPos[1]+1)==CELL.BLACK_PIECE ||
        map.getPos(startingPos[0]-1, startingPos[1]+1)==CELL.BLACK_KING) &&
        (map.getPos(finalPos[0], finalPos[1])==CELL.EMPTY_SQUARE)){
          move = new Move (startingPos, finalPos, TURN.WHITES, true);
        }
    }
    break;
    default:
    break;
  }
  return move;
}

DraughtAux.DownRight = function(playerCell, startingPos, map){
  let move = null;
  let finalPos = [startingPos[0]-1, startingPos[1]+1];

  switch(playerCell){
    case CELL.BLACK_KING:
    case CELL.BLACK_PIECE:{
      if ((startingPos[0] >= 1) && (startingPos[1] < (map.getsizeN()-1)) &&
        (map.getPos(finalPos[0], finalPos[1])==CELL.EMPTY_SQUARE)){
          move = new Move (startingPos, finalPos, TURN.BLACKS, false);
        }
    }
    break;
    case CELL.WHITE_KING:{
      if ((startingPos[0] >= 1) && (startingPos[1] < (map.getsizeN()-1)) &&
        (map.getPos(finalPos[0], finalPos[1])==CELL.EMPTY_SQUARE)){
          move = new Move (startingPos, finalPos, TURN.WHITES, false);
        }
    }
    break;
    default:
    break;
  }
  return move;
}

DraughtAux.simulatePossibleBoards = function(board, moveSet){
  let boardSet = [], boardCopy;

  for(let i=0; i<moveSet.length; i++){
    boardCopy = board.clone();
    boardCopy.makeMove(moveSet[i]);
    if(moveSet[i].isforcedMove()){
      let furtherForcedMoves = DraughtAux.ObtainForcedMovesForPiece(moveSet[i].getFinalPos(), boardCopy);
      if (furtherForcedMoves.length>0){
        let furtherSimulatedBoards = DraughtAux.simulatePossibleBoards(boardCopy, furtherForcedMoves);
        for(let j=0; j<furtherSimulatedBoards.length; j++){
          boardSet.push([furtherSimulatedBoards[j][0], moveSet[i]]);
        }
      }
      else{
        boardSet.push([boardCopy, moveSet[i]]);
      }
    }
    else{
      boardSet.push([boardCopy, moveSet[i]]);
    }
  }
  return boardSet;
}

DraughtAux.isGameOver = function(board, turn){
  let possibleMoves;

  switch(turn){
    case(TURN.BLACKS):{
      if (board.getwhitePieces() == 0){
        return TURN.BLACKS;
      }
      else if(DraughtAux.getAllPossibleMovesForPlayer("Blacks", board).length == 0){
        return TURN.WHITES;
      }
    }
    break;
    case(TURN.WHITES):{
      if (board.getblackPieces() == 0){
        return TURN.WHITES;
      }
      else if(DraughtAux.getAllPossibleMovesForPlayer("Whites", board).length == 0){
        return TURN.BLACKS;
      }
    }
    break;
    default:
    break;
  }
  return null;
}

DraughtAux.getOppositeTurn = function(turn){
  switch(turn){
    case(TURN.BLACKS):{
      return TURN.WHITES;
    }
    break;
    case(TURN.WHITES):{
      return TURN.BLACKS;
    }
    break;
    default:
    break;
  }
  return null;
}
