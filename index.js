const express = require('express');
const http = require('http');
const morgan = require('morgan');
const bodyParser = require('body-parser');

const hostname = 'localhost';
const port = 3000;

const app = express();
app.use(morgan('dev'));
app.use(bodyParser.json());

//ALL handles all the HTTP methods (GET, POST, PUT, DELETE)
app.all('/dishes', (request, response, next) => {
    response.statusCode = 200
    response.setHeader('Content-Type', 'text/plain')
    //this calls the execution of the next /dishes method.
    //in this case, it will pass the reques to the get, post, put or delete method.
    //Sending the modified object.

    //The methods are executed sequentially 
    next()
})

app.get('/dishes', (request, response, next) => {
    response.end('Will send all the dishes to you!');
})

app.post('/dishes', (request, response, next) => {
    response.end(`Will add the dish: ${request.body.name} with details: ${request.body.description}`)
})

app.put('/dishes', (request, response, next) => {
    response.statusCode = 403;
    response.end("Put operation not supported")
})

app.delete('/dishes', (request, response, next) => {
    response.end("Deleting all dishes")
})

//ADDING /DISHES/DISHID
app.get('/dishes/:dishId', (request, response, next) => {
    response.end(`Will send detials of the dish: ${request.params.dishId}`);
})

app.post('/dishes/:dishId', (request, response, next) => {
    response.statusCode = 403;
    response.end(`Pust operation not supported on: /dishes/${request.params.dishId}`);
})

app.put('/dishes/:dishId', (request, response, next) => {
    //write adds a line to the response
    response.write(`Will update the dish: ${request.params.dishId}\n`)
    response.end(`Will add the dish: ${request.body.name} with details: ${request.body.description}`);
})

app.delete('/dishes/:dishId', (request, response, next) => {
    response.end(`Will delete the dish: ${request.params.dishId}`);
})

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




