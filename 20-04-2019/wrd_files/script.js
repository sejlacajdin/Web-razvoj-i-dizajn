var slika=document.getElementsByClassName('VilaKolonaOkvir');
var naziv=document.getElementById('Slika');
var cijena= document.getElementById('CijenaPoDanu');
var izracunaj=document.getElementById('izracunaj');
var brojDana=document.getElementById('BrojDana');
var izbornikDugme=document.getElementById('IzbornikDugme');
var izbornik=document.getElementById('Izbornik');

Array.from(slika).forEach(el=>{
    el.addEventListener('click',()=>{
        el.style.border='2px solid yellow';
        setTimeout(()=>{el.style.border='none'},300);

        if(el==slika[0]){
    naziv.value='Villa Mostar';
   cijena.value=100;
        }else if(el==slika[1]){
            naziv.value='Villa Buna - Blagaj';
            cijena.value=120;
        }else if(el==slika[2]){
            naziv.value='Villa Vlašić';
            cijena.value=130;
        }
    });
});

izracunaj.addEventListener('click',()=>{
    if(brojDana.value!==0){
        console.log(brojDana,cijena);
        if(brojDana.value>0)
        document.getElementById('IznosUkupno').value=brojDana.value*cijena.value;
        
    }
});


izbornikDugme.addEventListener('click',()=>{

        if(izbornik.style.maxHeight!=='0px'){
            izbornik.style.maxHeight='0px';
            izbornik.style.overflow='hidden';
        }else{
    izbornik.style.maxHeight=izbornik.scrollHeight+'px';
        }
    
});