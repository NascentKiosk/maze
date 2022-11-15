import React, {
    Component
} from 'react';
import GameBoard from './GameBoard'
import _ from 'lodash'
import KeyHandler from 'react-key-handler';

export class Game extends Component {
    constructor(props) {
        super(props)
        this.state = {
            showGameBoard: false,
            boardHeight: 0,
            boardWidth: 0,
            randomPositions: [],
            playerPosition: {
                x: 0,
                y: 0
            },
            prevPlayerPos: {
                x: 0,
                y: 0
            },
            totalMoves: 0,
        }
        this.generateRandomObstacles = this.generateRandomObstacles.bind(this)
        this.handleKeyUp = this.handleKeyUp.bind(this)
        this.handleKeyDown = this.handleKeyDown.bind(this)
        this.handleKeyRight = this.handleKeyRight.bind(this)
        this.handleKeyLeft = this.handleKeyLeft.bind(this)
        this.countTotalMoves = this.countTotalMoves.bind(this)
        this.setPlayerPosition = this.setPlayerPosition.bind(this)
        this.getBoardSizeFromUser = this.getBoardSizeFromUser.bind(this)
        this.startGame = this.startGame.bind(this)
    }
    componentWillMount() {
        this.getBoardSizeFromUser()
    }
    getBoardSizeFromUser() {

        let boardWidth = prompt("Please enter the board width")
        if (boardWidth > 0) {
            let boardHeight = prompt("Please enter the board height")
            if (boardHeight > 0) {
                this.setState({
                    boardHeight,
                    boardWidth
                }, () => {
                    this.startGame()
                })
            } else {
                boardHeight = 0
                boardWidth = 0
                this.getBoardSizeFromUser()
            }
        } else {
            boardWidth = 0
            this.getBoardSizeFromUser()
        }
    }
    startGame() {
        this.setPlayerPosition()
        this.generateRandomObstacles()
    }
    setPlayerPosition() {
        let {
            boardHeight,
            boardWidth
        } = this.state
        let playerPosition = {
            x: Math.floor(boardHeight / 2),
            y: Math.floor(boardWidth / 2)
        }
        this.setState({
            playerPosition,
            showGameBoard: true
        })
    }

    generateRandomObstacles() {
        let {
            randomPositions
        } = this.state
        let randomValues = []
        let {
            boardHeight,
            boardWidth
        } = this.state
        let smallest = 0
        if (Number(boardHeight) < Number(boardWidth)) {
            smallest = boardHeight
        } else {
            smallest = boardWidth
        }
        for (let i = 0; i < Math.ceil(smallest / 2); i++) {
            randomValues.push(_.random(0, smallest - 1))
        }
        for (let i = 0; i < randomValues.length; i++) {
            for (let j = 0; j < randomValues.length; j++) {
                let newRandomPosition = {
                    x: randomValues[i],
                    y: randomValues[j]
                }
                if (!randomPositions.includes(newRandomPosition)) {
                    randomPositions.push(newRandomPosition)
                }
            }
        }
        this.setState({
            randomPositions
        })
    }
    countTotalMoves() {
        this.setState({
            totalMoves: ++this.state.totalMoves
        })
    }
    handleKeyUp(e) {
        e.preventDefault()
        let {
            playerPosition,
        } = this.state

        let prevPos = {
            x: playerPosition.x,
            y: playerPosition.y
        }
        let newX = playerPosition.x
        if (Number(newX) - 1 >= 0) {
            --newX
            playerPosition["x"] = newX
            this.setState({
                playerPosition,
                prevPlayerPos: prevPos
            })
            this.countTotalMoves()
        }
    }
    handleKeyDown(e) {
        e.preventDefault()
        let {
            playerPosition,
            boardHeight,
        } = this.state

        let prevPos = {
            x: playerPosition.x,
            y: playerPosition.y
        }

        let newX = playerPosition.x
        if (Number(newX) + 1 < boardHeight) {
            ++newX
            playerPosition["x"] = newX
            this.setState({
                playerPosition,
                prevPlayerPos: prevPos
            })
            this.countTotalMoves()
        }
    }
    handleKeyRight(e) {
        e.preventDefault()
        let {
            playerPosition,
            boardWidth
        } = this.state

        let prevPos = {
            x: playerPosition.x,
            y: playerPosition.y
        }

        let newY = playerPosition.y
        if (Number(newY) + 1 < boardWidth) {
            ++newY
            playerPosition["y"] = newY
            this.setState({
                playerPosition,
                prevPlayerPos: prevPos
            })
            this.countTotalMoves()
        }
    }
    handleKeyLeft(e) {
        e.preventDefault()
        let {
            playerPosition,
        } = this.state

        let prevPos = {
            x: playerPosition.x,
            y: playerPosition.y
        }
        let newY = playerPosition.y
        if (Number(newY) - 1 >= 0) {
            --newY
            playerPosition["y"] = newY
            this.setState({
                playerPosition,
                prevPlayerPos: prevPos
            })
            this.countTotalMoves()
        }
    }

    render() {
        return (
        <div>
          <KeyHandler keyValue = "ArrowUp"
            onKeyHandle = {
                this.handleKeyUp
            }
            /> 
            <KeyHandler keyValue = "ArrowDown"
            onKeyHandle = {
                this.handleKeyDown
            }
            /> 
            <KeyHandler keyValue = "ArrowRight"
            onKeyHandle = {
                this.handleKeyRight
            }
            /> 
            <KeyHandler keyValue = "ArrowLeft"
            onKeyHandle = {
                this.handleKeyLeft
            }
            />

            {
                this.state.showGameBoard &&
                    ( < GameBoard randomPositions = {
                            this.state.randomPositions
                        }
                        boardWidth = {
                            this.state.boardWidth
                        }
                        boardHeight = {
                            this.state.boardHeight
                        }
                        playerPosition = {
                            this.state.playerPosition
                        }
                        prevPlayerPos = {
                            this.state.prevPlayerPos
                        }
                        totalMoves = {
                            this.state.totalMoves
                        }
                        />) 
                    } 
        </div>
            
                    
            )
        }
    }

    