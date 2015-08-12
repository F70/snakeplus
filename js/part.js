//parts of game.snake
function Part(length,startPoint,startDirection,partType) {
	
	if (partType!=-1&&partType!=1&&partType!=0) {
		partType=0
	}
	
	
	this.length=length
	this.partType=partType //0=straight 1=clockwise -1=anticlockwise
	this.startPoint=Object.clone(startPoint)
	this.startDirection=startDirection//0=right pi/2=down
	
	if (this.startPoint.x>=game.groundSize) {
		this.startPoint.x-=game.groundSize
	} else if(this.startPoint.x<0) {
		this.startPoint.x+=game.groundSize
	}
	if (this.startPoint.y>=game.groundSize) {
		this.startPoint.y-=game.groundSize
	} else if(this.startPoint.y<0) {
		this.startPoint.y+=game.groundSize
	}
	
	switch (this.partType) {
		case 1:
			this.arcCenter={
				x:this.startPoint.x-game.snake.turningRadius*Math.sin(this.startDirection),
				y:this.startPoint.y+game.snake.turningRadius*Math.cos(this.startDirection),
			}
			this.endDirection=this.startDirection+this.length/game.snake.turningRadius
			if (this.endDirection>2*Math.PI) {this.endDirection-=2*Math.PI}
			this.endPoint={
				x:this.arcCenter.x+game.snake.turningRadius*Math.sin(this.endDirection),
				y:this.arcCenter.y-game.snake.turningRadius*Math.cos(this.endDirection),
			}
			break;
		case -1:
			this.arcCenter={
				x:this.startPoint.x+game.snake.turningRadius*Math.sin(this.startDirection),
				y:this.startPoint.y-game.snake.turningRadius*Math.cos(this.startDirection),
			}
			this.endDirection=this.startDirection-this.length/game.snake.turningRadius
			if (this.endDirection<0) {this.endDirection+=2*Math.PI}
			this.endPoint={
				x:this.arcCenter.x-game.snake.turningRadius*Math.sin(this.endDirection),
				y:this.arcCenter.y+game.snake.turningRadius*Math.cos(this.endDirection),
			}
			break;
		default://partType==0
			this.endDirection=this.startDirection
			this.endPoint={
				x:this.startPoint.x+this.length*Math.cos(this.startDirection),
				y:this.startPoint.y+this.length*Math.sin(this.startDirection),
			}
			this.arcCenter=null
			break;
	}
	
}

Part.prototype.extend=function(extendLength) {
	
	this.length+=extendLength
	
	switch (this.partType) {
		case 1:
			this.endDirection=this.startDirection+this.length/game.snake.turningRadius
			if (this.endDirection>2*Math.PI) {this.endDirection-=2*Math.PI}
			this.endPoint={
				x:this.arcCenter.x+game.snake.turningRadius*Math.sin(this.endDirection),
				y:this.arcCenter.y-game.snake.turningRadius*Math.cos(this.endDirection),
			}
			break;
		case -1:
			this.endDirection=this.startDirection-this.length/game.snake.turningRadius
			if (this.endDirection<0) {this.endDirection+=2*Math.PI}
			this.endPoint={
				x:this.arcCenter.x-game.snake.turningRadius*Math.sin(this.endDirection),
				y:this.arcCenter.y+game.snake.turningRadius*Math.cos(this.endDirection),
			}
			break;
		default://partType==0
			this.endPoint={
				x:this.startPoint.x+this.length*Math.cos(this.startDirection),
				y:this.startPoint.y+this.length*Math.sin(this.startDirection),
			}
			break;
	}
	
}

Part.prototype.shorten=function(shortenLength) {
	
	this.length-=shortenLength
	
	switch (this.partType) {
		case 1:
			this.startDirection=this.endDirection-this.length/game.snake.turningRadius
			if (this.startDirection<0) {this.startDirection+=2*Math.PI}
			this.startPoint={
				x:this.arcCenter.x+game.snake.turningRadius*Math.sin(this.startDirection),
				y:this.arcCenter.y-game.snake.turningRadius*Math.cos(this.startDirection),
			}
			break;
		case -1:
			this.startDirection=this.endDirection+this.length/game.snake.turningRadius
			if (this.startDirection>2*Math.PI) {this.startDirection-=2*Math.PI}
			this.startPoint={
				x:this.arcCenter.x-game.snake.turningRadius*Math.sin(this.startDirection),
				y:this.arcCenter.y+game.snake.turningRadius*Math.cos(this.startDirection),
			}
			break;
		default://partType==0
			this.startPoint={
				x:this.endPoint.x-this.length*Math.cos(this.startDirection),
				y:this.endPoint.y-this.length*Math.sin(this.startDirection),
			}
			break;
	}
	if (this.startPoint.x<0) {
		this.startPoint.x+=game.groundSize
		this.endPoint.x+=game.groundSize
	} else if (this.startPoint.x>=game.groundSize) {
		this.startPoint.x-=game.groundSize
		this.endPoint.x-=game.groundSize
	} 
	if (this.startPoint.y<0) {
		this.startPoint.y+=game.groundSize
		this.endPoint.y+=game.groundSize
	} else if (this.startPoint.y>=game.groundSize) {
		this.startPoint.y-=game.groundSize
		this.endPoint.y-=game.groundSize
	}
	
}

Part.prototype.draw=function() {
	
	game.canvas.beginPath()
	for (var i=-1;i<2;i++) {
		for (var j=-1;j<2;j++) {
			switch (this.partType) {
			case 1:
				game.canvas.arc(this.arcCenter.x+i*game.groundSize,this.arcCenter.y+j*game.groundSize,game.snake.turningRadius+game.snake.width/2,this.startDirection-Math.PI/2,this.endDirection-Math.PI/2,false)
				game.canvas.arc(this.arcCenter.x+i*game.groundSize,this.arcCenter.y+j*game.groundSize,game.snake.turningRadius-game.snake.width/2,this.endDirection-Math.PI/2,this.startDirection-Math.PI/2,true)
				break;
			case -1:
				game.canvas.arc(this.arcCenter.x+i*game.groundSize,this.arcCenter.y+j*game.groundSize,game.snake.turningRadius+game.snake.width/2,this.startDirection+Math.PI/2,this.endDirection+Math.PI/2,true)
				game.canvas.arc(this.arcCenter.x+i*game.groundSize,this.arcCenter.y+j*game.groundSize,game.snake.turningRadius-game.snake.width/2,this.endDirection+Math.PI/2,this.startDirection+Math.PI/2,false)
				break;
			default://partType==0
				game.canvas.moveTo(this.startPoint.x-Math.sin(this.startDirection)*(game.snake.width/2)+i*game.groundSize,this.startPoint.y+Math.cos(this.startDirection)*(game.snake.width/2)+j*game.groundSize)
				game.canvas.lineTo(this.startPoint.x+Math.sin(this.startDirection)*(game.snake.width/2)+i*game.groundSize,this.startPoint.y-Math.cos(this.startDirection)*(game.snake.width/2)+j*game.groundSize)
				game.canvas.lineTo(this.endPoint.x+Math.sin(this.startDirection)*(game.snake.width/2)+i*game.groundSize,this.endPoint.y-Math.cos(this.startDirection)*(game.snake.width/2)+j*game.groundSize)
				game.canvas.lineTo(this.endPoint.x-Math.sin(this.startDirection)*(game.snake.width/2)+i*game.groundSize,this.endPoint.y+Math.cos(this.startDirection)*(game.snake.width/2)+j*game.groundSize)
				break;
			}
			game.canvas.fillStyle=game.color
			game.canvas.fill()
			game.canvas.closePath()
			game.canvas.beginPath()
			
		}
	}
	
}