import React, {Component} from 'react'

export default class Input extends Component{
  constructor(props)
  {
    super(props);

    this.state = {
      message:""
    }
  }

//**************************Ecriture dans le champs d'entrée et envoi de message ******************
  handleSubmit = (e)=>{
    e.preventDefault();

    this.sendMessage()
    this.setState({message:""})
  }

  sendMessage = () =>{
    this.props.sendMessage(this.state.message)
  }


  change = (event)=>{ //Fonction qui permet à l'utilisateur de d'écrire dans la zone de texte
    this.setState({message:event.target.value})
  }

  //******************************************************************************************

  render () {
    const {message} = this.state

    return (


      <div className = "message-input">
      <ul id="messages"></ul>
      <form
        onSubmit = {this.handleSubmit}
        className ="message-form">
        <input
          id="messages"
          autoComplete={"off"}
          ref= {"messageinput"}
          type = "text"
          className = "form-control"
          value = {message}
          placeholder = "type here"
          onKeyUp = { e => { e.keyCode !== 13}}
          onChange={ (this.change) }
           />
        <button
          disable = "message.length < 1"
          type = "submit"
          className = "sendButton"
          >Send</button>
      </form>
      </div>
    )
  }
}
