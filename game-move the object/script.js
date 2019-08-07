var redBox=document.getElementById("redBox");
var blackBox=document.getElementById("blackBox");
var time=document.getElementsByTagName("span")[0];
var point=document.getElementsByTagName("span")[1];
var stop=document.getElementById("stop");
var start=document.getElementById("start");
var sirinaDokumenta=document.documentElement.clientWidth;
var duzinaDokumenta=document.documentElement.clientHeight;
redBox.style.left="500px";
redBox.style.top="300px";

blackBox.style.left=sirinaDokumenta/2+'px';
blackBox.style.top='300px';

var addClassActive=function(arrow){
    document.getElementById(arrow).classList.add('active');  
        setTimeout(()=>{
            document.getElementById(arrow).classList.remove('active');  
        },100);
};
var createNewBox=function(){
    var x=document.createElement("div");
    x.className="blackBoxes";
    x.style.top="500px";
    x.style.left="500px";
    document.body.appendChild(x);

    setTimeout(function(){
        var y=document.createElement("div");
        y.className="blueBoxes";
        y.style.top='780px';
        y.style.left='780px';
        document.body.appendChild(y);
    },6000);
}

// Two objects overlap
var rectangleRed={};

// if a overlaps b
function overlaps(a, b) {
	// no horizontal overlap
	if (a.x1 >= b.x2 || b.x1 >= a.x2) return false;
	// no vertical overlap
	if (a.y1 >= b.y2 || b.y1 >= a.y2) return false;
	return true;
}

/** Get positions of top-left and bottom-right dots */
var getPositions=function(rectangleBlack){

    rectangleBlack.y1=parseInt(rectangleBlack.style.top);
    rectangleBlack.x1=parseInt(rectangleBlack.style.left);
    rectangleBlack.y2=(parseInt(rectangleBlack.style.top)+parseInt(blackBox.offsetHeight));
    rectangleBlack.x2=(parseInt(rectangleBlack.style.left)+parseInt(blackBox.offsetWidth));
    
    rectangleRed.y1=parseInt(redBox.style.top);
    rectangleRed.x1=parseInt(redBox.style.left);
    rectangleRed.y2=(parseInt(redBox.style.top)+parseInt(redBox.offsetHeight));
    rectangleRed.x2=(parseInt(redBox.style.left)+parseInt(redBox.offsetWidth));

    return rectangleBlack;
}

var moveObject=function(box,move){
    var a= parseInt(box.style.left);
    var b=parseInt(box.style.top);
    
    if(box!==redBox)
    calculatePoints(box);

    if(b>=duzinaDokumenta) b=0;
    switch(move){
        case 'lijevo': a-=50; break;
        case 'desno': a+=50; break;
        case 'gore': b-=50; break;
        case 'dolje': b+=50; break;
    }
    box.style.left=a+'px';
    box.style.top=b+'px';
};

var points=0;
var calculatePoints=function(box){
    var boxes=getPositions(box);

    if(overlaps(boxes,rectangleRed)){
        if(box.className=="blueBoxes")
        points++;
        else
        points--;
         point.innerHTML=points;
         document.body.removeChild(box);
       }
}

var moveRandom=function(Box){
    Array.from(Box).forEach(element => {
        random=Math.floor(Math.random()*4);
        switch(random){
            case 1: moveObject(element,'desno'); break;
            case 2: moveObject(element,'lijevo'); break;
            case 3: moveObject(element,'gore');break;
            case 4: moveObject(element,'dolje');  break;
        }
    });
}
var timer=()=>{
    var date=new Date();
    time.innerHTML=date.toLocaleTimeString();
    moveObject(blackBox,'dolje');
    var random;
    var Box=document.getElementsByClassName("blackBoxes");
    var blueBox=document.getElementsByClassName("blueBoxes");
   moveRandom(Box);
   moveRandom(blueBox);
};

/*Move red box* */
var fun=(event)=>{
    var key=event.keyCode;
    if(event.target.value==='lijevo' || key===37){
        addClassActive('lijevo');
        moveObject(redBox,'lijevo');
    } 
    else if(event.target.value==='desno' || key===39){
        addClassActive('desno');
        moveObject(redBox,'desno');
    } 
    else if(event.target.value==='gore' || key===38){
        addClassActive('gore');
        moveObject(redBox,'gore');     
    } 
    else if(event.target.value==='dolje' || key===40){
        addClassActive('dolje');
        moveObject(redBox,'dolje');        
    } 
};
window.addEventListener('click',fun);
window.addEventListener('keydown',fun);

/*Stop and start buttons */
var setIntv;
stop.addEventListener('click',()=>{
    stop.disabled=true;
    start.disabled=false;
    clearInterval(setIntv);
});
start.addEventListener('click',()=>{
    start.disabled=true;
    stop.disabled=false;
    setIntv= setInterval(timer,1000);
});

/*Create new box every 3s */
setInterval(createNewBox,3000);