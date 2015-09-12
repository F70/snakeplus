Game.prototype.setUI=function() {
	
	document.getElementById("box").addEventListener("transitionend",function (event) {
		if (event.currentTarget.style.backgroundColor==getComputedStyle(document.getElementById("box")).borderColor) {
			if (document.getElementById(game.ui.currentBoardId)!=undefined) {
				document.getElementById(game.ui.currentBoardId).style.display="none"
			}
			if (document.getElementById(game.ui.toJumpBoardId)!=undefined) {
				document.getElementById(game.ui.toJumpBoardId).style.display="inline"
			}
			game.ui.currentBoardId=game.ui.toJumpBoardId
			game.ui.toJumpBoardId=""
			document.getElementById("box").style.backgroundColor="rgba(0,0,0,0)"
		}
	},false)
	
	this.ui={
		currentBoardId:"",
		transitionAnimation:function(jumpFunction,afterFunction) {
			
		},
		jumpToBoard:function(boardId) {
			if (boardId==this.currentBoardId) {
				return
			}
			this.toJumpBoardId=boardId
			document.getElementById("box").style.backgroundColor=game.color
		},
		toJumpBoardId:"",
	}
	
}
