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
	    playersIterator: null
	}
	this.playDice = this.playDice.bind(this);
	this.generateTable = this.generateTable.bind(this);
	this.playerInformation = this.playerInformation.bind(this);
	this.nextPlayer = this.nextPlayer.bind(this);
	this.movePlayer = this.movePlayer.bind(this);
	this.initializeGame = this.initializeGame.bind(this);
    }

    movePlayer(diceValue) {
	if (this.state.players[this.state.currentTurn] < 100) {
	    var newPosition = this.state.players[this.state.currentTurn] + diceValue
	    return this.state.snakeAndLadder[newPosition] ? this.state.snakeAndLadder[newPosition] : newPosition
	}
    }

    playDice() {
	if (this.state.players[this.state.currentTurn] > 100) {
	    alert("This game has won by "+ this.state.currentTurn );
	    this.initializeGame();
	}
	else {
	    var rolledValue = Math.floor((Math.random() * 12) + 1)
	    this.setState({diceValue: rolledValue,
			   players: Object.assign(this.state.players, {[this.state.currentTurn]: this.movePlayer(rolledValue)})})
	    this.nextPlayer();
	}
	console.log("executing from playDice");
	this.generateTable(100, {});
    }

    nextPlayer() {
	var playersSize = this.state.playersIterator.length;
	var currentIndex = this.state.playersIterator.indexOf(this.state.currentTurn);
	//debugger;
	this.setState({currentTurn: this.state.playersIterator[(currentIndex % playersSize) + 1]})
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
	// Pending: Read
	// use of arrow(=>) function preserves the state.
	// use of function {} looses the state.
	return Object.keys(this.state.players).map((key) => { return <div key={key}> {key}/ {this.state.players[key]}</div>});
    }

    generateTable (tableSize, data) {
	console.log("generateTable");
	var table_cells = []
	var playerPosition = (Object.keys(this.state.players).map((playerName) => {return this.state.players[playerName]}))
	console.log(playerPosition, "playerPos");
	for (var i = tableSize ; i > 0 ; i --) {
	    if (playerPosition.includes(i)) {
		table_cells.push(<div key = {i} class="board"><b>{Object.keys(this.state.players).find((playerName) => {return this.state.players[playerName]})}</b></div>)
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
		<div>
		{this.playerInformation()}
	    </div>
		<div> {this.state.diceValue} </div>
		<div> Play dice: <button onClick={() => this.playDice()}>Click</button></div>
		<div class="board-wrap">
		{this.generateTable(100, {players: {p1: 10, p2: 50}})}
	    </div>
		</div>);
    }
}

export default App;
