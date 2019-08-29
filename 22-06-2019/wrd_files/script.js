var IzbornikDugme=document.getElementById('IzbornikDugme');
var Izbornik=document.getElementById('Izbornik');
var VilaKolonaOkvir=document.getElementsByClassName('VilaKolonaOkvir');
var dodajKupca=document.getElementById("dodajKupca");

if(document.documentElement.scrollWidth<=600){
Izbornik.style.height='0px';
Izbornik.style.overflow='hidden';
}

IzbornikDugme.onmouseover=function(){
    IzbornikDugme.style.cursor='pointer';
};

IzbornikDugme.addEventListener('click',function(){

    if(Izbornik.style.height=='0px'){
        Izbornik.style.height=Izbornik.scrollHeight+'px';
    }else{
        Izbornik.style.height='0px';
        Izbornik.style.overflow='hidden';
    }
});

window.onresize=function(){
    
if(document.documentElement.offsetWidth>600){
Izbornik.style.height=Izbornik.scrollHeight+'px';
Izbornik.style.overflow='visible';}else{
    Izbornik.style.height='0px';
Izbornik.style.overflow='hidden';
}


}


/* Array.from(VilaKolonaOkvir).forEach(el=>{

    el.addEventListener('click',function(){
        el.style.border='2px solid yellow';
        setTimeout(function(){
            el.style.border='none';
        },300);
    });
}); */

VilaKolonaOkvir[0].addEventListener('click',function(){
    VilaKolonaOkvir[0].style.border='3px solid yellow';
    VilaKolonaOkvir[1].style.border='none';
    VilaKolonaOkvir[2].style.border='none';
});

VilaKolonaOkvir[1].addEventListener('click',function(){
    VilaKolonaOkvir[1].style.border='3px solid yellow';
    VilaKolonaOkvir[0].style.border='none';
    VilaKolonaOkvir[2].style.border='none';
});

VilaKolonaOkvir[2].addEventListener('click',function(){
    VilaKolonaOkvir[2].style.border='3px solid yellow';
    VilaKolonaOkvir[1].style.border='none';
    VilaKolonaOkvir[0].style.border='none';
});

//Validacija jQuery

$.validator.addMethod( 
    "regex", 
    function(value, element, regexp) {
     var check = false; return this.optional(element) || regexp.test(value);
     },
 "Please check your input."
  )

$("#formaID").validate({
    rules:{
        ime:{
            regex:/^[A-Za-z ]+$/
        },
        adresa:{
            regex:/^[A-Za-z ]+$/
        },
        postanskiBroj:{
            regex:/^\d{5}$/
        },
        telefon:{
            regex:/[+]\d{3}[-]\d{2}[-]\d{3}[-]\d{4}/
        }

    }
});

//Dodavanje kupca

function clearTable(){
    $("#tabelaID tbody").empty();
}
function createRow(x){
    clearTable();
    return `<tr>
    <td>${x.narudzbaId}</td>
    <td>${x.datumNarudzbe}</td>
    <td>${x.dostavaIme}</td>
    <td>${x.dostavaAdresa}</td>
    <td>${x.dostavaPostanskiBroj}</td>
    <td>${x.dostavaTelefon}</td>
    <td>${x.napomena}</td>
    </tr>`
};

var url2=`http://onlineshop.wrd.app.fit.ba/api/ispit20190622/Narudzba/GetAll`;
function getPoziv(){

    var zahtjev=new XMLHttpRequest();

    zahtjev.onload=function(){
        if(zahtjev.status==200){
            var json=JSON.parse(zahtjev.responseText);
            
            for(var i in json)
           document.getElementById('tabelaID').innerHTML+= createRow(json[i]);
        }
    }

    zahtjev.open('GET',url2,true);
    zahtjev.send(null);
};

var url=`http://onlineshop.wrd.app.fit.ba/api/ispit20190622/Narudzba/Dodaj`;
dodajKupca.addEventListener('click',function(){
    if($("#formaID").valid()==false){
        return;
    }else{
        var zahtjev=new XMLHttpRequest();

        var z={
            dostavaAdresa:document.getElementById("dostavaAdresa").value,
            dostavaIme: document.getElementById("dostavaIme").value,
            dostavaPostanskiBroj:document.getElementById("dostavaPostanskiBroj").value,
            dostavaTelefon:document.getElementById("dostavaTelefon").value,
            napomena:document.getElementById("napomena").value
        };

        zahtjev.onload=function(){
            if(zahtjev.status==200){
              clearTable();
                getPoziv();
            }
        }
        zahtjev.open('POST',url,true);
        zahtjev.setRequestHeader('Content-Type','application/json');
        zahtjev.send(JSON.stringify(z));
    }
    
});

getPoziv();

//Filtriranje

document.getElementById('filtiranje').oninput=function(){
    clearTable();
    var unos=document.getElementById('filtiranje').value;
    zahtjev=new XMLHttpRequest();
    zahtjev.onload=function(){
        if(zahtjev.status==200){
            
            var json=JSON.parse(zahtjev.responseText);
            
            for(var i in json){
                if(json[i].dostavaIme.startsWith(unos)){
                    document.getElementById('tabelaID').innerHTML+= createRow(json[i]);
                }
            }
        }
    }
      zahtjev.open('GET',url2,true);
      zahtjev.send(null);
}