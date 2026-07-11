(function () {

if (window.desktopToggleCreated) return;
window.desktopToggleCreated = true;

let desktop = false;

const btn = document.createElement("button");
btn.textContent = "📱";
btn.style.cssText = 
position:fixed;
right:15px;
bottom:20px;
z-index:999999999;
padding:12px 18px;
font-size:18px;
border-radius:25px;
background:#1976d2;
color:white;
border:none;
box-shadow:0 0 10px rgba(0,0,0,.5);
;

document.body.appendChild(btn);

function phoneMode(){

desktop=false;

btn.textContent="📱";

document.documentElement.style.width="";
document.body.style.width="";
document.body.style.zoom="";
document.body.style.transform="";
document.body.style.transformOrigin="";
document.querySelectorAll("meta[name=viewport]").forEach(v=>{
v.setAttribute("content",
"width=device-width, initial-scale=1.0");
});

}

function desktopMode(){

desktop=true;

btn.textContent="🖥";

let vp=document.querySelector("meta[name=viewport]");
if(!vp){
vp=document.createElement("meta");
vp.name="viewport";
document.head.appendChild(vp);
}

vp.setAttribute("content",
"width=1280,initial-scale=0.25,maximum-scale=5,user-scalable=yes");

document.documentElement.style.width="1280px";
document.body.style.width="1280px";

}

btn.onclick=function(){

if(desktop){
phoneMode();
}else{
desktopMode();
}

};

})();
