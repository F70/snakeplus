Game.prototype.setController=function() {
	
	function keydown(event) {
		
		switch (event.keyCode) {
			case 39://right
				game.input.keyRight=1
				break;
			case 37://left
				game.input.keyLeft=1
				break;
			default:
				break;
		}
		console.log(game.input)
		
	}
	
	function keyup(event) {
		
		switch (event.keyCode) {
			case 39://right
				game.input.keyRight=0
				break;
			case 37://left
				game.input.keyLeft=0
				break;
			default:
				break;
		}
		console.log(game.input)
		
	}
	
	document.addEventListener("keydown",keydown,false)
	document.addEventListener("keyup",keyup,false)
	
}