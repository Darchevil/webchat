var app = require('http').createServer()
var io = module.exports.io = require('socket.io')(app)

const PORT = process.env.PORT || 3231

const ServerManager = require('./ServerManager') //Importation du fichier ServerManager


io.on('connection', ServerManager) //Dès qu'il y a une connexion, on appelle le fichier ServerManager

app.listen(PORT, ()=>{
	console.log("Connected to port:" + PORT);
})
