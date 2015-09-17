function Game(canvasId,groundSize,color,originalSnakeLength,snakeWidth,snakeSpeed,snakeTurningRadius,foodSize,growthPerFood) {
	
	this.canvas=document.getElementById(canvasId).getContext("2d")
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
	
	do {
		this.foodPoint={
		x:this.foodSize/2+Math.random()*(this.groundSize-this.foodSize),
		y:this.foodSize/2+Math.random()*(this.groundSize-this.foodSize),
	}
	} while (this.foodPoint.x>=(this.groundSize-this.snakeWidth-this.originalSnakeLength)/2&&this.foodPoint.x<=(this.groundSize+this.snakeWidth+this.originalSnakeLength)/2&&this.foodPoint.y>=(this.groundSize+this.snakeWidth)/2&&this.foodPoint.y<=(this.groundSize-this.snakeWidth)/2);
	document.getElementById("food").style.left=this.foodPoint.x-this.foodSize/2+"px"
	document.getElementById("food").style.top=this.foodPoint.y-this.foodSize/2+"px"
	this.growthPerFood=growthPerFood
	
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
	console.log(this.noInputDuring)
	this.snake.move(this.input.keyRight-this.input.keyLeft)
	this.snake.draw()
	if (Math.abs(this.snake.headPoint.x-this.foodPoint.x)<this.foodSize/2&&Math.abs(this.snake.headPoint.y-this.foodPoint.y)<this.foodSize/2) {
		this.score++
		this.resetFood()
		this.snake.ungrownLength+=this.growthPerFood
	}
	if (this.noInputDuring>this.groundSize*this.groundSize/this.snakeSpeed/this.snakeWidth) {
		return
	}
	this.loopId=requestAnimationFrame(function(){game.loop()})
	
}

Game.prototype.pause=function() {
	
	cancelAnimationFrame(this.loopId)
	
}

Game.prototype.reset=function() {
	
	this.score=0
	this.dead=false
	this.setSnake()
	this.resetFoodWhenRestart()
	this.loop()
	this.noInputDuring=0

}

Game.prototype.resetFood=function () {
	
	do {
		this.foodPoint={
		x:this.foodSize/2+Math.random()*(this.groundSize-this.foodSize),
		y:this.foodSize/2+Math.random()*(this.groundSize-this.foodSize),
	}
	} while (Math.abs(this.snake.headPoint.x-this.foodPoint.x)<this.foodSize/2&&Math.abs(this.snake.headPoint.y-this.foodPoint.y)<this.foodSize/2&&game.canvas.getImageData(this.foodPoint.x,this.foodPoint.y,1,1).data[3]!=0);
	
	document.getElementById("food").style.left=this.foodPoint.x-this.foodSize/2+"px"
	document.getElementById("food").style.top=this.foodPoint.y-this.foodSize/2+"px"
	
}

Game.prototype.resetFoodWhenRestart=function () {
	
	do {
		this.foodPoint={
		x:this.foodSize/2+Math.random()*(this.groundSize-this.foodSize),
		y:this.foodSize/2+Math.random()*(this.groundSize-this.foodSize),
	}
	} while (this.foodPoint.x>=(this.groundSize-this.snakeWidth-this.originalSnakeLength)/2&&this.foodPoint.x<=(this.groundSize+this.snakeWidth+this.originalSnakeLength)/2&&this.foodPoint.y>=(this.groundSize+this.snakeWidth)/2&&this.foodPoint.y<=(this.groundSize-this.snakeWidth)/2);
	
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
