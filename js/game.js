// temporary code for debug
function Game(canvasId,groundSize,color) {
	
	this.canvas=document.getElementById(canvasId).getContext("2d")
	this.groundSize=groundSize
	this.color=color
	this.input=0//0=straight 1=clockwise -1=anticlockwise
	
}

Game.prototype.setSnake=function(snakeLength,snakeWidth,snakeSpeed,snakeTurningRadius){
	this.snake=new Snake(snakeLength,snakeWidth,snakeSpeed,snakeTurningRadius)
}