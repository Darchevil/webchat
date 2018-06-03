import React, {Component} from 'react';
import SideBar from './SideBar'
import {MESSAGE_SENT, MESSAGE_RECEIVED, ROOM_CHAT} from '../Events'
import ChatHeading from './ChatHeading'
import History from './History'
import Input from './Input'
export default class ChatPage extends Component{
  constructor(props) {
	  super(props);

	  this.state = {
	  	rooms:[],
	  	activeRoom:null
	  };
	}

	componentDidMount() { //A l'appel du composant
		const { socket } = this.props //On récupère la socket
		socket.emit(ROOM_CHAT, this.resetChat) //On initialise le salon de chat
	}
//**********************Initialisation du salon**************************
	resetChat = (chat)=> {
		return this.addChat(chat, true)
	}

//************************Création d'un salon*****************************
	addChat = (chat, reset)=>{
    console.log(chat);
    //Récupération de socket et salons
		const { socket } = this.props
		const { rooms } = this.state

		const newChats = reset ? [chat] : [...rooms, chat]
		this.setState({rooms:newChats, activeRoom:reset ? chat : this.state.activeRoom})

		const messageEvent = `${MESSAGE_RECEIVED}-${chat.id}`

		socket.on(messageEvent, this.addMessageToChat(chat.id))
	}

//**********************Ajout d'un message dans le salon**************************
	addMessageToChat = (chatId)=>{ //On ajoute un message au salon
		return message => {
			const { rooms } = this.state //On récupère les salons
			let newChats = rooms.map((chat)=>{
				if(chat.id === chatId)
					chat.messages.push(message)
				return chat
			})

			this.setState({rooms:newChats})
		}
	}
//***********************Envoi du message au serveur *********************************
	sendMessage = (chatId, message)=>{ //La fonction récupère le message et l'ID du salon
		const { socket } = this.props //On récupère la socket
		socket.emit(MESSAGE_SENT, {chatId, message} ) //On emit l'événement MESSAGE_SENT avec l'ID du salon et le message
	}

	setActiveRoom = ({activeRoom})=>{
		this.setState({activeRoom})
	}
	render() {
    //Récupération des props et states
		const { user, logout } = this.props
		const { rooms, activeRoom } = this.state
		return (
      //Le composant retourne la barre du coté avec les salon, l'utilisateur et le bouton de déconnexion
			<div className="container">
				<SideBar
					logout={logout}
					rooms={rooms}
					user={user}
					activeRoom={activeRoom}
					setActiveRoom={this.setActiveRoom}
					/>
				<div className="chat-room-container">
					{
						activeRoom !== null ? ( //Si on est dans un salon

							<div className="chat-room">
								<ChatHeading name={activeRoom.name} />
								<History
									messages={activeRoom.messages}
									user={user}
									/>
								<Input
									sendMessage={ // on passe un paramètre message dans la fonction sendMessage plus haut
										(message)=>{
											this.sendMessage(activeRoom.id, message)
										}
									}
									/>

							</div>
						):
						<div className="chat-room-choose">
							<h3>Choose a chat!</h3>
						</div>
					}
				</div>

			</div>
		);
	}
}
