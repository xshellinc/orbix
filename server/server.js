const Hapi = require('hapi');
const Good = require('good');
const Inert = require('inert')
const Nes = require('nes');
const Path = require('path');

let red = 0;
let blue = 0;
let green =0;
let s1 =0;
let s2=180;
const server = new Hapi.Server({
  connections: {
    routes: {
      files: {
        relativeTo: Path.join(__dirname, 'public')
      }
    }
  }}
);

server.connection({
  port : process.env.PORT || 4000
});


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
    path: '/led',
    config: {
      id: 'LED',
      handler: function (request, reply) {
        if (request.payload.r) {
          red = request.payload.r
        }
        if (request.payload.g) {
          green=request.payload.g
        }
        if (request.payload.b) {
          blue=request.payload.b
        }
        server.publish('/led',
          {
            R: Number(red),
            G: Number(green),
            B: Number(blue)
          }
        );
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
      if (request.payload.s1) {
        s1=request.payload.s1
      }
      if (request.payload.s2) {
        s2=request.payload.s2
      }
      server.publish('/servo',

        {
          S1: Number(s1),
          S2: Number(s2)
        }
      );
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
        server.publish('/status', { Status: Number(request.payload.status) });
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
