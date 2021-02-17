const express = require ('express');
const morgan = require('morgan');
const path = require('path');
const app = express();
const{ mongoose} = require('./database');


//Settings
app.set('port', process.env.PORT || 3000);
//Middlewares 
app.use(morgan('dev'));
app.use(express.json());

//Routes
app.use('/api/resources', require('./routes/resource.routes'));


//Static files
//console.log(path.join(__dirname, 'public'))
app.use(express.static(path.join(__dirname, 'public')));

//Starting server
app.listen(app.get('port'), () => {
    console.log(`Server on port ${app.get('port')}`);
});