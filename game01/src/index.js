import ReactDOM from 'react-dom';
import './index.css';
import React, { useState, useLayoutEffect} from 'react';
import { getInput, randomPositions } from './utils';
import Maze from './components/mazeGenerator';
import Controller from './components/characterController';
import { MazeState } from './components/globalStates';


/**
 * get user input for maze size
 * @returns {x: number, y: number} 
 */ 
let input = getInput();

/**
 * generate a center location for character and random locations for carrots.
 * @returns [array of numbers], number 
 */
const [randomCarrots, centreRabbit] = randomPositions(parseInt(input.x), parseInt(input.y));


/**
 * Main Game Component
 * This component:
 * 1. initialize global state
 * 2. wrap that global state on maze and controller
 * 3. serve main page html
 * @component
 * @example
 * <Game />
 */
function Game() {

  /**
   * Global state to initialize.
   * @const
   */
  const [mazeData, setMazeData] = useState({});

  /**
   * Game's useEffect 
   * This initialize all global state variables
   * @public
   */
  useLayoutEffect(() => {
    setMazeData(mazeData => ({
      ...mazeData, 
      randomCarrots: randomCarrots,
      rabbitLoc: centreRabbit,
      inputX: parseInt(input.x),
      inputY: parseInt(input.y),
      currentDirection: null,
      score: 0
    }));

  }, []);

  //check if the rabbit location is generated
  let maze, score = mazeData.score;
  if(mazeData.rabbitLoc){
    //set maze and controller component with required props
    maze =(
      <MazeState.Provider value={[mazeData, setMazeData]}>
        <Maze x={input.x} y={input.y} carrotLoc={mazeData.randomCarrots} rabbitLoc={mazeData.rabbitLoc} />
        <Controller />
      </MazeState.Provider>
    );
    
  }else{
    maze = <p>Loading ...</p>
  }

  return (
    <div className="game">
      <div className='title'>Maze: Feed the Rabbit</div>
      <div className="game-maze">
        {maze}
      </div>
      <div className="game-info">
        <div className="play-info">
          <div className='directions'>Use ←↕→ Arrow Keys on the keyboard to move and feed the Rabbit</div>
          
        </div>
        <div className="score">
          <p className="score-text">Score: {score}</p>
        </div>
    
      </div>
    </div>
  );
}


ReactDOM.render(
  <Game />,
  document.getElementById('root')
);