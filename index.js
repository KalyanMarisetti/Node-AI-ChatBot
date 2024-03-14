let express = require('express');
const bodyParser = require('body-parser');
const config = require('./config/config');

/**
 * @constant routes root routes object to handle all the requests.
 */
const routes = require('./routes');

/**
 * @constant app instance of the express object
 */
const app = express();

app.use(bodyParser.json({ limit: '50mb' }));
app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));

require('./config/DatabaseConfiguration').connect(config);

//Initialize Routes
app.use('/api', routes);

const server = require('http').createServer(app);

////////////////////////////////////////////////////////////////////////////////////
//
// 							Run Application Server
//
/////////////////////////////////////////////////////////////////////////////////////
server.listen(config.SERVER.PORT, () => {
    console.info('###############################################################');
    console.info(`\t\tMAIN SERVER RUNNING ON PORT:  ${config.SERVER.PORT}`);
    console.info('###############################################################');
});

module.exports = app;