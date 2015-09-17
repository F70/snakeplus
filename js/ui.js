Game.prototype.setUI=function() {
	
	document.getElementById("playButton").addEventListener("click",function () {
		game.ui.toRunFunction=function () {
			game.begin()
			document.getElementById(game.ui.currentBoardId).style.display="none"
		}
		document.getElementById("box").style.backgroundColor=game.color
	},false)
	
	document.getElementById("box").addEventListener("transitionend",function (event) {
		if (event.currentTarget.style.backgroundColor==getComputedStyle(document.getElementById("box")).borderColor) {
			game.ui.toRunFunction()
			game.ui.toJumpBoardId=""
			document.getElementById("box").style.backgroundColor="rgba(0,0,0,0)"
		}
	},false)
	
	this.ui={
		currentBoardId:"menu",
		jumpToBoard:function(boardId) {
			if (boardId==this.currentBoardId) {
				return
			}
			
			this.toRunFunction=function() {
				if (document.getElementById(this.currentBoardId)!=undefined) {
					document.getElementById(this.currentBoardId).style.display="none"
				}
				if (document.getElementById(boardId)!=undefined) {
					document.getElementById(boardId).style.display="inline"
				}
				this.currentBoardId=boardId
			}
			document.getElementById("box").style.backgroundColor=game.color
		},
		toRunFunction:undefined,
	}
	
}
