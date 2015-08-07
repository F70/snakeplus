function loadGame() {
	game=new Game("snakeArea",384,"#F70")
	game.setSnake(100,24,10,16)
	game.setController()
}

requestAnimationFrame(loadGame)