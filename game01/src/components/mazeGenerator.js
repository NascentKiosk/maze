import React from 'react';
import carrot_img from '../assets/carrot.svg';
import rabbit_img from '../assets/rabbit.svg';

/**
 * Component to draw dynamic maze for feeding a Rabbit,
 * This component:
 * 1. take maze size input
 * 2. generate a 2 array of blocks
 * 3. each blocks is returned by Block component
 * 4. send respective carrot and rabbit sprites to blocks
 
 */
export default function Maze(props) {
   const status = '';

  /**
   * addRows function to generate a array of row each containing blocks column in it
   * COLUMN REQUIRE ROW ID TO NUMBER EACH BLOCK 
   */
  const addRows = () =>{
    let rows = [];
    for(let i=0; i<props.y; i++){
      rows.push(<div className="maze-row">{addColumn(i)}</div>);
    }
    return rows;
  }

  /**
   * addColumn function to generate a array of column each containing single block in it
  */
  const addColumn = (row) => {
    let column = [];
    for(let i=0; i<props.x; i++ ){
      //generate id with row number, current column number and a constant
      column.push(renderBlock(props.x*row + (i + 1)));
    }
    return column;
  }

  /**
   * function to render block and set rabbit and carrot image accordingly.
   * STEP 1: check if current block id match to carrot location
   *         if so, then set pass carrot image
   * STEP 2: check if current block id match to player location
   *         if so, then set pass player image
   * STEP 3: else set none to image parameter
  */
  const renderBlock = (blockCount)=> {

    if(props.carrotLoc.indexOf(blockCount) !== -1){
      return <Block value={blockCount} image={`url(${carrot_img})`} />;
    }else if(props.rabbitLoc === blockCount){
      return <Block value={blockCount} image={`url(${rabbit_img})`} />;
    }else{
      return <Block value={blockCount} image={'none'} />;
    }

  }  

  return (
    <div>
      <div className="status">{status}</div>
      {addRows()}
    </div>
  );
}


/**
 * Component to draw each block(of maze) with image if any
 * This component:
 * 1. takes image url or none as parameter from mazeGenerator
 * 2. style background image correctly
 * 3. return button with correct and image style
 */
function Block(props) {

  //background image style
  var blockStyle = {
    backgroundSize: "20px",
    backgroundRepeat  : 'no-repeat',
    backgroundPosition: 'center',
    backgroundImage: props.image
  };
  
  return <button style={ blockStyle } className="block" id={"block_" + props.value}>
  </button>;
}


