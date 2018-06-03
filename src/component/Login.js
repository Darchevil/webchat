import React, {Component} from 'react';
import {VERIF_USER} from '../Events';
export default class Login extends Component{

constructor(props){
  super(props);
  this.state = {
    nickname:"",
    error:""
  };
}

setUser = ({user, isUser})=>{
  console.log(user, isUser);
  if(isUser){ //Si l'utilisateur existe déjà
    this.setError("nom d'utilisateur déjà pris");
  }
  else {
    this.setError("Bonjour " + user.name);
    this.props.setUser(user)
  }
}

//****************************fonction d'entrée de login**********************************
entree = (event)=>{
  event.preventDefault()
  const {socket} = this.props //On récupère la socket
  const{nickname} = this.state //On récupère la variable nickname dans state
  socket.emit(VERIF_USER,nickname, this.setUser)
}
//****************************************************************************************

change = (event)=>{ //Fonction qui permet à l'utilisateur de d'écrire dans la zone de texte
  this.setState({nickname:event.target.value}) //On récupère la valeur de l'élément qui a déclenché l'événement (ce qu'on a rentré au clavier)
}

setError = (error)=>{
  this.setState({error});
}

  render () {
    //On récupère le nickname et error depuis state
    const {nickname, error} = this.state
    return (
      //Ici le composant renvoie la barre d'entrée de texte pour le login 
      <div className = "login">
        <form onSubmit= {this.entree}>
          <label htmlFor="nickname">
            <h3>Identifiez-vous </h3>
          </label>
          <input
            ref={(input) =>{this.textInput = input}}
            type="text"
            name="nickname"
            value={nickname}
            onChange={this.change}
            placeholder={'login'}
            />
            <div className="error"> {error ? error:null}</div>
        </form>

      </div>

    );
  }
}
