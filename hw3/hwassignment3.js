var fs = require('fs');
var inputText = fs.createReadStream('./input.txt');
var Transform = require('stream').Transform;
var util = require(	"util" ).inherits;
var program = require( 'commander' );

var thePatternToSplit = '';
function PatternMatch(programParams)
{

	thePatternToSplit = programParams.pattern;
	Transform.call( this, {objectMode:true});
	this._inputBuffer = "";
}

util(PatternMatch, Transform);

PatternMatch.prototype._transform = function(chunk, encoding, done)
{
	console.log("-------INPUT------------\n")
	var data = chunk.toString();
	console.log(data);
	if(this._lastLineData)
	{
		data = this._lastLineData + data;
	}
	console.log("-------OUTPUT------------\n")
	var lines = data.split(thePatternToSplit);
	console.log(lines)
	
	this._lineLineData = lines.splice(lines.length-1, 1)[0];
	lines.forEach(this.push.bind(this));
	done();
}
PatternMatch.prototype._flush = function(done)
{
	if(this._lastLineData)
	{
		this.push(this._lastLineData);
	}

	this._lastLineData = null;
	done();
}



program.option('-p, --pattern <patter>','Input Patterns such as , .').parse(process.argv);

var patternStream = inputText.pipe(new PatternMatch(program));
//I do not think this is used
patternStream.on('readable', function(){

});