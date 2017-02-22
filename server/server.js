'use strict';

const Hapi = require('hapi');
const Good = require('good');
const Inert = require('inert')
const Nes = require('nes');
const Path = require('path');
// Create a server with a host and port
const server = new Hapi.Server(
  {connections: {
    routes: {
      files: {
        relativeTo: Path.join(__dirname, 'public')
      }
    }
  }}
);
// server.connection({
//     port : process.env.PORT || 4000
// });
server.connection({ port: 3000, host: 'localhost' });
function arrange(p1) {
    return Number(p1)%255;
}
server.register([Nes, Inert], function (err) {
    if (err) {
        throw err;
    }
    server.subscription('/led');
    server.subscription('/servo');
    server.subscription('/status');

    server.route({
      method:'GET',
      path: '/{param*}',
      config: {
        handler: {
          directory: {
            path: '.',
            redirectToSlash: true,
            index: true
          }
        }
      }
    });
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
              server.publish('/led', {R: arrange(request.payload.r),
                                      G: arrange(request.payload.g),
                                      B: arrange(request.payload.b)
                                    });
              return reply().code(204);
            }
        }
    });
    server.route({
        method: 'POST',
        path: '/servo',
        config: {
            id: 'servo',
            handler: function (request, reply) {
              console.log(arrange(request.payload.s1));
              server.publish('/servo', {S1: arrange(request.payload.s1),
                                      S2: arrange(request.payload.s2)
                                    });
              return reply().code(204);
            }
        }
    });
    server.route({
        method: 'POST',
        path: '/status',
        config: {
            id: 'status',
            handler: function (request, reply) {
              console.log(request.payload);
              server.publish('/status', {Status: arrange(request.payload.status)
                                    });
              return reply().code(204);
            }
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
