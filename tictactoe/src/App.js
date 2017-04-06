import React, {Component} from 'react';
import logo from './logo.svg';
import './App.css';

class App extends Component {

    constructor(props) {
        super(props);
        this.state = {
            PLAYER_ONE: "X",
            PLAYER_TWO: "0",
            currentTurn: "X",
            board: ["", "", "", "", "", "", "", "", ""],
            winner: null
        };
    }

    handleClick(index) {
        if (this.state.board[index] === "" && !this.state.winner) {
            console.log(this.state.currentTurn);
            console.log(index);
            console.log(this.state.board);
            this.state.board[index] = this.state.currentTurn;
            console.log("this.state.board[x] " + this.state.board[index]);
            this.setState({
                board: this.state.board,
                currentTurn: (this.state.currentTurn === this.state.PLAYER_ONE) ?
                    this.state.PLAYER_TWO :
                    this.state.PLAYER_ONE,
                winner: this.checkWinner(),
            });

        }
    }


    checkWinner() {
        var currentTurn = this.state.currentTurn;
        var board = this.state.board;
        var winnerCombinations = [[0, 1, 2], [3, 4, 5], [6, 7, 8], [0, 3, 6], [1, 4, 7], [2, 5, 8], [0, 4, 8], [2, 4, 6]];
        return winnerCombinations.find(function (combo) {
            if (board[combo[0]] !== "" && board[combo[1]] !== "" && board[combo[2]] !== "" &&
                board[combo[0]] === board[combo[1]] && board[combo[1]] === board[combo[2]]) {
                return currentTurn;
            }
            else {
                return false;
            }
        })
    }


    reset() {
        this.setState({
            board: ["", "", "", "", "", "", "", "", ""],
            currentTurn: "X",
            winner: null
        });
    }

    render() {
        return (
            <div className="App">
                <div className="App-header">
                    <img src={logo} className="App-logo" alt="logo"/>
                    <h2>Lets play tictactoe</h2>
                </div>
                <div className="App-intro">
                    {this.state.winner ? <h1>{`The winner is ${this.state.winner}`}</h1> : null}
                    <div className="board">
                        {this.state.board.map((cell, index) => {
                            return <div onClick={() => this.handleClick(index)} key={index}
                                        className="square">{cell}</div>;
                        })}
                    </div>
                    <button className="button" onClick={() => this.reset()}>Reset Game</button>
                </div>
            </div>
        );
    }
}

export default App;
