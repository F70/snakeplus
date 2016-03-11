function Game(canvasId,zoomRate,groundSize,color,originalSnakeLength,snakeWidth,snakeSpeed,snakeTurningRadius,foodSize,growthPerFood,wallNumber,wallTexture){
	
	this.canvasElement=document.getElementById(canvasId)
	this.canvas=this.canvasElement.getContext("2d")
	this.canvas.imageSmoothingEnabled=false
	this.groundSize=groundSize
	this.zoomRate=zoomRate
	this.canvasElement.width=this.groundSize*this.zoomRate
	this.canvasElement.height=this.groundSize*this.zoomRate
	this.color=color
	this.loopId=null
	this.rawInput={
		keyLeft:0,
		keyRight:0,
		keyA:0,
		keyD:0,
		touchLeft:[],
		touchRight:[]
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
	
	document.getElementById("animation").style.animationDuration=1000*this.groundSize/(this.snakeSpeed*50)+"ms"
	
	this.foodSize=foodSize
	
	this.growthPerFood=growthPerFood
	
	this.changeWall(wallNumber)
	var textureImage=new Image()
	textureImage.src=wallTexture
	var textureElement=document.createElement("canvas")
	textureElement.height=textureImage.height*this.zoomRate
	textureElement.width=textureImage.width*this.zoomRate
	var textureCanvas=textureElement.getContext("2d")
	textureCanvas.drawImage(textureImage,0,0,textureImage.width,textureImage.height,0,0,textureElement.width,textureElement.height)
	this.wallTexture=this.canvas.createPattern(textureElement,"repeat")
	
	this.score=0
	this.noInputDuring=0
	
	this.timeStamp=Date.now()
	
	this.first=true
	if(systemVar.isTouch){document.getElementById("help").style.display="none"}
}

Game.prototype.setSnake=function(){
	this.snake=new Snake(this.originalSnakeLength,this.snakeWidth,this.snakeSpeed,this.snakeTurningRadius,this)
}

Game.prototype.loop=function(){
	
	var newTime=Date.now()
	if(systemVar.isTouch&&document.getElementById("touchController").style.opacity=="0"){document.getElementById("touchController").style.opacity="1"}
	if(document.getElementById("touchLeft").classList.contains("touching")&&this.rawInput.touchLeft.length==0){document.getElementById("touchLeft").classList.remove("touching")}
	if(document.getElementById("touchRight").classList.contains("touching")&&this.rawInput.touchRight.length==0){document.getElementById("touchRight").classList.remove("touching")}
	if(this.dead==true){
		this.input.left=0
		this.input.right=0
		this.rawInput={
			keyLeft:0,
			keyRight:0,
			keyA:0,
			keyD:0,
			touchLeft:[],
			touchRight:[]
		}
		this.ui.goToScore()
		return
	}
	this.noInputDuring++
	if(this.input.right>this.input.left){
		this.snake.move(1,newTime-this.timeStamp)
	}else if(this.input.right<this.input.left){
		this.snake.move(-1,newTime-this.timeStamp)
	}else{
		this.snake.move(0,newTime-this.timeStamp)
	}
	this.canvas.clearRect(0,0,this.groundSize*this.zoomRate,this.groundSize*this.zoomRate)
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
		if(systemVar.isTouch){document.getElementById("touchController").style.opacity="0"}
		return
	}
	this.loopId=requestAnimationFrame(this.loop.bind(this))
	this.timeStamp=newTime
	
}

Game.prototype.pause=function(){
	this.timeStamp=Date.now()
	cancelAnimationFrame(this.loopId)
	document.getElementById("pauseOverlay").style.visibility="visible"
	document.getElementById("pauseOverlay").style.opacity="1"
	if(systemVar.isTouch){document.getElementById("touchController").style.opacity="0"}
}

Game.prototype.reset=function(){
	if(this.first){
		this.first=false
		setTimeout(function(){document.getElementById("help").style.opacity=0},2000)
	}
	this.timeStamp=Date.now()
	this.score=0
	this.dead=false
	this.setSnake()
	this.foodPoint=undefined
	if(systemVar.isTouch){document.getElementById("touchController").style.opacity="1"}
	this.loop()
	this.noInputDuring=0
	this.ui.drawScore(this.score)
}

Game.prototype.resetFood=function(){
	
	function checkValid(){
		var answer=Math.abs(this.snake.headPoint.x-this.foodPoint.x)<this.foodSize/2||Math.abs(this.snake.headPoint.y-this.foodPoint.y)<this.foodSize/2
		answer=answer||this.canvas.getImageData(Math.round((this.foodPoint.x+this.foodSize/2)*this.zoomRate),Math.round((this.foodPoint.y+this.foodSize/2)*this.zoomRate),1,1).data[3]!=0
		answer=answer||this.canvas.getImageData(Math.round((this.foodPoint.x-this.foodSize/2)*this.zoomRate),Math.round((this.foodPoint.y+this.foodSize/2)*this.zoomRate),1,1).data[3]!=0
		answer=answer||this.canvas.getImageData(Math.round((this.foodPoint.x+this.foodSize/2)*this.zoomRate),Math.round((this.foodPoint.y-this.foodSize/2)*this.zoomRate),1,1).data[3]!=0
		answer=answer||this.canvas.getImageData(Math.round((this.foodPoint.x-this.foodSize/2)*this.zoomRate),Math.round((this.foodPoint.y-this.foodSize/2)*this.zoomRate),1,1).data[3]!=0
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
