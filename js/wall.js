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
	],
	[
		new Wall([{x:0,y:0},{x:84,y:0},{x:0,y:84}]),
		new Wall([{x:0,y:384},{x:84,y:384},{x:0,y:300}]),
		new Wall([{x:384,y:0},{x:300,y:0},{x:384,y:84}]),
		new Wall([{x:384,y:384},{x:300,y:384},{x:384,y:300}]),
	],
	[
		new Wall([{x:0,y:180},{x:160,y:180},{x:160,y:204},{x:0,y:204}]),
		new Wall([{x:384,y:180},{x:224,y:180},{x:224,y:204},{x:384,y:204}]),
	],
	[
		new Wall([{x:108,y:0},{x:108,y:24},{x:276,y:24},{x:276,y:0}]),
		new Wall([{x:108,y:384},{x:108,y:360},{x:276,y:360},{x:276,y:384}]),
		new Wall([{x:0,y:108},{x:24,y:108},{x:24,y:276},{x:0,y:276}]),
		new Wall([{x:384,y:108},{x:360,y:108},{x:360,y:276},{x:384,y:276}]),
	],
	[
		new Wall([{x:0,y:84},{x:160,y:84},{x:160,y:108},{x:0,y:108}]),
		new Wall([{x:384,y:276},{x:224,y:276},{x:224,y:300},{x:384,y:300}]),
		new Wall([{x:276,y:0},{x:276,y:160},{x:300,y:160},{x:300,y:0}]),
		new Wall([{x:84,y:384},{x:84,y:224},{x:108,y:224},{x:108,y:384}]),
	]
]

