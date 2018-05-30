import React, { Component } from 'react';
import './App.css';

class App extends Component {

    constructor(props) {
	super(props);
	this.state = {
	    player1: {name: "Player1", position: 1, turn: true},
	    player2: {name: "Player2", position: 1, turn: false},
	    diceValue: 0,
	    setup: false,
	}
	this.playDice = this.playDice.bind(this);
	this.generateTable = this.generateTable.bind(this);
    }

    playDice() {
	this.setState({diceValue: Math.floor((Math.random() * 12) + 1)})
	//this.setState((prevState) => ({
	//    diceValue : Math.floor((Math.random() * 12) + 1)}));
    }

    componentDidMount () {
	this.setState({
	    diceValue: 0,
	    setup: false})
    }
    generateTable (tableSize, data) {
	var table_cells = []
	for (var i = tableSize ; i > 0 ; i --) {
	    if (i === data.players.p1) {
		table_cells.push(<div class="board"><b>##{data.players.p1}##</b></div>)
	    }
	    else if (i === data.players.p2) {
		table_cells.push(<div class="board"><b>##{data.players.p2}##</b></div>)
	    }
	    else{
		table_cells.push(<div class="board">{i}</div>)
	    }
	}
	return table_cells
    }

  render() {
      return (
	      <div className="App">

	      <div> Player1: {this.state.player1.name === "" ? "Noname":  this.state.player1.name} / {this.state.player1.position}</div>
	      <div> Player1: {this.state.player2.name === "" ? "Noname":  this.state.player2.name} / {this.state.player2.position}</div>
	      <div> {this.state.diceValue} </div>
	      <div> Play dice: <button onClick={this.playDice}>Click</button></div>
	      <div class="board-wrap">
	      {this.generateTable(100, {players: {p1: 10, p2: 50}})}
	  </div>
	  </div>);
  }
}

export default App;
