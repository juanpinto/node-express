const express = require('express');
const http = require('http');
const morgan = require('morgan');

const hostname = 'localhost';
const port = 3000;

const app = express();
app.use(morgan('dev'));


//This makes my files available and does the routing.
app.use(express.static(`${__dirname}/public`))

app.use((request, response, next) => {
    response.statusCode = 200
    response.end('<html><body><h1>This is an express server</h1></body></html>')
})

const server = http.createServer(app)

server.listen(port, hostname, () => {
    console.log(`Server is up and running on http://${hostname}:${port}`)
})




