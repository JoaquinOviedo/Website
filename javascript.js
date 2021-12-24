function Thisyear(){    
    var botonvar=0;
    Program(botonvar);}
function Nextyear(){    
    var botonvar=1;
    Program(botonvar);}

    function Program(botonesvar){
        
    var today = new Date();
    var day = today.getDate();

    var year = today.getFullYear() + botonesvar;
    var cuentadias=1,cuentameses=0;
    var Maximosdiasxmes = [31,28,31,30,31,30,31,31,30,31,30,31]
    var i=0;
    const m = 12;
    const  n = 3;
    var Añoguardado = new Array(m); // create an empty array of length n
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
        var nombredia = diasinacentos.toUpperCase()
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
    var cuentadias=1,cuentameses=0;

    var table = document.getElementById("Tabla");
    var Meses = ["Enero","Febrero","Marzo","Abril","Mayo","Junio","Julio","Agosto","Septiembre","Octubre","Noviembre","Diciembre"];

    for(i=0;cuentameses<=11;cuentameses++,i++){
        var row = table.insertRow(-1);
        var cell7 = row.insertCell(-1).innerHTML = Meses[cuentameses] +" "+ String(year) ;
        var cell7 = row.className = "Mes";
        var cell3 = row.insertCell(-1).className = "espacio";
        var cell3 = row.insertCell(-1).className = "espacio";
        cuentameses++;
        var cell8 = row.insertCell(-1).innerHTML = Meses[cuentameses] +" "+ String(year) ;
        cuentameses--;
        var cell3 = row.insertCell(-1).className = "espacio";
        for(;cuentadias<=31;cuentadias++){
            
            var row = table.insertRow(-1);
            var cell1 = row.insertCell(-1).innerHTML = Boolean(Añoguardado[cuentameses][cuentadias]) ?  Añoguardado[cuentameses][cuentadias] : "";
            var cell2 = row.insertCell(-1).className = "blanco";
            var cell3 = row.insertCell(-1).className = "espacio";
            cuentameses++;
            var cell4 = row.insertCell(-1).innerHTML = Boolean(Añoguardado[cuentameses][cuentadias]) ?  Añoguardado[cuentameses][cuentadias] : "";
            var cell5 = row.insertCell(-1).className = "blanco";
            cuentameses--;
        }
        var row = table.insertRow(-1);
        var cell6 = row.insertCell(-1).className = "divisor";
        cuentadias=1;
        cuentameses++;
    }
    
    console.log(Añoguardado);




}