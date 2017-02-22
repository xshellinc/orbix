'use strict';

const Hapi = require('hapi');
const Good = require('good');
const Inert = require('inert')
var Nes = require('nes');
// Create a server with a host and port
const server = new Hapi.Server();
server.connection({
    port : process.env.PORT || 4000
});

server.register([Nes, Inert], function (err) {
    if (err) {
        throw err;
    }
    server.subscription('/led');
    server.route({
      method: 'POST',
      path: '/ping',
      config: {
        id: 'ping',
        handler: function (request, reply) {
          server.publish('/ping',{ping})
        }
      }
    });
    server.route({
        method: 'POST',
        path: '/led',
        config: {
            id: 'LED',
            handler: function (request, reply) {
              server.publish('/led', {R: Number(request.payload.r),
                                      G: Number(request.payload.g),
                                      B: Number(request.payload.b)
                                    });
              reply.file('./index.html');
            }
        }
    });
    server.subscription('/servo');
    server.route({
        method: 'POST',
        path: '/servo',
        config: {
            id: 'servo',
            handler: function (request, reply) {
              server.publish('/servo', {S1: Number(request.payload.s1),
                                      S2: Number(request.payload.s2)
                                    });
              reply.file('./index.html');
            }
        }
    });
    server.subscription('/status');
    server.route({
        method: 'POST',
        path: '/status',
        config: {
            id: 'status',
            handler: function (request, reply) {
              console.log(request.payload);
              server.publish('/status', {Status: Number(request.payload.status)
                                    });
              reply.file('./index.html');
            }
        }
    });
    server.route({
        method: 'GET',
        path: '/static',
        handler: function (request, reply) {
            reply.file('./index.html');
        }
    });
    server.start((err) => {

        if (err) {
            throw err;
        }
        console.log('Server running at:', server.info.uri);
    });

});;


// Start the server
