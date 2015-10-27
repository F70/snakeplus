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
		new Wall([{x:84,y:84},{x:84,y:108},{x:108,y:108},{x:108,y:84}]),
		new Wall([{x:300,y:84},{x:300,y:108},{x:276,y:108},{x:276,y:84}]),
		new Wall([{x:84,y:300},{x:84,y:276},{x:108,y:276},{x:108,y:300}]),
		new Wall([{x:300,y:300},{x:300,y:276},{x:276,y:276},{x:276,y:300}]),
	]
]

