const app = require('./app');
const config = require('./configs/config');
const port = config.port;

app.listen(port,_=> {
    console.log(`Server has Started in ${port} port ...`);
});