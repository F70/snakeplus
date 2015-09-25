Game.prototype.setUI=function() {
	
	var turnToGame=function () {
		game.ui.toRunFunction=function () {
			game.begin()
			document.getElementById(game.ui.currentBoardId).style.display="none"
		}
		document.getElementById("box").style.backgroundColor=game.color
	}
	
	var backToMenuFromGame=function () {
		document.getElementById("pauseOverlay").style.opacity="0"
		document.getElementById("pauseOverlay").style.visibility="hidden"	
		game.ui.toRunFunction=function () {		
			document.getElementById("gameBox").style.display="none"
			document.getElementById("menu").style.display="inline"
			game.ui.currentBoardId="menu"
		}
		document.getElementById("box").style.backgroundColor=game.color
	}
	
	var replay=function () {
		document.getElementById("pauseOverlay").style.opacity="0"
		document.getElementById("pauseOverlay").style.visibility="hidden"
			game.ui.toRunFunction=function () {
			game.reset()
		}
		document.getElementById("box").style.backgroundColor=game.color
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
				if (document.getElementById(game.ui.currentBoardId)!=undefined) {
					document.getElementById(game.ui.currentBoardId).style.display="none"
				}
				if (document.getElementById(boardId)!=undefined) {
					document.getElementById(boardId).style.display="inline"
				}
				game.ui.currentBoardId=boardId
			}
			document.getElementById("box").style.backgroundColor=game.color
		}
	}
	
	document.getElementById("playButton").addEventListener("click",turnToGame,false)
	document.getElementById("settingButton").addEventListener("click",jumpToBoardFunctionGenerator("setting"),false)
	document.getElementById("creditButton").addEventListener("click",jumpToBoardFunctionGenerator("credit"),false)
	document.getElementById("backToMenuFromGameButton").addEventListener("click",backToMenuFromGame,false)
	document.getElementById("replayButton").addEventListener("click",replay,false)
	document.getElementById("continueButton").addEventListener("click",continueGame,false)
	document.getElementById("backToMenuFromSettingButton").addEventListener("click",jumpToBoardFunctionGenerator("menu"),false)
	document.getElementById("backToMenuFromCreditButton").addEventListener("click",jumpToBoardFunctionGenerator("menu"),false)
	
	
	document.getElementById("box").addEventListener("transitionend",function (event) {
		if (event.currentTarget.style.backgroundColor==getComputedStyle(document.getElementById("box")).borderColor) {
			game.ui.toRunFunction()
			document.getElementById("box").style.backgroundColor="rgba(0,0,0,0)"
		}
	},false)
	
	this.ui={
		currentBoardId:"menu",
		toRunFunction:undefined,
	}
	
}
