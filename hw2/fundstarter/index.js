var http = require("http"); 
var fs = require("fs"); 
var port = process.env.PORT || 8080; 
var fileName = "index.html"; 
var fullPath = __dirname + fileName; 
fs.open(fileName, 'r', function(err, fd)
{
    if(err) 
    {
	console.log(err);  
    }
    fs.stat(fileName, function(err, stats)
    {
	var buf = new Buffer(stats.size); 
	fs.read(fd, buf, 0, buf.length, 0, function(err,bytes,buffer)
	{
	    if(err)
	    {
		console.log(err); 	
	    }
	    console.log(bytes + " bytes read"); 

	    http.createServer(function(request,response)
	    {
		response.writeHead(200); 
		response.end(buffer.toString());
		
	    }).listen(port);
	    console.log("listening at port" + port);
	}); 
    });
});

