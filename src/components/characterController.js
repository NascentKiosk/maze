import React, { useContext, useEffect, useState, useLayoutEffect } from 'react';
//GLOBAL CONTEXT / STATE
import { MazeState } from './globalStates';

/**
 * Component for controlling character/player
 * This component:
 * 1. Takes movement input to move rabbit correctly
 * 2. Takes care of maze boundaries
 * 3. Handles eating carrot
 * 4. Updates winning condition and score
 */
export default function Controller() {
    /**
     * Global state to manipulate character location
     */
    const [mazeData, setMazeData] = useContext(MazeState);
    
    /**
     * local state to store interval game loop 
     */
    const [control, setControl] = useState({
        gameInterval: null
    });

    /**
     * Controller's useLayoutEffect 
     * This checks winning condition
     * ( if carrot item array is smaller than 1 )
     */
    useLayoutEffect(() => {
        if( mazeData.randomCarrots.length < 1){
            //clear interval /game loop
            clearInterval(control.gameInterval);
            //alert result
            alert("You did it in " + mazeData.score + " Steps");
        }
    }, [mazeData, control]);


    /**
     * Controller's useEffect
     * Step 1: This checks if character is at the carrot location and 
     * if so then eat it(remove from carrot array).
     */
    useEffect(() => {
        
        const found = mazeData.randomCarrots.indexOf(mazeData.rabbitLoc);
        if(found !==-1){
            const updatedCarrot = mazeData.randomCarrots.filter((item) => item!== (mazeData.rabbitLoc));
            setMazeData(prev => ({
                ...prev,
                randomCarrots: updatedCarrot
            }));
        }
        isBoundary();
    
    }, [mazeData, setMazeData]);


    /**
     * onkeydown function to detect arrow keys and trigger player movement.
     */
    document.onkeydown = function(event) { 
        switch (event.key) {  
            case 'ArrowUp':
                gameLoop(moveUp);
                break; 
            case 'ArrowLeft': 
                gameLoop(moveLeft);
                break;
            case 'ArrowRight':
                gameLoop(moveRight);
                break; 
            case 'ArrowDown':
                gameLoop(moveDown);
                break; 
            default:
                console.log("invalid key");
        }
    };

    /**
     * Function to start a game loop with
     */
    const gameLoop = (moveFunction) => {

        //clear previous interval if any
        if(control.gameInterval !== null){
            clearInterval(control.gameInterval);
        }

        //start a new interval with move function
        let tempInterval = setInterval(() => {
            moveFunction();
        }, 375);

        //set interval in global state
        setControl(prev => ({
            ...prev,
            gameInterval: tempInterval
        }));
    }

    /**
     * function to move the rabbit one step RIGHT and increase score/ total steps by 1
     */
    const moveRight = () => {
        setMazeData(prev => ({
            ...prev,
            rabbitLoc: prev.rabbitLoc + 1,
            currentDirection: 'right',
            score: prev.score +1
        }));
    }
  
    /**
     * function to move player one step LEFT and increase score/ total steps by 1
     */
    const moveLeft = () => {
        setMazeData(prev => ({
            ...prev,
            rabbitLoc: prev.rabbitLoc - 1,
            currentDirection: 'left',
            score: prev.score +1
        }));
    }

    /**
     * function to move player one step UP  and increase score/ total steps by 1
     * LOGIC: WE ARE SUBTRACTING 1 ROW FROM CURRENT
     * POSITION OF CHARACTER TO SIMULATE ONE STEP UP
     */
    const moveUp = () => {
        setMazeData(prev => ({
            ...prev,
            rabbitLoc: prev.rabbitLoc - prev.inputX,
            currentDirection: 'up',
            score: prev.score +1
        }));
    }
    
    /**
     * function to move player one step DOWN and increase score/ total steps by 1
     * LOGIC: WE ARE ADDING 1 ROW IN CURRENT
     * POSITION OF CHARACTER TO SIMULATE ONE STEP DOWN
     */
    const moveDown = () => {
        setMazeData(prev => ({
            ...prev,
            rabbitLoc: prev.rabbitLoc + prev.inputX,
            currentDirection: 'down',
            score: prev.score +1
        }));
    }

    const isBoundary = () => {
        if(mazeData.rabbitLoc + mazeData.inputX > mazeData.inputX * mazeData.inputY && mazeData.currentDirection==='down'){
            gameLoop(moveUp);    
            return;
        }else if(mazeData.rabbitLoc - mazeData.inputX < 0 && mazeData.currentDirection==='up'){
            gameLoop(moveDown);    
            return;
        }else if((mazeData.rabbitLoc - 1)%mazeData.inputX === 0 && mazeData.currentDirection==='left'){
            gameLoop(moveRight);    
            return;
        }else if((mazeData.rabbitLoc)%mazeData.inputX === 0 && mazeData.currentDirection==='right'){
            gameLoop(moveLeft);    
            return;
        }
    }

    return (
      <div className="controller"></div>
    );
}