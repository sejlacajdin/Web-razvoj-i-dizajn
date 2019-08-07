
window.addEventListener('load',()=>{
    document.getElementById("result").textContent='0';      
    document.getElementById("values_to_calc").textContent='';  
    document.getElementsByClassName("calc_win")[0].style.height="54px";    
});

 var arr=document.getElementsByClassName("button");
 Array.from(arr).forEach(element => {
     element.addEventListener('click',()=>{
        if(element.textContent!=='CE' && element.textContent!=='FC' && element.textContent!=='='){
            document.getElementById("values_to_calc").textContent+=element.textContent;

        } else if(element.textContent==='CE'){
            document.getElementById("result").textContent='0';
            document.getElementById("values_to_calc").textContent='';  

        }else if(element.textContent==='FC'){
            var text=document.getElementById("values_to_calc").textContent;
            text=text.slice(0,text.length-1);
            document.getElementById("values_to_calc").textContent=text;
        }else if(element.textContent==='='){
            try{
                document.getElementById("result").textContent=eval(document.getElementById("values_to_calc").textContent);
                document.getElementById("values_to_calc").textContent='';
            }catch(error){
                alert('Nedozovljena operacija!');
            }
        }
        
          
     });
 });

 
 window.addEventListener('keypress',()=>{
     var x=event.keyCode;
     var y=String.fromCharCode(x);
    Array.from(arr).forEach(el=>{
        if(y===el.textContent){
            el.classList.add("active");
          setTimeout(function() { 
             el.classList.remove("active"); },100);
        }
    });
    if(x!==13 && x!==8 && document.getElementById("values_to_calc").textContent.length<=15){
        document.getElementById("values_to_calc").textContent+=y;

    }else if(x===8){
        var text=document.getElementById("values_to_calc").textContent;
        text=text.slice(0,text.length-1);
        document.getElementById("values_to_calc").textContent=text;
    }else if(x===13){
        try{
            document.getElementById("result").textContent=eval(document.getElementById("values_to_calc").textContent);
            document.getElementById("values_to_calc").textContent='';
        }catch(error){
            alert('Nedozovljena operacija!');
        }
    }     
 });

 window.addEventListener('keydown',()=>{
    var x=event.keyCode;
    var y=String.fromCharCode(x);        
         if(x===8){
       var text=document.getElementById("values_to_calc").textContent;
       text=text.slice(0,text.length-1);
       document.getElementById("values_to_calc").textContent=text;
         }
});