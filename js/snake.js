//snake
function Snake(length,width,speed,turningRadius,currentGame){
	
	this.game=currentGame
	this.length=length
	this.width=width
	this.speed=speed
	this.turningRadius=turningRadius
	this.parts=[new Part(this.length,{x:this.game.groundSize/2,y:this.game.groundSize/2+this.width/2+this.length/2},-Math.PI/2,0,this)]
	this.headPoint={x:this.game.groundSize/2,y:this.game.groundSize/2-this.width/2-this.length/2}
	this.ungrownLength=0
	
}

Snake.prototype.extend=function(length,extendType){
	
	if(extendType!=this.parts[this.parts.length-1].partType||length+this.parts[this.parts.length-1].length>this.game.groundSize-this.width){
		var newStartPoint={x:this.parts[this.parts.length-1].endPoint.x,y:this.parts[this.parts.length-1].endPoint.y}
		if(newStartPoint.x<0){
			newStartPoint.x+=this.game.groundSize
		}else if(newStartPoint.x>=this.game.groundSize){
			newStartPoint.x-=this.game.groundSize
		}
		if(newStartPoint.y<0){
			newStartPoint.y+=this.game.groundSize
		}else if(newStartPoint.y>=this.game.groundSize){
			newStartPoint.y-=this.game.groundSize
		}
		this.parts.push(new Part(length,newStartPoint,this.parts[this.parts.length-1].endDirection,extendType,this))
	}else{
		this.parts[this.parts.length-1].extend(length)
	}
	this.headPoint={
		x:this.parts[this.parts.length-1].endPoint.x+this.width*Math.cos(this.parts[this.parts.length-1].endDirection),
		y:this.parts[this.parts.length-1].endPoint.y+this.width*Math.sin(this.parts[this.parts.length-1].endDirection),
	}
	if(this.headPoint.x<0){
		this.headPoint.x+=this.game.groundSize
	}else if(this.headPoint.x>=this.game.groundSize){
		this.headPoint.x-=this.game.groundSize
	}
	if(this.headPoint.y<0){
		this.headPoint.y+=this.game.groundSize
	}else if(this.headPoint.y>=this.game.groundSize){
		this.headPoint.y-=this.game.groundSize
	}
	
}

Snake.prototype.shorten=function(length){
	while(this.parts[0].length<=length){
		length-=this.parts[0].length
		this.parts.shift()
	}
	this.parts[0].shorten(length)
}

Snake.prototype.move=function(moveType,duration){
	var distance=this.speed*duration*0.05
	this.extend(distance,moveType)
	if(distance<=this.ungrownLength){
		this.ungrownLength-=distance
	}else{
		this.shorten(distance-this.ungrownLength)
		this.ungrownLength=0
	}
}

Snake.prototype.draw=function(){
	
	for(var t=0;t<this.parts.length;t++){
		this.parts[t].draw()
	}

	var headDirection=this.parts[this.parts.length-1].endDirection
	for(var i=-1;i<2;i++){
		for(var j=-1;j<2;j++){
			this.game.canvas.moveTo((this.headPoint.x+i*this.game.groundSize)*this.game.zoomRate,(this.headPoint.y+j*this.game.groundSize)*this.game.zoomRate)
			this.game.canvas.lineTo((this.headPoint.x-this.width*Math.cos(headDirection)-(this.width/2)*Math.sin(headDirection)+i*this.game.groundSize)*this.game.zoomRate,(this.headPoint.y-this.width*Math.sin(headDirection)+(this.width/2)*Math.cos(headDirection)+j*this.game.groundSize)*this.game.zoomRate)
			this.game.canvas.lineTo((this.headPoint.x-this.width*Math.cos(headDirection)+(this.width/2)*Math.sin(headDirection)+i*this.game.groundSize)*this.game.zoomRate,(this.headPoint.y-this.width*Math.sin(headDirection)-(this.width/2)*Math.cos(headDirection)+j*this.game.groundSize)*this.game.zoomRate)
			this.game.canvas.fillStyle=this.game.color
			this.game.canvas.fill()
			this.game.canvas.closePath()
			this.game.canvas.beginPath()
			this.game.canvas.lineWidth=this.game.zoomRate
			this.game.canvas.strokeStyle=this.game.color
			this.game.canvas.moveTo((this.headPoint.x-this.width*Math.cos(headDirection)-(this.width/2)*Math.sin(headDirection)+i*this.game.groundSize)*this.game.zoomRate,(this.headPoint.y-this.width*Math.sin(headDirection)+(this.width/2)*Math.cos(headDirection)+j*this.game.groundSize)*this.game.zoomRate)
			this.game.canvas.lineTo((this.headPoint.x-this.width*Math.cos(headDirection)+(this.width/2)*Math.sin(headDirection)+i*this.game.groundSize)*this.game.zoomRate,(this.headPoint.y-this.width*Math.sin(headDirection)-(this.width/2)*Math.cos(headDirection)+j*this.game.groundSize)*this.game.zoomRate)
			this.game.canvas.stroke()
			this.game.canvas.closePath()
			this.game.canvas.beginPath()
		}
	}
	
}