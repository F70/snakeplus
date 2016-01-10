Game.prototype.setController=function(){
	
	var updateInput=function(){
		this.input.left=this.rawInput.keyLeft+this.rawInput.keyA
		this.input.right=this.rawInput.keyRight+this.rawInput.keyD
	}.bind(this)
	
	function keydown(event){
		if(this.dead==true){return}
		switch(event.keyCode){
			case 39://right
				this.rawInput.keyRight=1
				this.noInputDuring=0
				break
			case 37://left
				this.rawInput.keyLeft=1
				this.noInputDuring=0
				break
			case 68://d
				this.rawInput.keyD=1
				this.noInputDuring=0
				break
			case 65://a
				this.rawInput.keyA=1
				this.noInputDuring=0
				break
			case 80://pause
			case 27://pause
				if(document.getElementById("gameBox").style.display=="inline"){
				this.pause()
				this.noInputDuring=0	
				}
				break
			default:
				break
		}
		console.log(this.rawInput)
		updateInput()
	}
	
	function keyup(event){
		if(this.dead==true){return}
		switch(event.keyCode){
			case 39://right
				this.rawInput.keyRight=0
				this.noInputDuring=0
				break
			case 37://left
				this.rawInput.keyLeft=0
				this.noInputDuring=0
				break
			case 68://d
				this.rawInput.keyD=0
				this.noInputDuring=0
				break
			case 65://a
				this.rawInput.keyA=0
				this.noInputDuring=0
				break
			default:
				break
		}
		console.log(this.rawInput)
		updateInput()
	}
	
	document.addEventListener("keydown",keydown.bind(this),false)
	document.addEventListener("keyup",keyup.bind(this),false)
	
}