Game.prototype.setUI=function() {
	
	var turnToGame=function () {
		game.ui.toRunFunction=function () {
			document.getElementById("score").style.cssText=""
			game.begin()
			document.getElementById(game.ui.currentBoardId).style.display="none"
		}
		document.getElementById("transitionBox").style.backgroundColor=game.color
		game.ui.transition=true
	}
	
	var backToMenuFromGame=function () {
		document.getElementById("pauseOverlay").style.opacity="0"
		document.getElementById("pauseOverlay").style.visibility="hidden"	
		game.ui.toRunFunction=function () {		
			document.getElementById("gameBox").style.display="none"
			document.getElementById("menu").style.display="inline"
			game.ui.currentBoardId="menu"
			game.ui.drawScore("")
		}
		document.getElementById("transitionBox").style.backgroundColor=game.color
		game.ui.transition=true		
	}
	
	var continueGame=function () {
			document.getElementById("pauseOverlay").style.opacity="0"
			document.getElementById("pauseOverlay").style.visibility="hidden"	
		game.noInputDuring=0
		game.loop()
	}
	
	var jumpToBoardFunctionGenerator=function(boardId) {
		return function(){
			
			if (boardId==game.ui.currentBoardId) {
				return
			}
			
			game.ui.toRunFunction=function() {
				game.ui.drawScore("")
				document.getElementById("score").style.cssText=""
				if (document.getElementById(game.ui.currentBoardId)!=undefined) {
					document.getElementById(game.ui.currentBoardId).style.display="none"
				}
				if (document.getElementById(boardId)!=undefined) {
					document.getElementById(boardId).style.display="inline"
				}
				game.ui.currentBoardId=boardId
			}
			document.getElementById("transitionBox").style.backgroundColor=game.color
			game.ui.transition=true			
		}
	}
	
	var chooseWallFunctionGenerator=function(wallId) {
		return function(){
			game.changeWall(wallId)
		}
	}

	var positionGenerator=function(x) {
		return Math.max(12,Math.min(164,x))-12
	}
	
	var changeSpeedDown=function(event) {
		if(event.button==0){
		document.getElementById("speedSliderButton").style.left=positionGenerator(event.offsetX)+"px"
		game.snakeSpeed=1+positionGenerator(event.offsetX)/38
		game.ui.speedSliderLeft=event.screenX-event.offsetX
		game.ui.speedSliderMouseStartPoint=event.screenX
		addEventListener("mousemove",changeSpeedMove,false)
		addEventListener("mouseup",changeSpeedUp,false)
		}
	}
	
	var changeSpeedMove=function(event) {
		if (game.ui.speedSliderMouseStartPoint!=event.screenX) {
			document.getElementById("speedSliderButton").style.transition="none"
			document.getElementById("speedSliderButton").style.left=positionGenerator(event.screenX-game.ui.speedSliderLeft)+"px"
			game.snakeSpeed=1+positionGenerator(event.screenX-game.ui.speedSliderLeft)/38
		}
	}
	
	var changeSpeedUp=function(event) {
		document.getElementById("speedSliderButton").style.left=positionGenerator(event.screenX-game.ui.speedSliderLeft)+"px"
		document.getElementById("speedSliderButton").style.transition=""
		game.snakeSpeed=1+positionGenerator(event.screenX-game.ui.speedSliderLeft)/38		
		removeEventListener("mousemove",changeSpeedMove)
		removeEventListener("mouseup",changeSpeedUp)
		
	}
	
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
	
	for (var i=0;i<5;i++) {
		document.getElementById("wallSelector"+i).addEventListener("click",chooseWallFunctionGenerator(i),false)
	}
	
	document.getElementById("box").addEventListener("transitionend",function (event) {
		if (!game.ui.started) {
			game.ui.started=true
			game.ui.toRunFunction()
			document.getElementById("transitionBox").style.backgroundColor="rgba(0,0,0,0)"
		}
	},false)
	document.getElementById("transitionBox").addEventListener("transitionend",function (event) {
		if (game.ui.transition) {
			game.ui.transition=false
			game.ui.toRunFunction()
			document.getElementById("transitionBox").style.backgroundColor="rgba(0,0,0,0)"
		}
	},false)
	
	
	this.ui={
		currentBoardId:"menu",
		started:false,
		transition:false,
		toRunFunction:function(){}
	}
	
	this.ui.drawScore=function(score) {
		var scoreBox=document.getElementById("score")
		score+=""
		scoreBox.innerHTML=""
		var width=16
		for (var i = 0; i < score.length; i++) {
			var div=document.createElement("div")
			div.className="number number"+score[i]+""
			scoreBox.appendChild(div)
			if (score[i]=="1") {
				width+=32
			} else {
				width+=64
			}
		}
		scoreBox.style.width=width+"px"
		if (width>game.groundSize) {
			scoreBox.style.zoom=game.groundSize/width+""
		} else {scoreBox.style.zoom="1"}
	}
	
	this.ui.goToScore=function() {
		game.ui.toRunFunction=function () {
			document.getElementById("score").style.opacity="1"
			document.getElementById("score").style.marginTop=(game.groundSize/2-72)+"px"
			document.getElementById("gameBox").style.display="none"
			document.getElementById("died").style.display="inline"
			game.ui.currentBoardId="died"
		}
		setTimeout(function(){
			document.getElementById("transitionBox").style.backgroundColor=game.color
			game.ui.transition=true
		},500)
		
	}
}
