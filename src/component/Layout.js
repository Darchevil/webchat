import React, { Component } from 'react';
import io from 'socket.io-client';
import {USER_CONNECTED} from '../Events'; //On importe l'événement USER_CONNECTED depuis le fichier ../Events
import {DISCONNECT} from '../Events'; //On importe l'événement DISCONNECT depuis le fichier Events.js
import Login from './Login'
import ChatPage from './ChatPage';

const socketUrl = "http://localhost:3231"; //Variable possédant l'adresse url du serveur

export default class Layout extends Component{

  constructor(props){ //Appel des props du fichier parent
    super(props);

    this.state = {
      socket:null,
      user:null
    };
  }
componentDidMount(){
  this.initSocket() //Appel de la fonction initSocket qui initialise la socket au moment où le composant est appelé
}

  initSocket = ()=>{
    const socket = io(socketUrl);//Permet la connexion au server avec l'url
    socket.on('connect', ()=>{
      console.log("connected");
    })
    this.setState({socket});//socket:null devient socket:socket
  }

//**************Définition de l'utilisateur **********************************
//permet de mettre l'utilisateur dans le state
setUser = (user)=>{ //Fonction de connexion
  const{socket} = this.state //On récupère notre socket depuis le state
  socket.emit(USER_CONNECTED, user); //On envoie a la socket le paramètre user sur l'événement USER_CONNECTED
  this.setState({user}); //user:null devient user:user

}

//************************Fonction de déconnexion *********************************
logout = ()=>{
		const { socket } = this.state //On récupère la socket
		socket.emit(DISCONNECT) //Emission d'un événement de déconnexion
		this.setState({user:null}) //user:user devient user:null

}

  render () {
    const {socket, user} = this.state; //On récupère la socket et l'utilisateur
    return (
      !user?
      <Login socket={socket} setUser={this.setUser}/>
      :
      <ChatPage socket = {socket} user = {user} logout={this.logout}/>

    )
  }
}
