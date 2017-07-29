// 1 - importar o módulo do framework express
var express = require('express');

// 2 - impotar o consign
var consign = require('consign');

// 3 - importar o body-parser
var bodyParser = require('body-parser');

// 4 - importar o express-validator
var expressValidator = require('express-validator');

// 5 - iniciar o objeto do express
var app = express();

// 6 - setar as variáveis 'view_engine' e 'views' do express
app.set('view engine', 'ejs');
app.set('views','./app/views');

// 7 - configurar o middleware express.static
app.use(express.static('./app/public'));

// 8 - configurar o middleware body-parser
app.use(bodyParser.urlencoded({extended: true}));

// 9 - configurar o middleware express-validator
app.use(expressValidator());

// 10 - configurar o consign (autoload)
// efetua o autoload das rotas, dos models, dos controllers para o objeto app
consign()
	.include('./app/routes')
	.then('./app/models')
	.then('./app/controllers')
	.into(app);
 
// exportar o objeto app
module.exports = app;