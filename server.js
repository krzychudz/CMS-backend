const app = require('./app');

const defaultPort = 8080;

app.set('port', process.env.PORT || defaultPort);
 
app.listen(app.get('port'), () => {
    console.log(`Listening on ${defaultPort}`)
});