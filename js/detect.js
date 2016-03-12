systemVar.isTouch=("ontouchmove" in document)
if(systemVar.isTouch){document.getElementsByTagName("html")[0].classList.add("touch")}
document.getElementById("viewport").setAttribute("content","width=100,user-scalable=no")
if(Math.abs(window.innerWidth-100)>10){systemVar.isTouch=false}	
document.getElementById("viewport").setAttribute("content","width=300,user-scalable=no")
if(Math.abs(window.innerWidth-300)>10){systemVar.isTouch=false}		

if(window.devicePixelRatio==undefined){window.devicePixelRatio=1}
