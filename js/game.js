// temporary code for debug
function Game(canvasId,groundSize,color) {
	
	this.canvas=document.getElementById(canvasId).getContext("2d")
	this.groundSize=groundSize
	this.color=color
	this.loopId=null
	this.input={
		left:0,
		right:0,
	}
	
}

Game.prototype.setSnake=function(snakeLength,snakeWidth,snakeSpeed,snakeTurningRadius){
	this.snake=new Snake(snakeLength,snakeWidth,snakeSpeed,snakeTurningRadius)
}

Game.prototype.loop=function() {
	
	this.snake.move(this.input.right-this.input.left)
	this.snake.draw()
	this.loopId=requestAnimationFrame(game.loop2)
	
}

Game.prototype.loop2=function() {
	
	game.loop()
	
}

Game.prototype.pause=function() {
	
	cancelAnimationFrame(this.loopId)
	
}