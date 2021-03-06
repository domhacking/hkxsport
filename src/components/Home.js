import React, { Component } from 'react'
import firebase from '../config/firebase.js'
import Button from './button.js'



export default class Home extends Component {
    constructor(){
        super();
        this.state = {
            players : [],
            user: null,
            something: "Dom"
        }
    }

    componentDidMount(){
        const playerList = firebase.database().ref('players')

        playerList.on('value', (snapshot) => {
            let  players = snapshot.val();
            let newState = [];

            for (let player in players) {
                newState.push({
                    playerId: player,
                    playername : players[player].playername,
                    gameswon:  players[player].gameswon
                });
            }

            this.setState({
                players: newState,
                something: "Dom"
            });
        })

    }






  render () {
    return (
      <div>
          <h1>League Table</h1>
          <ul>
              {this.state.players.map((player) => {
                  return (
                      <li key={player.playerId}>
                          <h3>{player.playername}</h3>
                          <p>{player.gameswon}</p>
                      </li>
                  )
              })}
          </ul>
          <Button name={this.state.something}/>
      </div>
    )
  }
}
