var game

function loadGame() {
	game=new Game("snakeArea",384,"#F70",100,24,3,16,24,24)
	game.setSnake()
	game.setController()
	game.setUI()
	game.loop()
}

requestAnimationFrame(loadGame)