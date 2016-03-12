var systemVar={}

try{
	if(!("createPattern" in document.createElement("canvas").getContext("2d"))){throw(new ReferenceError())}
	if(!("transition" in document.createElement("div").style)||!("animation" in document.createElement("div").style)){throw(new ReferenceError())}
}catch(e){
	requestAnimationFrame(function(){
		document.getElementById("error").style.display="block"
	})
}

systemVar.isTouch=("ontouchmove" in document)
if(systemVar.isTouch){document.getElementsByTagName("html")[0].classList.add("touch")}
document.getElementById("viewport").setAttribute("content","width=100,user-scalable=no")
if(Math.abs(window.innerWidth-100)>10){systemVar.isTouch=false}	
document.getElementById("viewport").setAttribute("content","width=300,user-scalable=no")
if(Math.abs(window.innerWidth-300)>10){systemVar.isTouch=false}		

if(window.devicePixelRatio==undefined){window.devicePixelRatio=1}
