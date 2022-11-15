/**
 * function to get maze size input from user it uses html prompt to take input.
 * NOTE: IF USER SENDS A NON-NUMBER OR A NUMBER BIGGER/SMALLER
 * THAN LIMIT THEN DEFAULT VALUE WILL BE SENT FOR MAZE SIZE
 * @returns object {x: number, y: number} containing maze size
 */
export function getInput(){
    let input = {};

    input['x'] = prompt("Please enter border width (Min:3 Max:11)");
    input['y'] = prompt("Please enter border height (Min:3 Max:11)");

    if(!parseInt(input.x, 10) || !parseInt(input.y, 10)){
      input['x'] = 10;
      input['y'] = 10;
    }

    if(input.x<3 || input.x>11 || input.y<3 || input.y>11){
      input['x'] = 10;
      input['y'] = 10;
    }
  
    return input;
}

/**
 * function to generate uniquely random location for carrot and rabbit on given maze.
 * STEP 1: set number of carrot as average of maze size 
 * STEP 2: check if input y is odd and set rabbit location 
 *         respectively.
 * STEP 3: generate random location for carrot while excluding
 *         rabbit location.
 * @returns [array]: of random carrot location, number: rabbit location 
 */
export function randomPositions(inputX, inputY) {
  let randoms = [], requiredCentre;
  
  //set number of carrots as average of maze size
  const requiredCarrots = Math.floor((inputX+inputY)/2);

  //check if input y is odd
  if(inputY%2 === 1){
    //if so then (number of blocks)/2 will center
    requiredCentre = Math.ceil((inputX*inputY)/2);
  }else{
    //else (number of blocks)/2 will - half of input x will be center
    requiredCentre = Math.ceil((inputX*inputY)/2) - Math.ceil(inputX/2);
  }

  //generate unique random carrot location by excluding rabbit location
  while(randoms.length < requiredCarrots){
      let x = Math.floor(Math.random() * (inputX*inputY)) + 1;
      if(randoms.indexOf(x) === -1 && !(requiredCentre === x)) randoms.push(x);
  }

  return [randoms, requiredCentre];
}