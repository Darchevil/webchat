const uuid = require('uuid/v4');
//create user
const createUser = ({name=""})=>(
  {
  id:uuid(),
  name
  }
)

const createMessage=({message = "", sender = ""}= { })=>(
  {
  id:uuid(),
  message, //contenu du message
  sender //nom de l'envoyeur
  }
)

const createChat=({messages=[], name="room", users = []} ={})=>(
  {
  id:uuid(),
  name,
  messages,
  users
  }
)

module.exports = {
  createUser,
  createChat,
  createMessage
}
