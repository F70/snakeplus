//snake
function Snake(length,width,speed,turningRadius) {
	
	this.length=length
	this.width=width
	this.speed=speed
	this.turningRadius=turningRadius
	this.parts=[new Part(this.length,{x:game.groundSize/2,y:game.groundSize/2+this.width/2+this.length/2},-Math.PI/2,0)]
	this.headPoint={x:game.groundSize/2,y:game.groundSize/2-this.width/2-this.length/2}
	this.ungrownLength=0
	
}

Snake.prototype.extend=function(length,extendType) {
	
	if (extendType!=this.parts[this.parts.length-1].partType||length+this.parts[this.parts.length-1].length>game.groundSize-this.width) {
		var newStartPoint=Object.clone(this.parts[this.parts.length-1].endPoint)
		if (newStartPoint.x<0) {
			newStartPoint.x+=game.groundSize
		} else if (newStartPoint.x>=game.groundSize) {
			newStartPoint.x-=game.groundSize
		} 
		if (newStartPoint.y<0) {
			newStartPoint.y+=game.groundSize
		} else if (newStartPoint.y>=game.groundSize) {
			newStartPoint.y-=game.groundSize
		}
		this.parts.push(new Part(length,newStartPoint,this.parts[this.parts.length-1].endDirection,extendType))
	} else {
		this.parts[this.parts.length-1].extend(length)
	}
	this.headPoint={
		x:this.parts[this.parts.length-1].endPoint.x+this.width*Math.cos(this.parts[this.parts.length-1].endDirection),
		y:this.parts[this.parts.length-1].endPoint.y+this.width*Math.sin(this.parts[this.parts.length-1].endDirection),
	}
	if (this.headPoint.x<0) {
			this.headPoint.x+=game.groundSize
		} else if (this.headPoint.x>=game.groundSize) {
			this.headPoint.x-=game.groundSize
		} 
		if (this.headPoint.y<0) {
			this.headPoint.y+=game.groundSize
		} else if (this.headPoint.y>=game.groundSize) {
			this.headPoint.y-=game.groundSize
		}
	
}

Snake.prototype.shorten=function(length) {
	
	while (this.parts[0].length<=length) {
		length-=this.parts[0].length
		this.parts.shift()
	}
	this.parts[0].shorten(length)
	
}

Snake.prototype.move=function(moveType) {
	
	this.extend(this.speed,moveType)
	if (this.speed<=this.ungrownLength) {
		this.ungrownLength-=this.speed
	} else {
		this.shorten(this.speed-this.ungrownLength)
		this.ungrownLength=0
	}
	
}

Snake.prototype.draw=function() {
	
	game.canvas.clearRect(0,0,game.groundSize,game.groundSize)
	for (var t = 0; t < this.parts.length; t++) {
		this.parts[t].draw()
	}
	if (game.canvas.getImageData(this.headPoint.x,this.headPoint.y,1,1).data[3]!=0) {
		game.dead=true
	}
	var headDirection=this.parts[this.parts.length-1].endDirection
	for (var i=-1;i<2;i++) {
		for (var j=-1;j<2;j++) {
			
			game.canvas.moveTo(this.headPoint.x+i*game.groundSize,this.headPoint.y+j*game.groundSize)
			game.canvas.lineTo(this.headPoint.x-this.width*Math.cos(headDirection)-(this.width/2)*Math.sin(headDirection)+i*game.groundSize,this.headPoint.y-this.width*Math.sin(headDirection)+(this.width/2)*Math.cos(headDirection)+j*game.groundSize)
			game.canvas.lineTo(this.headPoint.x-this.width*Math.cos(headDirection)+(this.width/2)*Math.sin(headDirection)+i*game.groundSize,this.headPoint.y-this.width*Math.sin(headDirection)-(this.width/2)*Math.cos(headDirection)+j*game.groundSize)
			game.canvas.fillStyle=game.color
			game.canvas.fill()
			game.canvas.closePath()
			game.canvas.beginPath()
			
		}
	}
	
}