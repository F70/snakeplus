var game
var systemVar={}
var imageSrcList=["img/back.svg","img/credit.svg","img/font.svg","img/play.svg","img/pause.svg","img/reset.svg","img/resetleft.svg","img/setting.svg","img/help.svg","img/title.svg","img/snakespeed.svg","img/snake.svg","img/wallicon.svg","img/walllist.svg","img/wall.svg"]
var imageList=[]
var loadedImageNumber=0

systemVar.isTouch=("ontouchmove" in document)
if(systemVar.isTouch){document.getElementsByTagName("html")[0].classList.add("touch")}
document.getElementById("viewport").setAttribute("content","width=100,user-scalable=no")
if(Math.abs(window.innerWidth-100)>10){systemVar.isTouch=false}	
document.getElementById("viewport").setAttribute("content","width=300,user-scalable=no")
if(Math.abs(window.innerWidth-300)>10){systemVar.isTouch=false}		

if(window.devicePixelRatio==undefined){window.devicePixelRatio=1}

var resetViewport=function(){
	var size=Math.min(screen.width,screen.height)
	var scale
	if(size<512){
		scale=512
	}else if(size<640){
		scale=640
	}else{
		scale=768
	}
	if(screen.width>screen.height){
		document.getElementById("viewport").setAttribute("content","width="+(scale*innerWidth)/innerHeight+",height="+scale+",user-scalable=no")
	}else{
		document.getElementById("viewport").setAttribute("content","width="+scale+",user-scalable=no")		
	}
}

addEventListener("resize",resetViewport,false)
resetViewport()

function loadGame(){
	game=new Game("snakeArea",window.devicePixelRatio+1,384,"#F70",100,24,3,16,24,24,0,"img/wall.svg")
	game.setSnake()
	if(systemVar.isTouch){document.getElementById("touchController").style.display="block"}
	game.setController()
	game.setUI()
	document.getElementById("box").style.opacity="1"
}

function imageLoader(){
	for(var i=0;i<imageSrcList.length;i++){
		imageList.push(new Image())
		imageList[i].src=imageSrcList[i]
		imageList[i].onload=function(){
			loadedImageNumber++
			console.log(this.src+" loaded")
			if(loadedImageNumber==imageList.length){
				requestAnimationFrame(loadGame)
			}
		}
	}
}

imageLoader()