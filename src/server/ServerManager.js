var io = require ('./index.js').io
const {VERIF_USER, USER_CONNECTED, DISCONNECT, USER_DISCONNECTED, ROOM_CHAT, MESSAGE_RECEIVED, MESSAGE_SENT} = require ('../Events')
const {createMessage, createUser, createChat} = require ('../fonctions')
let users = { } //Utilisateurs connectés

let sendMessageToChatFromSender;
let roomChat = createChat();

module.exports = function(socket){
  console.log("socket ID :" + socket.id);

  socket.on(VERIF_USER, (nickname, callback)=>{ //Le serveur attend qu'un utilisateur rentre son nom et le vérifie ici.
    if(isUser(users,nickname)){
      callback({ isUser:true, user:null}) //Le callback ici correspond à this.setUser. On appelle donc this.setUser
    }
    else {
      callback({isUser:false, user:createUser({name:nickname})})
      }
    })

    socket.on(USER_CONNECTED, (user)=>{
      users = addUser(users,user) //On appelle addUser en lui donnant la liste des utilisateurs connectés et l'utilisateur qu'on veut ajouter
      socket.user =  user

      sendMessageToChatFromSender = sendMessageToChat(user.name) //Définition de la variable permettant d'envoyer des messages en appelant la fonction sendMessageTochat

      io.emit(USER_CONNECTED, users)
      console.log(users);
    })


    socket.on('disconnect', ()=>{
      if("user" in socket){
        users = removeUser(users,socket.user.name)
        io.emit(USER_DISCONNECTED, users)
        console.log("Disconnect", users);
      }
    })

    socket.on(DISCONNECT, ()=>{
      users = removeUser(this.user, socket.user.name)
      io.emit(USER_DISCONNECTED, users)
      console.log("Disconnect", users)
    })


    socket.on(ROOM_CHAT, (callback)=>{
      callback(roomChat);
    })

    socket.on(MESSAGE_SENT, ({chatId, message}) => {

      sendMessageToChatFromSender(chatId,message) //Appelle la methode sendMessageToChat

    })
    }


    function addUser(userList, user){
      let newList = Object.assign({}, userList)
      newList [user.name] = user
      return newList
    }
    //**********************Retrait d'un utilisateur *****************************
    function removeUser(userList, username)
    {
      let newList = Object.assign({}, userList)
      delete newList [username]
      return newList
    }
    function isUser(userList, username){
      return username in userList
    }
    function sendMessageToChat(sender){
      return(chatId,message)=>{
        io.emit(`${MESSAGE_RECEIVED}-${chatId}`, createMessage({message,sender}))//Envoi en Broadcast à toutes les socket
      }
    }
