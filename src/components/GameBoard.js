import React, {
    Component
} from 'react';
import pressed from "pressed"
// Initialize the system
pressed.start()

export class GameBoard extends Component {
    constructor(props) {
        super(props)
        this.state = {
            board: [],
            entityStates: {
                obstacle: 'X',
                empty: ' ',
                player: 'O'
            }
        }
        this.setObstacles = this.setObstacles.bind(this)
        this.setPlayerPosition = this.setPlayerPosition.bind(this)
        this.setBoard = this.setBoard.bind(this)
    }
    componentWillMount() {
        let {
            boardHeight,
            boardWidth,
            playerPosition
        } = this.props
        let board = []

        for (let i = 0; i < boardHeight; i++) {
            let innerArray = []

            for (let j = 0; j < boardWidth; j++) {
                let obj = {}
                obj['x'] = i
                obj['y'] = j
                if (playerPosition.x === i && playerPosition.y === j) {
                    obj['state'] = this.state.entityStates.player
                } else {
                    obj['state'] = this.state.entityStates.empty
                }

                let temp = []
                innerArray.push(obj)
                temp.push(obj)
            }
            board.push(innerArray)
        }
        this.setState({
            board: board,
            playerPosition
        }, () => {
            this.setPlayerPosition(playerPosition)
            this.setObstacles(this.props.randomPositions)
        })
    }
    setPlayerPosition(playerPosition) {
        let {
            board
        } = this.state
        board[playerPosition.x][playerPosition.y]["state"] = this.state.entityStates.player
        this.setState({
            board
        })
    }
    componentWillReceiveProps(nextProps) {
        if (nextProps === this.props) {} else {
            this.setBoard(nextProps)
        }
    }

    setBoard(props) {
        let {
            playerPosition,
            prevPlayerPos
        } = props
        let newTotalObstacles = this.state.totalObstaclesLeft

        if (this.state.totalObstaclesLeft !== undefined && this.state.totalObstaclesLeft === 0) {
            alert("Game over. Total moves: " + this.props.totalMoves)
        } else {
            let {
                board
            } = this.state
            let newPlayerPos = playerPosition
            if (board[newPlayerPos.x][newPlayerPos.y]["state"] === this.state.entityStates.obstacle) {
                --newTotalObstacles
            }
            board[newPlayerPos.x][newPlayerPos.y]["state"] = this.state.entityStates.player
            board[prevPlayerPos.x][prevPlayerPos.y]["state"] = this.state.entityStates.empty
            this.setState({
                board: board,
                playerPosition,
                totalObstaclesLeft: newTotalObstacles
            }, () => {
                this.setPlayerPosition(playerPosition)
            })
        }
    }
    setObstacles(randomPositions) {
        let {
            board,
            playerPosition
        } = this.state
        let totalObstaclesLeft = 0
        for (let i = 0; i < randomPositions.length; i++) {
            if (randomPositions[i].x !== playerPosition.x && randomPositions[i].y !== playerPosition.y) {
                if (board[randomPositions[i].x][randomPositions[i].y]["state"] !== this.state.entityStates.obstacle) {
                    ++totalObstaclesLeft
                    board[randomPositions[i].x][randomPositions[i].y]["state"] = this.state.entityStates.obstacle
                }
            }
        }
        this.setState({
            board,
            totalObstaclesLeft
        })
    }
    render() {
        let {
            board
        } = this.state
        return ( 
            <table >
                <tbody > {
                    board.map((item, index) => ( 
                        <tr key = {
                            index
                        } > 
                        {
                            item.map((innerItem, innerIndex) => ( <
                                td key = {
                                    innerIndex
                                }
                                style = {
                                    {
                                        border: "1px solid black",
                                        margin: 0,
                                        width: 50,
                                        height: 50,
                                        textAlign: 'center',
                                        verticalAlign: 'middle'
                                    }
                                } >
                                <
                                p > {
                                    innerItem.state
                                } < /p> < /
                                td >
                            ))
                        } 
                        </tr>
                    ))
                } 
                </tbody> 
            </table >
        )
    }
}
