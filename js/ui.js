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
		this.timeStamp=Date.now()
		this.noInputDuring=0
		this.loop()
	}.bind(this)
	
	var jumpToBoardFunctionGenerator=function(boardId){
		return function(){
			if(boardId==this.ui.currentBoardId){return}
			this.ui.toRunFunction=function(){
				this.ui.drawScore("")
				document.getElementById("score").style.cssText=""
				if(document.getElementById(this.ui.currentBoardId)!=undefined){
					document.getElementById(this.ui.currentBoardId).style.display="none"
				}
				if(document.getElementById(boardId)!=undefined){
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

	var linkGenerator=function(url){
		return function(){
			window.open(url)
		}.bind(this)
	}.bind(this)

	var positionGenerator=function(x){return Math.max(12,Math.min(164,x))-12}
	
	if(systemVar.isTouch){
		var touchVersionGenerator=function(listener){
			return function(event){
				event.preventDefault()
				listener()
			}
		}
	}
	
	var changeSpeedMouseDown=function(event){
		if(event.button==0){
			this.ui.speedSliderLeft=document.getElementById("speedSliderArea").getBoundingClientRect().left
			document.getElementById("speedSliderButton").style.left=positionGenerator(event.offsetX)+"px"
			this.snakeSpeed=1+positionGenerator(event.clientX-this.ui.speedSliderLeft)/38
			document.getElementById("animation").style.animationDuration=1000*this.groundSize/(this.snakeSpeed*50)+"ms"
			this.ui.speedSliderMouseStartPoint=event.clientX
			addEventListener("mousemove",changeSpeedMouseMove,false)
			addEventListener("mouseup",changeSpeedMouseUp,false)
		}
	}.bind(this)
	
	var changeSpeedMouseMove=function(event){
		if(this.ui.speedSliderMouseStartPoint!=event.clientX){
			document.getElementById("speedSliderButton").style.transition="none"
			document.getElementById("speedSliderButton").style.left=positionGenerator(event.clientX-this.ui.speedSliderLeft)+"px"
			this.snakeSpeed=1+positionGenerator(event.clientX-this.ui.speedSliderLeft)/38
			document.getElementById("animation").style.animationDuration=1000*this.groundSize/(this.snakeSpeed*50)+"ms"
		}
	}.bind(this)
	
	var changeSpeedMouseUp=function(event){
		document.getElementById("speedSliderButton").style.left=positionGenerator(event.clientX-this.ui.speedSliderLeft)+"px"
		document.getElementById("speedSliderButton").style.transition=""
		this.snakeSpeed=1+positionGenerator(event.clientX-this.ui.speedSliderLeft)/38
		document.getElementById("animation").style.animationDuration=1000*this.groundSize/(this.snakeSpeed*50)+"ms"
		removeEventListener("mousemove",changeSpeedMouseMove)
		removeEventListener("mouseup",changeSpeedMouseUp)
	}.bind(this)
	
	if(systemVar.isTouch){
		var changeSpeedTouchDown=function(event){
			event.preventDefault()
			var touch=event.changedTouches[0]
			this.ui.speedSliderLeft=document.getElementById("speedSliderArea").getBoundingClientRect().left
			document.getElementById("speedSliderButton").style.left=positionGenerator(touch.clientX-this.ui.speedSliderLeft)+"px"
			this.snakeSpeed=1+positionGenerator(touch.clientX-this.ui.speedSliderLeft)/38
			document.getElementById("animation").style.animationDuration=1000*this.groundSize/(this.snakeSpeed*50)+"ms"
			this.ui.speedSliderTouchStartPoint=touch.clientX
			this.ui.speedSliderTouchId=touch.identifier
			addEventListener("touchmove",changeSpeedTouchMove,false)
			addEventListener("touchend",changeSpeedTouchUp,false)
			addEventListener("touchcancel",changeSpeedTouchUp,false)
		}.bind(this)
		
		var changeSpeedTouchMove=function(event){
			event.preventDefault()
			var touch
			for(var i=0;i<event.changedTouches.length;i++){
				if(event.changedTouches[i].identifier==this.ui.speedSliderTouchId){
					touch=event.changedTouches[i]
					break
				}
			}
			if(this.ui.speedSliderTouchStartPoint!=touch.clientX){
				document.getElementById("speedSliderButton").style.transition="none"
				document.getElementById("speedSliderButton").style.left=positionGenerator(touch.clientX-this.ui.speedSliderLeft)+"px"
				this.snakeSpeed=1+positionGenerator(touch.clientX-this.ui.speedSliderLeft)/38
				document.getElementById("animation").style.animationDuration=1000*this.groundSize/(this.snakeSpeed*50)+"ms"				
			}
		}.bind(this)
		
		var changeSpeedTouchUp=function(event){
			event.preventDefault()
			var touch
			for(var i=0;i<event.changedTouches.length;i++){
				if(event.changedTouches[i].identifier==this.ui.speedSliderTouchId){
					touch=event.changedTouches[i]
					break
				}
			}
			document.getElementById("speedSliderButton").style.left=positionGenerator(touch.clientX-this.ui.speedSliderLeft)+"px"
			document.getElementById("speedSliderButton").style.transition=""
			this.snakeSpeed=1+positionGenerator(touch.clientX-this.ui.speedSliderLeft)/38
			document.getElementById("animation").style.animationDuration=1000*this.groundSize/(this.snakeSpeed*50)+"ms"				
			removeEventListener("touchmove",changeSpeedTouchMove)
			removeEventListener("touchend",changeSpeedTouchUp)
			removeEventListener("touchcancel",changeSpeedTouchUp)
		}.bind(this)
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
	document.getElementById("speedSliderArea").addEventListener("mousedown",changeSpeedMouseDown,false)
	document.getElementById("f70logo").addEventListener("click",linkGenerator("http://benpigchu.com/f70"),false)
	document.getElementById("sourceButton").addEventListener("click",linkGenerator("https://www.github.com/f70/snakeplus"),false)
	if(systemVar.isTouch){
		document.getElementById("playButton").addEventListener("touchend",touchVersionGenerator(turnToGame),false)
		document.getElementById("settingButton").addEventListener("touchend",touchVersionGenerator(jumpToBoardFunctionGenerator("setting")),false)
		document.getElementById("creditButton").addEventListener("touchend",touchVersionGenerator(jumpToBoardFunctionGenerator("credit")),false)
		document.getElementById("backToMenuFromGameButton").addEventListener("touchend",touchVersionGenerator(backToMenuFromGame),false)
		document.getElementById("replayButton").addEventListener("touchend",touchVersionGenerator(turnToGame),false)
		document.getElementById("continueButton").addEventListener("touchend",touchVersionGenerator(continueGame),false)
		document.getElementById("backToMenuFromDiedButton").addEventListener("touchend",touchVersionGenerator(jumpToBoardFunctionGenerator("menu")),false)
		document.getElementById("tryAgainButton").addEventListener("touchend",touchVersionGenerator(turnToGame),false)
		document.getElementById("backToMenuFromSettingButton").addEventListener("touchend",touchVersionGenerator(jumpToBoardFunctionGenerator("menu")),false)
		document.getElementById("backToMenuFromCreditButton").addEventListener("touchend",touchVersionGenerator(jumpToBoardFunctionGenerator("menu")),false)
		document.getElementById("speedSliderArea").addEventListener("touchstart",changeSpeedTouchDown,false)
		document.getElementById("f70logo").addEventListener("touchend",touchVersionGenerator(linkGenerator("http://benpigchu.com/f70")),false)
		document.getElementById("sourceButton").addEventListener("touchend",touchVersionGenerator(linkGenerator("https://www.github.com/f70/snakeplus")),false)
	}
	
	for(var i=0;i<5;i++){
		document.getElementById("wallSelector"+i).addEventListener("click",chooseWallFunctionGenerator(i),false)
	}
	if(systemVar.isTouch){
		for(var i=0;i<5;i++){
			document.getElementById("wallSelector"+i).addEventListener("touchend",touchVersionGenerator(chooseWallFunctionGenerator(i)),false)
		}
	}
	
	document.getElementById("box").addEventListener("transitionend",function(event){
		if(!this.ui.started){
			this.ui.started=true
			this.ui.toRunFunction()
			document.getElementById("transitionBox").style.backgroundColor="rgba(0,0,0,0)"
		}
	}.bind(this),false)
	document.getElementById("transitionBox").addEventListener("transitionend",function(event){
		if(this.ui.transition){
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
		for(var i=0;i<score.length;i++){
			var div=document.createElement("div")
			div.className="number number"+score[i]+""
			scoreBox.appendChild(div)
			if(score[i]=="1"){
				width+=32
			}else{
				width+=64
			}
		}
		scoreBox.style.width=width+"px"
		if(width>this.groundSize){
			scoreBox.style.zoom=this.groundSize/width+""
		}else{scoreBox.style.zoom="1"}
	}
	
	this.ui.goToScore=function(){
		this.ui.toRunFunction=function(){
			document.getElementById("pauseOverlay").style.opacity="0"
			document.getElementById("score").style.opacity="1"
			if(systemVar.isTouch){document.getElementById("touchController").style.opacity="0"}
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
