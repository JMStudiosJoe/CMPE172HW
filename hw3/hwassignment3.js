var fs = require('fs');

var array = fs.readFileSync(process.argv[2]).toString().split(process.argv[3]);
for(i in array) 
{
    console.log(array[i]);
    console.log("------");
}