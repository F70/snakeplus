Game.prototype.setUI=function(){
	
	var turnToGame=function(){
		this.ui.toRunFunction=function(){
			document.getElementById("score").style.cssText=""
			this.begin()
			document.getElementById(this.ui.currentBoardId).style.display="none"
			document.getElementById("pauseOverlay").style.visibility="hidden"	
		}.bind(this)
		document.getElementById("pauseOverlay").style.opacity="0"
		document.getElementById("transitionBox").style.backgroundColor=this.color
		this.ui.transition=true
	}.bind(this)
	
	var backToMenuFromGame=function(){
		document.getElementById("pauseOverlay").style.opacity="0"
		document.getElementById("pauseOverlay").style.visibility="hidden"	
		this.ui.toRunFunction=function(){		
			document.getElementById("gameBox").style.display="none"
			document.getElementById("menu").style.display="inline"
			this.ui.currentBoardId="menu"
			this.ui.drawScore("")
		}.bind(this)
		document.getElementById("transitionBox").style.backgroundColor=this.color
		this.ui.transition=true		
	}.bind(this)
	
	var continueGame=function(){
			document.getElementById("pauseOverlay").style.opacity="0"
			document.getElementById("pauseOverlay").style.visibility="hidden"	
		this.noInputDuring=0
		this.loop()
	}.bind(this)
	
	var jumpToBoardFunctionGenerator=function(boardId){
		return function(){
			
			if (boardId==this.ui.currentBoardId){
				return
			}
			
			this.ui.toRunFunction=function(){
				this.ui.drawScore("")
				document.getElementById("score").style.cssText=""
				if (document.getElementById(this.ui.currentBoardId)!=undefined){
					document.getElementById(this.ui.currentBoardId).style.display="none"
				}
				if (document.getElementById(boardId)!=undefined){
					document.getElementById(boardId).style.display="inline"
				}
				this.ui.currentBoardId=boardId
			}.bind(this)
			document.getElementById("transitionBox").style.backgroundColor=this.color
			this.ui.transition=true			
		}.bind(this)
	}.bind(this)
	
	var chooseWallFunctionGenerator=function(wallId){
		return function(){
			this.changeWall(wallId)
		}.bind(this)
	}.bind(this)

	var positionGenerator=function(x){
		return Math.max(12,Math.min(164,x))-12
	}
	
	var changeSpeedDown=function(event){
		if(event.button==0){
		document.getElementById("speedSliderButton").style.left=positionGenerator(event.offsetX)+"px"
		this.snakeSpeed=1+positionGenerator(event.offsetX)/38
		this.ui.speedSliderLeft=event.screenX-event.offsetX
		this.ui.speedSliderMouseStartPoint=event.screenX
		addEventListener("mousemove",changeSpeedMove,false)
		addEventListener("mouseup",changeSpeedUp,false)
		}
	}.bind(this)
	
	var changeSpeedMove=function(event){
		if (this.ui.speedSliderMouseStartPoint!=event.screenX){
			document.getElementById("speedSliderButton").style.transition="none"
			document.getElementById("speedSliderButton").style.left=positionGenerator(event.screenX-this.ui.speedSliderLeft)+"px"
			this.snakeSpeed=1+positionGenerator(event.screenX-this.ui.speedSliderLeft)/38
		}
	}.bind(this)
	
	var changeSpeedUp=function(event){
		document.getElementById("speedSliderButton").style.left=positionGenerator(event.screenX-this.ui.speedSliderLeft)+"px"
		document.getElementById("speedSliderButton").style.transition=""
		this.snakeSpeed=1+positionGenerator(event.screenX-this.ui.speedSliderLeft)/38		
		removeEventListener("mousemove",changeSpeedMove)
		removeEventListener("mouseup",changeSpeedUp)
		
	}.bind(this)
	
	document.getElementById("playButton").addEventListener("click",turnToGame,false)
	document.getElementById("settingButton").addEventListener("click",jumpToBoardFunctionGenerator("setting"),false)
	document.getElementById("creditButton").addEventListener("click",jumpToBoardFunctionGenerator("credit"),false)
	document.getElementById("backToMenuFromGameButton").addEventListener("click",backToMenuFromGame,false)
	document.getElementById("replayButton").addEventListener("click",turnToGame,false)
	document.getElementById("continueButton").addEventListener("click",continueGame,false)
	document.getElementById("backToMenuFromDiedButton").addEventListener("click",jumpToBoardFunctionGenerator("menu"),false)
	document.getElementById("tryAgainButton").addEventListener("click",turnToGame,false)
	document.getElementById("backToMenuFromSettingButton").addEventListener("click",jumpToBoardFunctionGenerator("menu"),false)
	document.getElementById("backToMenuFromCreditButton").addEventListener("click",jumpToBoardFunctionGenerator("menu"),false)
	document.getElementById("speedSliderArea").addEventListener("mousedown",changeSpeedDown,false)
	
	for (var i=0;i<5;i++){
		document.getElementById("wallSelector"+i).addEventListener("click",chooseWallFunctionGenerator(i),false)
	}
	
	document.getElementById("box").addEventListener("transitionend",function (event){
		if (!this.ui.started){
			this.ui.started=true
			this.ui.toRunFunction()
			document.getElementById("transitionBox").style.backgroundColor="rgba(0,0,0,0)"
		}
	}.bind(this),false)
	document.getElementById("transitionBox").addEventListener("transitionend",function (event){
		if (this.ui.transition){
			this.ui.transition=false
			this.ui.toRunFunction()
			document.getElementById("transitionBox").style.backgroundColor="rgba(0,0,0,0)"
		}
	}.bind(this),false)
	
	
	this.ui={
		currentBoardId:"menu",
		started:false,
		transition:false,
		toRunFunction:function(){}
	}
	
	this.ui.drawScore=function(score){
		var scoreBox=document.getElementById("score")
		score+=""
		scoreBox.innerHTML=""
		var width=16
		for (var i = 0; i < score.length; i++){
			var div=document.createElement("div")
			div.className="number number"+score[i]+""
			scoreBox.appendChild(div)
			if (score[i]=="1"){
				width+=32
			} else {
				width+=64
			}
		}
		scoreBox.style.width=width+"px"
		if (width>this.groundSize){
			scoreBox.style.zoom=this.groundSize/width+""
		} else {scoreBox.style.zoom="1"}
	}
	
	this.ui.goToScore=function(){
		this.ui.toRunFunction=function(){
			document.getElementById("score").style.opacity="1"
			document.getElementById("score").style.marginTop=(this.groundSize/2-72)+"px"
			document.getElementById("gameBox").style.display="none"
			document.getElementById("died").style.display="inline"
			this.ui.currentBoardId="died"
		}.bind(this)
		setTimeout(function(){
			document.getElementById("transitionBox").style.backgroundColor=this.color
			this.ui.transition=true
		}.bind(this),500)
		
	}.bind(this)
}
