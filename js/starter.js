var game
var imageSrcList=["img/back.svg","img/credit.svg","img/font.svg","img/play.svg","img/reset.svg","img/setting.svg","img/title.svg","img/snakespeed.svg","img/wallicon.svg","img/walllist.svg","img/wall.svg"]
var imageList=[]
var loadedImageNumber=0

function loadGame() {
	game=new Game("snakeArea",384,"#F70",100,24,3,16,24,24,0,"img/wall.svg")
	game.setSnake()
	game.setController()
	game.setUI()
	document.getElementById("box").style.opacity="1"
}

function imageLoader() {
	for (var i=0;i<imageSrcList.length;i++) {
		imageList.push(new Image())
		imageList[i].src=imageSrcList[i]
		imageList[i].onload=function() {
			loadedImageNumber++
			console.log(this.src+" loaded")
			if(loadedImageNumber==imageList.length){
				requestAnimationFrame(loadGame)
			}
		}
	}
}

imageLoader()