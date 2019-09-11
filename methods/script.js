
    var idZaposlenika=0;
function createRow(x){
    return `<tr id="${x.id}">
    <td>${x.id}</td>
    <td>${x.employee_name}</td>
    <td>${x.employee_salary}</td>
    <td>${x.employee_age}</td>
    <td><button onclick="Detalji(${x.id})">Detalji</button></td>
    <td><button onclick="BtnObrisi(${x.id})">Obriši</button></td>
    </tr>`
}

function clearRow(){
    document.getElementById('tabelaID').innerHTML=` <tr>
    <th>Id</th>
   <th>Ime</th> 
   <th>Plata</th>
    <th>Starost</th>
   </tr>`;
}
function Detalji(id){
   var url=`http://dummy.restapiexample.com/api/v1/employee/${id}`;
   var zahtjev=new XMLHttpRequest();
   zahtjev.onload=function(){
       var x=JSON.parse(zahtjev.responseText);
      /*  console.log(x); */
       document.getElementById('id').innerText=x.id;
       document.getElementById('Ime').innerText=x.employee_name;
       document.getElementById('plata').innerText=x.employee_salary;
       document.getElementById('starost').innerText=x.employee_age;
      }
    zahtjev.open('GET',url,true);
    zahtjev.send();
}

function BtnObrisi(id){
      var url=`http://dummy.restapiexample.com/api/v1/delete/${id}`;
      var zahtjev= new XMLHttpRequest();

      zahtjev.onload=function(){
          if(zahtjev.status==200){
              document.getElementById(`${id}`).remove();
          }
      }
      zahtjev.open('DELETE',url,true);
      zahtjev.send();
}

function BtnUpdate(){
    var id=document.getElementById('id_update').value;
    var url=`http://dummy.restapiexample.com/api/v1/update/${id}`;

    var newObj=new Object();
    newObj.name=document.getElementById('ime_update').value;
    newObj.salary=document.getElementById('plata_update').value;
    newObj.age=document.getElementById('starost_update').value;
 var json=JSON.stringify(newObj);
console.log(json);
    var zahtjev=new XMLHttpRequest();
zahtjev.onload=function(){
          if(zahtjev.status==200){
              btnDownloadSve();
          }
}
    zahtjev.open('PUT',url,true);
    zahtjev.send(json);

}

function BtnDodaj(){

    var url=`http://dummy.restapiexample.com/api/v1/create`;

    var zahtjev= new XMLHttpRequest();
    var obj=new Object();
    obj.name=document.getElementById('ime_update').value;
    obj.salary=document.getElementById('plata_update').value;
    obj.age=document.getElementById('starost_update').value;
    json=JSON.stringify(obj);

    zahtjev.onload=function(){
        if(zahtjev.status==200){
            btnDownloadSve();
            var x=JSON.parse(zahtjev.responseText);
            console.log(x);
            idZaposlenika=x.id;
        }
    }
    zahtjev.open('POST',url,true);
    zahtjev.send(json);
}
function btnDownloadSve(){

    clearRow();
    var url=`http://dummy.restapiexample.com/api/v1/employees`;
    
    var zahtjev=new XMLHttpRequest();
    var table=document.getElementById('tabelaID');
    var ime=document.getElementById('ime').value;
    zahtjev.onload=function(){
        if(zahtjev.status==200){
            var x=JSON.parse(zahtjev.responseText);
            
            for(var i in x){
                if(x[i].employee_name.startsWith(ime)){
                     var row=createRow(x[i]);
                    table.innerHTML+=row;
                    if(x[i].id==idZaposlenika){
                        document.getElementById(`${x[i].id}`).style.color='red';
                    }
                }
                    
            }
        }
    }
    zahtjev.open('GET',url,true);
    zahtjev.send();
}