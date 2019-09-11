//Validacija 
$.validator.addMethod(
    "regex",
    function(value, element, regexp) {
        var check = false;
        return this.optional(element) || regexp.test(value);
    },
    "Please check your input."
);

$("#forma").validate({
    rules:{
        dostavaIme:{
            required: true,
            regex: /^[A-Z]{1}[A-Za-z]+ [A-Z]{1}[A-Za-z]+$/
        },
        dostavaAdresa:{
            required:true,
        },
        dostavaGrad:{
            required:true,
        },
        dostavaTelefon:{
            required:true,
            regex: /^[+]\d{3}[-]\d{2}[-]\d{3}[-]\d{4}$/
        },
        proizvodID: {
            regex: /^\d+$/,
            required:true,
        },
        kolicina: {
            regex: /^\d+$/,
            required:true,
        }
    }
});


function tableEmptyProizvod(){
   $('#tabelaDesno tbody').empty();
}

function tableEmptyNarudzbe(){
    $('#tabelaLijevo tbody').empty();
 }

function getPoziv(url,funk){
    var zahtjev=new XMLHttpRequest();

    zahtjev.onload=function(){
        if(zahtjev.status==200){
            funk(JSON.parse(zahtjev.responseText));
        }
    }
    zahtjev.open('GET',url,true);
    zahtjev.send();
}

var urlGetProizvodiAll='https://onlineshop.wrd.app.fit.ba/api/ispit20190829/Narudzba/GetProizvodiAll';
var urlGetNarudzbeAll='https://onlineshop.wrd.app.fit.ba/api/ispit20190829/Narudzba/GetNarudzbeAll';

function createRowProizvod(x){
    return `
    <tr>
    <td>${x.proizvodID}</td>
    <td>${x.naziv}</td>
    <td>${x.cijena}</td>
    <td>${x.jedinicaMjere}</td>
    <td>${x.likeCounter}</td>
    <td><button onclick="LikeCounter(${x.proizvodID})">Like</button></td>
    <td><button onclick="AddProizvodId(${x.proizvodID})">Odaberi</button></td>
    </tr>`;
}

function createRowNarudzba(x){
    return `
    <tr>
    <td>${x.proizvodID}</td>
    <td>${x.naziv}</td>
    <td>${x.cijena}</td>
    <td>${x.kolicina}</td>
    <td>${x.dostavaIme}</td>
    <td>${x.dostavaAdresa}</td>
    <td>${x.dostavaTelefon}</td>
    </tr>`;
}

function ucitajProizvode(response){
    tableEmptyProizvod();
    for(var i in response){
     document.querySelector('#tabelaDesno tbody').innerHTML+=createRowProizvod(response[i]);
    }

}

function ucitajNarudzbe(response){
    tableEmptyNarudzbe();
    for(var i in response){
        document.querySelector('#tabelaLijevo tbody').innerHTML+=createRowNarudzba(response[i]);
       }

}
getPoziv(urlGetProizvodiAll,ucitajProizvode);
getPoziv(urlGetNarudzbeAll,ucitajNarudzbe);

function LikeCounter(x){
    var url=`https://onlineshop.wrd.app.fit.ba/api/ispit20190829/Narudzba/Like?proizvodId=${x}`;

    var zahtjev=new XMLHttpRequest();

    zahtjev.onload=function(){
        if(zahtjev.status==200){
            var res=JSON.parse(zahtjev.responseText);
            res.likeCounter++;
getPoziv(urlGetProizvodiAll,ucitajProizvode);
        }
    }
    zahtjev.open('GET',url,true);
    zahtjev.send();
}

function AddProizvodId(x){
    document.getElementById('proizvodID').value=x;
}

$("#naruci").on('click',function(){

    if($("#forma").valid()==false)
            return;


    var obj={
        dostavaGrad: $('#dostavaGrad').val(),
        dostavaAdresa: $('#dostavaAdresa').val(),
        dostavaIme: $('#dostavaIme').val(),
        dostavaTelefon:$('#dostavaTelefon').val(),
        proizvodId: $('#proizvodID').val(),
        kolicina: $('#kolicina').val()
    };
    $.ajax({
        url: 'http://onlineshop.wrd.app.fit.ba/api/ispit20190829/Narudzba/Dodaj',
        type: 'post',
        contentType: 'application/json',
        data: JSON.stringify(obj),
        success: function(rez) {
            if(rez.poruka){
            getPoziv(urlGetNarudzbeAll,ucitajNarudzbe);                
                $("#forma")[0].reset();
            }
        }
    });
});