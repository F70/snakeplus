function Game(canvasId,groundSize,color) {
	
	this.canvas=document.getElementById(canvasId).getContext("2d")
	this.groundSize=groundSize
	this.color=color
	this.loopId=null
	this.input={
		keyLeft:0,
		keyRight:0,
	}
	this.dead=false
	
}

Game.prototype.setSnake=function(snakeLength,snakeWidth,snakeSpeed,snakeTurningRadius){
	this.snake=new Snake(snakeLength,snakeWidth,snakeSpeed,snakeTurningRadius)
}

Game.prototype.loop=function() {
	
	this.snake.move(this.input.keyRight-this.input.keyLeft)
	this.snake.draw()
	this.loopId=requestAnimationFrame(function(){game.loop()})
	
}

Game.prototype.pause=function() {
	
	cancelAnimationFrame(this.loopId)
	
}