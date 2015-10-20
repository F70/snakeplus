function Game(canvasId,groundSize,color,originalSnakeLength,snakeWidth,snakeSpeed,snakeTurningRadius,foodSize,growthPerFood,wallNumber,wallTexture) {
	
	this.canvas=document.getElementById(canvasId).getContext("2d")
	this.canvas.imageSmoothingEnabled=false
	this.groundSize=groundSize
	this.color=color
	this.loopId=null
	this.input={
		keyLeft:0,
		keyRight:0,
	}
	this.dead=false
	
	this.originalSnakeLength=originalSnakeLength
	this.snakeWidth=snakeWidth
	this.snakeSpeed=snakeSpeed
	this.snakeTurningRadius=snakeTurningRadius
	
	this.foodSize=foodSize
	
	this.growthPerFood=growthPerFood
	
	this.wall=wallList[wallNumber]
	var textureImage=new Image()
	textureImage.src=wallTexture
	this.wallTexture=this.canvas.createPattern(textureImage,"repeat")
	
	this.score=0
	this.noInputDuring=0

}

Game.prototype.setSnake=function() {
	this.snake=new Snake(this.originalSnakeLength,this.snakeWidth,this.snakeSpeed,this.snakeTurningRadius)
}

Game.prototype.loop=function() {
	
	if (this.dead==true) {
		return
	}
	this.noInputDuring++
	this.snake.move(this.input.keyRight-this.input.keyLeft)
	this.canvas.clearRect(0,0,game.groundSize,game.groundSize)
	for (var i=0;i<this.wall.length;i++) {
		this.wall[i].draw()
	}
	this.snake.draw()
	if(this.foodPoint==undefined){
		this.resetFood()
	}
	if (Math.abs(this.snake.headPoint.x-this.foodPoint.x)<this.foodSize/2&&Math.abs(this.snake.headPoint.y-this.foodPoint.y)<this.foodSize/2) {
		this.score++
		this.resetFood()
		this.snake.ungrownLength+=this.growthPerFood
		this.ui.drawScore(this.score)
	}
	if (this.noInputDuring>this.groundSize*this.groundSize/this.snakeSpeed/this.snakeWidth) {
			document.getElementById("pauseOverlay").style.visibility="visible"
			document.getElementById("pauseOverlay").style.opacity="1"
		return
	}
	this.loopId=requestAnimationFrame(function(){game.loop()})
	
}

Game.prototype.pause=function() {
	
	cancelAnimationFrame(this.loopId)
			document.getElementById("pauseOverlay").style.visibility="visible"
			document.getElementById("pauseOverlay").style.opacity="1"
	
}

Game.prototype.reset=function() {
	
	this.score=0
	this.dead=false
	this.setSnake()
	this.foodPoint=undefined
	this.loop()
	this.noInputDuring=0
	this.ui.drawScore(this.score)

}

Game.prototype.resetFood=function () {
	
	do {
		this.foodPoint={
		x:this.foodSize/2+Math.random()*(this.groundSize-this.foodSize),
		y:this.foodSize/2+Math.random()*(this.groundSize-this.foodSize),
	}
	} while (Math.abs(this.snake.headPoint.x-this.foodPoint.x)<this.foodSize/2&&Math.abs(this.snake.headPoint.y-this.foodPoint.y)<this.foodSize/2&&game.canvas.getImageData(Math.round(this.foodPoint.x),Math.round(this.foodPoint.y),1,1).data[3]!=0);
	
	document.getElementById("food").style.left=this.foodPoint.x-this.foodSize/2+"px"
	document.getElementById("food").style.top=this.foodPoint.y-this.foodSize/2+"px"
	
}

Game.prototype.begin=function () {
	document.getElementById("gameBox").style.display="inline"
	this.reset()
}

Game.prototype.end=function () {
	this.pause()
	document.getElementById("gameBox").style.display="none"
}
