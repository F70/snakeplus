var keyboard={left:false,right:false}

Game.prototype.setController=function() {
	
	function keydown(event) {
		
		switch (event.keyCode) {
			case 39://right
				if (keyboard.right==false) {
					game.input+=1
					console.log(game.input)
					keyboard.right=true
				}
				break;
			case 37://left
				if (keyboard.left==false) {
					game.input-=1
					console.log(game.input)
					keyboard.left=true
				}
				break;
			default:
				break;
		}
		
	}
	
	function keyup(event) {
		
		switch (event.keyCode) {
			case 39://right
				game.input-=1
				console.log(game.input)
				keyboard.right=false
				break;
			case 37://left
				game.input+=1
				console.log(game.input)
				keyboard.left=false
				break;
			default:
				break;
		}
		
	}
	
	document.addEventListener("keydown",keydown,false)
	document.addEventListener("keyup",keyup,false)
	
}