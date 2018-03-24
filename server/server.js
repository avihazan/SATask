const express = require('express');
const cookieParser = require('cookie-parser');
const path = require('path');
const routes = require('./routes');
const logger = require('morgan');
const port = normalizePort(process.env.PORT || '1234');
const router = express.Router();
const bodyParser = require('body-parser');

const app = express();

// set port
app.set('port', port);

// view engine setup
app.set('view engine', 'html');
app.use([bodyParser.json(), bodyParser.urlencoded({extended: true})]);
app.use(express.static(path.join(__dirname, '../client')));

// tools
app.use(logger('dev'));
app.use(cookieParser());

// catch 500
app.use(function(err, req, res, next) {
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};
    res.status(err.status || 500);
    res.render('error');
});

app.use('/api', routes);

router.get('/', (req, res, next) => {
  res.sendFile(path.join(__dirname, '..', 'client', 'index.html'));
});

app.listen(port);
app.on('error', onError);
app.on('listening', onListening);

function onListening() {
    var addr = app.address();
    var bind = typeof addr === 'string' ? 'pipe ' + addr : 'port ' + addr.port;
    debug('Listening on ' + bind);
}

function onError(error) {
    if (error.syscall !== 'listen') {
        throw error;
    }

    var bind = typeof port === 'string' ? 'Pipe ' + port : 'Port ' + port;

    // handle specific listen errors with friendly messages
    switch (error.code) {
        case 'EACCES':
            console.error(bind + ' requires elevated privileges');
            process.exit(1);
            break;
        case 'EADDRINUSE':
            console.error(bind + ' is already in use');
            process.exit(1);
            break;
        default:
            throw error;
    }
}

function normalizePort(val) {
    var port = parseInt(val, 10);

    if (isNaN(port)) {
        // named pipe
        return val;
    }

    if (port >= 0) {
        // port number
        return port;
    }

    return false;
}