//parts of snake
function Part(length,startPoint,startDirection,partType,currentSnake){
	
	this.snake=currentSnake
	
	if(partType!=-1&&partType!=1&&partType!=0){
		partType=0
	}
	
	this.length=length
	this.partType=partType //0=straight 1=clockwise -1=anticlockwise
	this.startPoint={
		x:startPoint.x,
		y:startPoint.y
	}
	this.startDirection=startDirection//0=right pi/2=down
	
	if(this.startPoint.x>=this.snake.game.groundSize){
		this.startPoint.x-=this.snake.game.groundSize
	}else if(this.startPoint.x<0){
		this.startPoint.x+=this.snake.game.groundSize
	}
	if(this.startPoint.y>=this.snake.game.groundSize){
		this.startPoint.y-=this.snake.game.groundSize
	}else if(this.startPoint.y<0){
		this.startPoint.y+=this.snake.game.groundSize
	}
	
	switch(this.partType){
		case 1:
			this.arcCenter={
				x:this.startPoint.x-this.snake.game.snake.turningRadius*Math.sin(this.startDirection),
				y:this.startPoint.y+this.snake.game.snake.turningRadius*Math.cos(this.startDirection),
			}
			this.endDirection=this.startDirection+this.length/this.snake.game.snake.turningRadius
			if(this.endDirection>2*Math.PI){this.endDirection-=2*Math.PI}
			this.endPoint={
				x:this.arcCenter.x+this.snake.game.snake.turningRadius*Math.sin(this.endDirection),
				y:this.arcCenter.y-this.snake.game.snake.turningRadius*Math.cos(this.endDirection),
			}
			break
		case -1:
			this.arcCenter={
				x:this.startPoint.x+this.snake.game.snake.turningRadius*Math.sin(this.startDirection),
				y:this.startPoint.y-this.snake.game.snake.turningRadius*Math.cos(this.startDirection),
			}
			this.endDirection=this.startDirection-this.length/this.snake.game.snake.turningRadius
			if(this.endDirection<0){this.endDirection+=2*Math.PI}
			this.endPoint={
				x:this.arcCenter.x-this.snake.game.snake.turningRadius*Math.sin(this.endDirection),
				y:this.arcCenter.y+this.snake.game.snake.turningRadius*Math.cos(this.endDirection),
			}
			break
		default://partType==0
			this.endDirection=this.startDirection
			this.endPoint={
				x:this.startPoint.x+this.length*Math.cos(this.startDirection),
				y:this.startPoint.y+this.length*Math.sin(this.startDirection),
			}
			this.arcCenter=null
			break
	}
	
}

Part.prototype.extend=function(extendLength){
	
	this.length+=extendLength
	
	switch(this.partType){
		case 1:
			this.endDirection=this.startDirection+this.length/this.snake.game.snake.turningRadius
			if(this.endDirection>2*Math.PI){this.endDirection-=2*Math.PI}
			this.endPoint={
				x:this.arcCenter.x+this.snake.game.snake.turningRadius*Math.sin(this.endDirection),
				y:this.arcCenter.y-this.snake.game.snake.turningRadius*Math.cos(this.endDirection),
			}
			break
		case -1:
			this.endDirection=this.startDirection-this.length/this.snake.game.snake.turningRadius
			if(this.endDirection<0){this.endDirection+=2*Math.PI}
			this.endPoint={
				x:this.arcCenter.x-this.snake.game.snake.turningRadius*Math.sin(this.endDirection),
				y:this.arcCenter.y+this.snake.game.snake.turningRadius*Math.cos(this.endDirection),
			}
			break
		default://partType==0
			this.endPoint={
				x:this.startPoint.x+this.length*Math.cos(this.startDirection),
				y:this.startPoint.y+this.length*Math.sin(this.startDirection),
			}
			break
	}
	
}

Part.prototype.shorten=function(shortenLength){
	
	this.length-=shortenLength
	
	switch(this.partType){
		case 1:
			this.startDirection=this.endDirection-this.length/this.snake.game.snake.turningRadius
			if(this.startDirection<0){this.startDirection+=2*Math.PI}
			this.startPoint={
				x:this.arcCenter.x+this.snake.game.snake.turningRadius*Math.sin(this.startDirection),
				y:this.arcCenter.y-this.snake.game.snake.turningRadius*Math.cos(this.startDirection),
			}
			break
		case -1:
			this.startDirection=this.endDirection+this.length/this.snake.game.snake.turningRadius
			if(this.startDirection>2*Math.PI){this.startDirection-=2*Math.PI}
			this.startPoint={
				x:this.arcCenter.x-this.snake.game.snake.turningRadius*Math.sin(this.startDirection),
				y:this.arcCenter.y+this.snake.game.snake.turningRadius*Math.cos(this.startDirection),
			}
			break
		default://partType==0
			this.startPoint={
				x:this.endPoint.x-this.length*Math.cos(this.startDirection),
				y:this.endPoint.y-this.length*Math.sin(this.startDirection),
			}
			break
	}
	if(this.startPoint.x<0){
		this.startPoint.x+=this.snake.game.groundSize
		this.endPoint.x+=this.snake.game.groundSize
	}else if(this.startPoint.x>=this.snake.game.groundSize){
		this.startPoint.x-=this.snake.game.groundSize
		this.endPoint.x-=this.snake.game.groundSize
	}
	if(this.startPoint.y<0){
		this.startPoint.y+=this.snake.game.groundSize
		this.endPoint.y+=this.snake.game.groundSize
	}else if(this.startPoint.y>=this.snake.game.groundSize){
		this.startPoint.y-=this.snake.game.groundSize
		this.endPoint.y-=this.snake.game.groundSize
	}
	
}

Part.prototype.draw=function(){
	
	this.snake.game.canvas.beginPath()
	for(var i=-1;i<2;i++){
		for(var j=-1;j<2;j++){
			switch(this.partType){
			case 1:
				this.snake.game.canvas.arc((this.arcCenter.x+i*this.snake.game.groundSize)*this.snake.game.zoomRate,(this.arcCenter.y+j*this.snake.game.groundSize)*this.snake.game.zoomRate,(this.snake.game.snake.turningRadius+this.snake.game.snake.width/2)*this.snake.game.zoomRate,this.startDirection-Math.PI/2,this.endDirection-Math.PI/2,false)
				this.snake.game.canvas.arc((this.arcCenter.x+i*this.snake.game.groundSize)*this.snake.game.zoomRate,(this.arcCenter.y+j*this.snake.game.groundSize)*this.snake.game.zoomRate,(this.snake.game.snake.turningRadius-this.snake.game.snake.width/2)*this.snake.game.zoomRate,this.endDirection-Math.PI/2,this.startDirection-Math.PI/2,true)
				break
			case -1:
				this.snake.game.canvas.arc((this.arcCenter.x+i*this.snake.game.groundSize)*this.snake.game.zoomRate,(this.arcCenter.y+j*this.snake.game.groundSize)*this.snake.game.zoomRate,(this.snake.game.snake.turningRadius+this.snake.game.snake.width/2)*this.snake.game.zoomRate,this.startDirection+Math.PI/2,this.endDirection+Math.PI/2,true)
				this.snake.game.canvas.arc((this.arcCenter.x+i*this.snake.game.groundSize)*this.snake.game.zoomRate,(this.arcCenter.y+j*this.snake.game.groundSize)*this.snake.game.zoomRate,(this.snake.game.snake.turningRadius-this.snake.game.snake.width/2)*this.snake.game.zoomRate,this.endDirection+Math.PI/2,this.startDirection+Math.PI/2,false)
				break
			default://partType==0
				this.snake.game.canvas.moveTo((this.startPoint.x-Math.sin(this.startDirection)*(this.snake.game.snake.width/2)+i*this.snake.game.groundSize)*this.snake.game.zoomRate,(this.startPoint.y+Math.cos(this.startDirection)*(this.snake.game.snake.width/2)+j*this.snake.game.groundSize)*this.snake.game.zoomRate)
				this.snake.game.canvas.lineTo((this.startPoint.x+Math.sin(this.startDirection)*(this.snake.game.snake.width/2)+i*this.snake.game.groundSize)*this.snake.game.zoomRate,(this.startPoint.y-Math.cos(this.startDirection)*(this.snake.game.snake.width/2)+j*this.snake.game.groundSize)*this.snake.game.zoomRate)
				this.snake.game.canvas.lineTo((this.endPoint.x+Math.sin(this.startDirection)*(this.snake.game.snake.width/2)+i*this.snake.game.groundSize)*this.snake.game.zoomRate,(this.endPoint.y-Math.cos(this.startDirection)*(this.snake.game.snake.width/2)+j*this.snake.game.groundSize)*this.snake.game.zoomRate)
				this.snake.game.canvas.lineTo((this.endPoint.x-Math.sin(this.startDirection)*(this.snake.game.snake.width/2)+i*this.snake.game.groundSize)*this.snake.game.zoomRate,(this.endPoint.y+Math.cos(this.startDirection)*(this.snake.game.snake.width/2)+j*this.snake.game.groundSize)*this.snake.game.zoomRate)
				break
			}
			if(!this.snake.game.dead){
				this.snake.game.dead=this.snake.game.canvas.isPointInPath((this.snake.game.snake.headPoint.x)*this.snake.game.zoomRate,(this.snake.game.snake.headPoint.y)*this.snake.game.zoomRate)	
			}
			this.snake.game.canvas.fillStyle=this.snake.game.color
			this.snake.game.canvas.fill()
			this.snake.game.canvas.closePath()
			this.snake.game.canvas.beginPath()
			this.snake.game.canvas.lineWidth=this.snake.game.zoomRate
			this.snake.game.canvas.strokeStyle=this.snake.game.color
			this.snake.game.canvas.moveTo((this.endPoint.x+Math.sin(this.startDirection)*(this.snake.game.snake.width/2-1)+i*this.snake.game.groundSize)*this.snake.game.zoomRate,(this.endPoint.y-Math.cos(this.startDirection)*(this.snake.game.snake.width/2-1)+j*this.snake.game.groundSize)*this.snake.game.zoomRate)
			this.snake.game.canvas.lineTo((this.endPoint.x-Math.sin(this.startDirection)*(this.snake.game.snake.width/2-1)+i*this.snake.game.groundSize)*this.snake.game.zoomRate,(this.endPoint.y+Math.cos(this.startDirection)*(this.snake.game.snake.width/2-1)+j*this.snake.game.groundSize)*this.snake.game.zoomRate)
			this.snake.game.canvas.stroke()
			this.snake.game.canvas.closePath()
			this.snake.game.canvas.beginPath()
			this.snake.game.canvas.moveTo((this.startPoint.x-Math.sin(this.startDirection)*(this.snake.game.snake.width/2-1)+i*this.snake.game.groundSize)*this.snake.game.zoomRate,(this.startPoint.y+Math.cos(this.startDirection)*(this.snake.game.snake.width/2-1)+j*this.snake.game.groundSize)*this.snake.game.zoomRate)
			this.snake.game.canvas.lineTo((this.startPoint.x+Math.sin(this.startDirection)*(this.snake.game.snake.width/2-1)+i*this.snake.game.groundSize)*this.snake.game.zoomRate,(this.startPoint.y-Math.cos(this.startDirection)*(this.snake.game.snake.width/2-1)+j*this.snake.game.groundSize)*this.snake.game.zoomRate)
			this.snake.game.canvas.stroke()
			this.snake.game.canvas.closePath()
			this.snake.game.canvas.beginPath()
		}
	}
	
}