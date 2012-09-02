var html = require('fs').readFileSync(__dirname+'/index.html');
var static = require('node-static');
var url = require('url');
var fileServer = new static.Server('./static');

var server = require('http').createServer(function(req, res){
	var path_name = url.parse(req.url).pathname;
	console.log('Got request from :' + path_name);
	req.addListener('end', function () {
		fileServer.serve(req, res);
	    });

	if(path_name === '/') {
	    res.write(html);
	}
    });

server.listen(8080);
new static.Server();
var nowjs = require("now");
var everyone = nowjs.initialize(server);

everyone.now.distributeMessage = function(message){
    console.log(this.now.name+':'+message);
};
