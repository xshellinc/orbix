'use strict';

const Hapi = require('hapi');
const Good = require('good');
const Inert = require('inert')
var Nes = require('nes');
// Create a server with a host and port
const server = new Hapi.Server();
server.connection({
    host: 'localhost',
    port: 3000
});

server.register([Nes, Inert], function (err) {
    if (err) {
        throw err;
    }
    server.route({
        method: 'POST',
        path: '/static',
        config: {
            id: 'LED',
            handler: function (request, reply) {
              console.log(request.payload);
              reply.file('./index.html');
            }
        }
    });

    server.start(function (err) { /* ... */ });
});
// server.route({
//     method: 'POST',
//     path:'/LED',
//     handler: function (request, reply) {
//       console.log(parseInt(request.payload.r));
//       return reply({R: parseInt(request.payload.r), G: parseInt(request.payload.g), B: parseInt(request.payload.b)});
//     }
// });

server.register(Inert, (err) => {
    if (err) {
        throw err;
    }

    server.route({
        method: 'GET',
        path: '/static',
        handler: function (request, reply) {
            reply.file('./index.html');
        }
    });
});


// Start the server
server.start((err) => {

    if (err) {
        throw err;
    }
    console.log('Server running at:', server.info.uri);
});
