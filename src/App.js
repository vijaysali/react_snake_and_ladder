import React, { Component } from 'react';
import './App.css';

class App extends Component {

    constructor(props) {
	super(props);
	this.state = {
	    players: { player1: null,
		       player2: null},
	    diceValue: 0,
	    setup: false,
	    snakeAndLadder: {59: 10, 83: 35, 13: 43, 56: 90},
	    currentTurn: null,
	    playersIterator: null,
	    maxCellLimit: 100,
	    gameWinner: null,
	    maxDiceValue: 6
	}

	this.playDice = this.playDice.bind(this);
	this.generateTable = this.generateTable.bind(this);
	this.playerInformation = this.playerInformation.bind(this);
	this.nextPlayer = this.nextPlayer.bind(this);
	this.movePlayer = this.movePlayer.bind(this);
	this.initializeGame = this.initializeGame.bind(this);
    }

    movePlayer(diceValue) {
	if (this.state.players[this.state.currentTurn] < this.state.maxCellLimit) {
	    var newPosition = this.state.players[this.state.currentTurn] + diceValue
	    return this.state.snakeAndLadder[newPosition] ? this.state.snakeAndLadder[newPosition] : newPosition
	}
    }

    playDice(e) {
	e.preventDefault();
	if (this.state.gameWinner) {
	    alert("This game has won by "+ this.state.gameWinner );
	    this.initializeGame();
	}
	else {
	    var rolledValue = Math.floor((Math.random() * this.state.maxDiceValue) + 1)
	    if (this.movePlayer(rolledValue) >= this.state.maxCellLimit) {
	    this.setState({gameWinner: this.state.currentTurn});
	    }
	    this.setState({diceValue: rolledValue,
			   players: Object.assign(this.state.players, {[this.state.currentTurn]: this.movePlayer(rolledValue)})})
	    this.nextPlayer();
	}
	this.generateTable();
    }

    nextPlayer() {
	var playersSize = this.state.playersIterator.length;
	var currentIndex = this.state.playersIterator.indexOf(this.state.currentTurn)
	this.setState({currentTurn: this.state.playersIterator[(currentIndex + 1) % playersSize]})
    }

    initializeGame() {
	this.setState({
	    diceValue: 0,
	    setup: false,
	    players: {player1: 1, player2: 1},
	    playersIterator: Object.keys(this.state.players),
	    currentTurn: Object.keys(this.state.players)[0]})
    }

    playerInformation () {
	// Pending: Read, arrow(=>) and function. to check state
	return Object.keys(this.state.players).map((key) => { return <div key={key}> {key}/ {this.state.players[key]}</div>});
    }

    generateTable () {
	var table_cells = []
	var playerPosition = (Object.keys(this.state.players).map((playerName) => {return this.state.players[playerName]}))
	for (var i = this.state.maxCellLimit ; i > 0 ; i --) {
	    if (playerPosition.includes(i)) {
		table_cells.push(<div key = {i} class="players"><b>{Object.keys(this.state.players).filter((playerName) =>
													 {return this.state.players[playerName] === i})}</b></div>)
	    }
	    else {
		table_cells.push(<div key={i} class="board">{i}</div>)
	    }
	}
	return table_cells
    }

    componentDidMount () {
	this.initializeGame();
    }


    render() {
	return (
		<div className="App">
		<div>{this.playerInformation()}</div>
		<div><p> Dice value:{this.state.diceValue}</p>
		<p><button onClick={(e) => this.playDice(e)}>Role Dice</button></p></div>
		<div class="board-wrap">
		{this.generateTable()}
	    </div>
		</div>);
    }
}

export default App;
