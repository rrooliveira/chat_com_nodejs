module.exports.iniciarChat = function(application, request, response){

	var dadosForm = request.body;

	request.assert('apelido','Por favor, digite um nome ou apelido!').notEmpty();
	request.assert('apelido','O nome ou apelido deve ter entre 3 e 15 caracteres!').len(3,15);

	var erros = request.validationErrors();

	if(erros){
		response.render('index',{validacao: erros});
		return;
	}

	application.get('io').emit(
		'msgParaCliente',
		{
			apelido: dadosForm.apelido, 
			mensagem: 'Acabou de entrar no chat.'
		}
	);

	response.render('chat',{dadosUsuarioForm: dadosForm});
}