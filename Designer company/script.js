 var izbornik = document.getElementById("Izbornik");
 var izbornikDugme=document.getElementsByTagName('span')[0];

 izbornikDugme.addEventListener('click',()=>{
    if(izbornik.style.maxHeight!=='0px'){
        izbornik.style.maxHeight='0px';
        izbornik.style.overflow='hidden';
    }else{
        izbornik.style.maxHeight=izbornik.scrollHeight+'px';
    }
 });