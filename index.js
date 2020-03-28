const express = require('express');
const http = require('http')

const hostname = 'localhost';
const port = 3000;

const app = express();

app.use((request, response, next) => {
    console.log(request.headers)
    response.statusCode = 200
    response.setHeader('Content-Type', 'text/html')
    response.end('<html><body><h1>This is an express server</h1></body></html>')
})

const server = http.createServer(app)

server.listen(port, hostname, () => {
    console.log(`Server is up and running on http://${hostname}:${port}`)
})




