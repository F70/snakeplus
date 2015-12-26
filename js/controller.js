Game.prototype.setController=function(){
	
	function keydown(event){
		if(game.dead==true){return}
		switch(event.keyCode){
			case 39://right
				game.input.keyRight=1
				this.noInputDuring=0
				break
			case 37://left
				game.input.keyLeft=1
				this.noInputDuring=0
				break
			case 80://pause
			case 27://pause
				if(document.getElementById("gameBox").style.display=="inline"){
				game.pause()
				game.noInputDuring=0	
				}
				break
			default:
				break
		}
		console.log(game.input)
		
	}
	
	function keyup(event){
		if(game.dead==true){return}
		switch(event.keyCode){
			case 39://right
				game.input.keyRight=0
				game.noInputDuring=0
				break
			case 37://left
				game.input.keyLeft=0
				game.noInputDuring=0
				break
			default:
				break
		}
		console.log(game.input)
		
	}
	
	document.addEventListener("keydown",keydown,false)
	document.addEventListener("keyup",keyup,false)
	
}