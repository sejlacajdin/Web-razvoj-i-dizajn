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
            required:true,
            regex:/^[A-Z]{1}[a-z]+ [A-Z]{1}[a-z]+$/
        },
        dostavaAdresa:{
            required:true,
            regex:/^[A-Za-z]+$/
        },
        dostavaTelefon:{
            required:true,
            regex:/^[+]\d{3}[-]\d{2}[-]\d{3}[-]\d{4}$/
        }
    }
});

//JSON
var urlGetProizvodiAll='http://onlineshop.wrd.app.fit.ba/api/ispit20190914/Narudzba/GetProizvodiAll';
var urlgetNarudzbeAll='http://onlineshop.wrd.app.fit.ba/api/ispit20190914/Narudzba/GetNarudzbeAll';


function getPoziv(url,funk,id=0){
    var zahtjev=new XMLHttpRequest();
    
    zahtjev.onload=function(){
        if(zahtjev.status==200){
            funk(JSON.parse(zahtjev.responseText),id);
        }
    }
    zahtjev.open('GET',url,true);
    zahtjev.send();
}


function clearTableProizvodi(){
    $('#tabelaGore tbody').empty();
}

function clearTableNarudzbe(){
    $('#tabelaDolje tbody').empty();
}
function createRow(x){
    return `
    <tr>
    <td>${x.proizvodID}</td>
    <td>${x.likeCounter}</td>
    <td>${x.naziv}</td>
    <td><img src="${x.slikaUrl}" style="width:40px;"></td>
    <td>${x.cijenaPoKvadratu}</td>
    <td><button onclick="AddLike(${x.proizvodID})">Like</button></td>
    <td><button onclick="IzaberiID(${x.proizvodID})">Odaberi</button></td>
    </tr>`;
}

function createRowNarudzbe(x){

    return `<tr>
    <td>${x.proizvodID}</td>
    <td>${x.naziv}</td>
    <td>${x.cijena}</td>
    <td>${x.kolicina}</td>
    <td>${x.iznos}</td>
    <td>${x.dostavaIme}</td>
    <td>${x.dostavaAdresa}</td>
    <td>${x.datumNarudzbe}</td>
    <td>${x.dostavaTelefon}</td>
    </tr>`;
}
function ucitajProizvode(proizvodi){
       clearTableProizvodi();
       for(var i in proizvodi){
           document.querySelector('#tabelaGore tbody').innerHTML+=createRow(proizvodi[i]);
       }
}

function ucitajNarudzbe(narudzbe){
    clearTableNarudzbe();
    for(var i in narudzbe){
        document.querySelector('#tabelaDolje tbody').innerHTML+=createRowNarudzbe(narudzbe[i]);

    }
}

function ucitajNazivProizvoda(proizvodi,id){
 
    for(var i in proizvodi){
        if(proizvodi[i].proizvodID==id)
            $("#nazivProizvoda").val(proizvodi[i].naziv);    
    }
}

getPoziv(urlGetProizvodiAll,ucitajProizvode);


function AddLike(id){

    var url=`http://onlineshop.wrd.app.fit.ba/api/ispit20190914/Narudzba/Like?proizvodId=${id}`;

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

function IzaberiID(id){
    var url=`http://onlineshop.wrd.app.fit.ba/api/ispit20190914/Narudzba/GetProizvodOpcije?proizvodId=${id}`;

    var zahtjev=new XMLHttpRequest();
    zahtjev.onload=function(){
        if(zahtjev.status==200){
            var res=JSON.parse(zahtjev.responseText);

           $('#opcija').empty();
           $('#proizvodID').val(id);
            for(var i in res){
                document.getElementById('opcija').innerHTML+=`<option>${res[i]}</option>`;
            }
        getPoziv(urlGetProizvodiAll,ucitajNazivProizvoda,id);   
        }
    }
    zahtjev.open('GET',url,true);
    zahtjev.send();
}


$('#naruci').click(function(){
        if($('#forma').valid()==false)
        return;

        var url='http://onlineshop.wrd.app.fit.ba/api/ispit20190914/Narudzba/Dodaj';

        var obj={
            dostavaGrad:$('#dostavaGrad').val(),
            dostavaAdresa:$('#dostavaAdresa').val(),
            dostavaIme:$('#dostavaIme').val(),
            dostavaTelefon:$('#dostavaTelefon').val(),
            proizvodID:$('#proizvodID').val(),
            opcijaModel:$('#opcija').val(),
        }

        var json=JSON.stringify(obj);

        var zahtjev=new XMLHttpRequest();
        zahtjev.onload=function(){
            if(zahtjev.status==200){
                getPoziv(urlgetNarudzbeAll,ucitajNarudzbe);
            }

        }

        zahtjev.open('POST',url,true);
        zahtjev.setRequestHeader('Content-Type','application/json');
        zahtjev.send(json);
});

getPoziv(urlgetNarudzbeAll,ucitajNarudzbe);
