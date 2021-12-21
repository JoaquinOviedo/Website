
var MesxDia ;
var today = new Date();
var day = today.getDate();
var month = today.getMonth()+1;
var year = today.getFullYear();
var cuentadias=1,cuentameses=0;
var Maximosdiasxmes = [31,28,31,30,31,30,31,31,30,31,30,31]
var i=0;
const m = 12;
const  n = 31;
let Añoguardado = new Array(m); // create an empty array of length n
for (var i = 0; i < m; i++) {
    Añoguardado[i] = new Array(n); // make each element an array
}

function añobisiesto(año){
    const esBisiesto = (año) => {
        return (año % 400 === 0) ? true : 
                    (año % 100 === 0) ? false : 
                        año % 4 === 0;
      };
}
if(añobisiesto(year)==true){
    Maximosdiasxmes[1]= 29;
}
function reemplazanombredia(dia){
    var dayname = dia.toLocaleDateString("es-AR",{weekday: 'long'});
    var diasinacentos = dayname.normalize('NFD').replace(/[\u0300-\u036f]/g, "");
    var nombredia = diasinacentos.charAt(0).toUpperCase() + diasinacentos.slice(1);
    var fecha = nombredia + " " +String(dia.getDate());
    return fecha;
}


var primerodeenero = new Date(today.getFullYear() , 0, 1);

for(i=0;cuentameses<=11;cuentameses++,i++){
    for(;cuentadias<=Maximosdiasxmes[i];cuentadias++){
        Añoguardado[cuentameses][cuentadias] = reemplazanombredia(new Date(year,cuentameses,cuentadias));
    }
    cuentadias=1;
}

console.log(Añoguardado);




