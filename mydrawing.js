//mydrawings.js

var mycanvas;
var ctx;
var draw;
var drawsize = 10;//이 변수 크기변경시 그려지는 크기도 변경 됨
var drawcolor = "#FF0000";//이 변수값 변경시 색 변경

/*var w5 = function(){
    drawsize = 5;
}
var w10 = function(){
    drawsize = 10;
}
var w20 = function(){
    drawsize = 20;
}
var w30 = function(){
    drawsize = 30;
}
var w40 = function(){
    drawsize = 40;
}*/
var upw = function(){
    if(drawsize <= 45)drawsize = drawsize + 5;
}
var downw = function(){
    if(drawsize > 5) drawsize = drawsize - 5;
    else drawsize = 1;
}
var wred = function(){
    drawcolor = "red";
}
var wgree = function(){
    drawcolor = "green";
}
var wblue = function(){
    drawcolor = "blue";
}
var worange = function(){
    drawcolor = "orange";
}
var wblack = function(){
    drawcolor = "black";
}
var wyellow = function(){
    drawcolor = "yellow";
}
var windigo = function(){
    drawcolor = "indigo";
}
var wviolet = function(){
    drawcolor = "#ee82ee";
}
var wsky = function(){
    drawcolor = "#00D8FF";
}
var wpink = function(){
    drawcolor = "#FF007F";
}
var wgray = function(){
    drawcolor = "#8C8C8C";
}
var wwhite = function(){
    drawcolor = "white";
}
window.onload = function(evt){

    mycanvas = document.querySelector("#mycanvas");
    ctx = mycanvas.getContext("2d");
    draw = false;

    mycanvas.addEventListener("mousedown",function(event){
        draw = true;
    });
    mycanvas.addEventListener("mouseup",function(event){
        draw = false;
    });
    mycanvas.addEventListener("mousemove",function(event){
        if(!draw) return;
        let loc = this.getBoundingClientRect();
        //Subtract the MOUSE LOCATION FROM the element location
        let x = event.clientX - loc.x;
        let y = event.clientY - loc.y;
        ctx.beginPath();
        ctx.strokeStyle = drawcolor;//겉표면색
        ctx.fillStyle = drawcolor;//채우는색fill()실행시채워짐
        ctx.arc(x, y, drawsize, 0, 2* Math.PI);//rect(10,10,100,100)네모
        ctx.fill();
        ctx.stroke();
    });
};

var allerase = function(){//모두지우기 함수
    ctx.clearRect(0, 0, 500, 500);
}