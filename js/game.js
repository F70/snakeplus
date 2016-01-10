function Game(canvasId,zoomRate,groundSize,color,originalSnakeLength,snakeWidth,snakeSpeed,snakeTurningRadius,foodSize,growthPerFood,wallNumber,wallTexture){
	
	this.canvas=document.getElementById(canvasId).getContext("2d")
	this.canvas.imageSmoothingEnabled=false
	this.groundSize=groundSize
	this.zoomRate=zoomRate
	this.color=color
	this.loopId=null
	this.rawInput={
		keyLeft:0,
		keyRight:0,
	}
	this.input={
		left:0,
		right:0
	}
	this.dead=false
	
	this.originalSnakeLength=originalSnakeLength
	this.snakeWidth=snakeWidth
	this.snakeSpeed=snakeSpeed
	this.snakeTurningRadius=snakeTurningRadius
	
	this.foodSize=foodSize
	
	this.growthPerFood=growthPerFood
	
	this.changeWall(wallNumber)
	var textureImage=new Image()
	textureImage.src=wallTexture
	this.wallTexture=this.canvas.createPattern(textureImage,"repeat")
	
	this.score=0
	this.noInputDuring=0

}

Game.prototype.setSnake=function(){
	this.snake=new Snake(this.originalSnakeLength,this.snakeWidth,this.snakeSpeed,this.snakeTurningRadius,this)
}

Game.prototype.loop=function(){
	
	if(this.dead==true){
		this.input.left=0
		this.input.right=0
		this.ui.goToScore()
		return
	}
	this.noInputDuring++
	if(this.input.right>this.input.left){
		this.snake.move(1)
	}else if(this.input.right<this.input.left){
		this.snake.move(-1)
	}else{
		this.snake.move(0)
	}
	this.canvas.clearRect(0,0,this.groundSize,this.groundSize)
	for(var i=0;i<this.wall.length;i++){
		this.wall[i].draw(this)
	}
	this.snake.draw()
	if(this.foodPoint==undefined){
		this.resetFood()
	}
	if(Math.abs(this.snake.headPoint.x-this.foodPoint.x)<this.foodSize/2&&Math.abs(this.snake.headPoint.y-this.foodPoint.y)<this.foodSize/2){
		this.score++
		this.resetFood()
		this.snake.ungrownLength+=this.growthPerFood
		this.ui.drawScore(this.score)
	}
	if(this.noInputDuring>this.groundSize*this.groundSize/this.snakeSpeed/this.snakeWidth){
		document.getElementById("pauseOverlay").style.visibility="visible"
		document.getElementById("pauseOverlay").style.opacity="1"
		return
	}
	this.loopId=requestAnimationFrame(this.loop.bind(this))
	
}

Game.prototype.pause=function(){
	cancelAnimationFrame(this.loopId)
	document.getElementById("pauseOverlay").style.visibility="visible"
	document.getElementById("pauseOverlay").style.opacity="1"
}

Game.prototype.reset=function(){
	this.score=0
	this.dead=false
	this.setSnake()
	this.foodPoint=undefined
	this.loop()
	this.noInputDuring=0
	this.ui.drawScore(this.score)
}

Game.prototype.resetFood=function(){
	
	function checkValid(){
		var answer=Math.abs(this.snake.headPoint.x-this.foodPoint.x)<this.foodSize/2||Math.abs(this.snake.headPoint.y-this.foodPoint.y)<this.foodSize/2
		answer=answer||this.canvas.getImageData(Math.round(this.foodPoint.x+this.foodSize/2),Math.round(this.foodPoint.y+this.foodSize/2),1,1).data[3]!=0
		answer=answer||this.canvas.getImageData(Math.round(this.foodPoint.x-this.foodSize/2),Math.round(this.foodPoint.y+this.foodSize/2),1,1).data[3]!=0
		answer=answer||this.canvas.getImageData(Math.round(this.foodPoint.x+this.foodSize/2),Math.round(this.foodPoint.y-this.foodSize/2),1,1).data[3]!=0
		answer=answer||this.canvas.getImageData(Math.round(this.foodPoint.x-this.foodSize/2),Math.round(this.foodPoint.y-this.foodSize/2),1,1).data[3]!=0
		return answer
	}
	
	do{
		this.foodPoint={
		x:this.foodSize/2+Math.random()*(this.groundSize-this.foodSize),
		y:this.foodSize/2+Math.random()*(this.groundSize-this.foodSize),
		}
	}while((checkValid.bind(this))())
	
	document.getElementById("food").style.left=this.foodPoint.x-this.foodSize/2+"px"
	document.getElementById("food").style.top=this.foodPoint.y-this.foodSize/2+"px"
	
}

Game.prototype.begin=function(){
	document.getElementById("gameBox").style.display="inline"
	this.reset()
}

Game.prototype.end=function(){
	this.pause()
	document.getElementById("gameBox").style.display="none"
}

Game.prototype.changeWall=function(wallNumber){
	this.wall=wallList[wallNumber]
	for(var i=0;i<wallList.length;i++){
		document.getElementById("wallSelector"+i).style.borderColor="rgba(0,0,0,0)"
	}
	document.getElementById("wallSelector"+wallNumber).style.borderColor="#f70"
}
