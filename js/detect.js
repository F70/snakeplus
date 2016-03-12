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
var isMobile={
	Android:function(){
		return navigator.userAgent.match(/Android/i)?true:false;
	},
	BlackBerry:function(){
		return navigator.userAgent.match(/BlackBerry/i)?true:false;
	},
	iOS:function(){
		return navigator.userAgent.match(/iPhone|iPad|iPod/i)?true:false;
	},
	Windows:function(){
		return navigator.userAgent.match(/IEMobile/i)?true:false;
	},
	any:function(){
		return(isMobile.Android()||isMobile.BlackBerry()||isMobile.iOS()||isMobile.Windows());
	}
}
systemVar.isTouch=systemVar.isTouch&&isMobile.any()
if(systemVar.isTouch){document.getElementsByTagName("html")[0].classList.add("touch")}

if(window.devicePixelRatio==undefined){window.devicePixelRatio=1}
