//1 - importar as configurações do servidor
var app = require('./config/server');

//2 - parametrizar a porta de escuta
var server = app.listen(80,function(){
	console.log('Servidor Online');
})

var io = require('socket.io').listen(server);

/* Criar a conexão por websocket*/
io.on('connection', function(socket){
	console.log('Usuário Conectado!!!');

	socket.on('disconnect', function(){
		console.log('Usuário Desconectado!!!');
	})

	socket.on('msgParaServidor', function(data){

		/* DIÁLOGOS */
		//DISPONIBILIZA A MENSAGEM NA TELA DE QUEM ENVIOU
		socket.emit(
			'msgParaCliente',
			{
				apelido: data.apelido,
				mensagem: data.mensagem
			}
		);

		//ENVIA MENSAGEM DE BROADCAST PARA TODOS DO CHAT MENOS PARA QUEM ENVIOU
		socket.broadcast.emit(
			'msgParaCliente',
			{
				apelido: data.apelido,
				mensagem: data.mensagem
			}
		);

		if(parseInt(data.apelido_atualizado) == 0){

			/* PARTICIPANTES */
			//DISPONIBILIZA A MENSAGEM NA TELA DE QUEM ENVIOU
			socket.emit(
				'participantes',
				{
					apelido: data.apelido
				}
			);

			//ENVIA MENSAGEM DE BROADCAST PARA TODOS DO CHAT MENOS PARA QUEM ENVIOU
			socket.broadcast.emit(
				'participantes',
				{
					apelido: data.apelido
				}
			);
		}
	});
});

app.set('io',io);
