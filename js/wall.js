function Wall(verticesList) {
	this.verticesList=verticesList
}

Wall.prototype.draw=function() {
	game.canvas.moveTo(this.verticesList[0].x,this.verticesList[0].y)
	for (var i=0;i<this.verticesList.length;i++) {
		game.canvas.lineTo(this.verticesList[i].x,this.verticesList[i].y)
	}
	game.canvas.lineTo(this.verticesList[0].x,this.verticesList[0].y)
	if(!game.dead){
		game.dead=game.canvas.isPointInPath(game.snake.headPoint.x,game.snake.headPoint.y)	
	}

	game.canvas.fillStyle=game.wallTexture	
	game.canvas.fill()
	game.canvas.lineWidth=1
	game.canvas.strokeStyle=game.color
	game.canvas.stroke()
	game.canvas.closePath()
	game.canvas.beginPath()
}

var wallList=[
	[
		new Wall([{x:64,y:64},{x:64,y:88},{x:88,y:88},{x:88,y:64}]),
		new Wall([{x:320,y:64},{x:320,y:88},{x:296,y:88},{x:296,y:64}]),
		new Wall([{x:64,y:320},{x:64,y:296},{x:88,y:296},{x:88,y:320}]),
		new Wall([{x:320,y:320},{x:320,y:296},{x:296,y:296},{x:296,y:320}]),
	]
]

