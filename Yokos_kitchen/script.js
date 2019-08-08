var dugme=document.getElementById('dugmeid');
var navBar=document.getElementById('navid');

dugme.addEventListener('click',()=>{
    if(navBar.style.maxHeight=='0px')
    navBar.style.maxHeight=navBar.scrollHeight+'px';
    else 
    navBar.style.maxHeight='0px';
});