var Hapi = require('hapi');
var path = require('path');
var fs = require('fs');

var ROT13Stream = require('./rot13');

var server = Hapi.createServer('localhost', Number(process.argv[2] || 8080));

server.route({
  method: 'GET',
  path: '/',
  handler: function(request, reply) {
    var stream = fs.createReadStream(path.join(__dirname, 'text.txt'));
    var rot13 = new ROT13Stream();
    reply(stream.pipe(rot13));
  }
});

server.start();
