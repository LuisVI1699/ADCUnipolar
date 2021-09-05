
var botonon = document.getElementById('iniciar');

class ADC{
    constructor(bits, reloj, tipo, vref){
        this.bits = bits;
        this.reloj = reloj;
        this.tipo=tipo;
        this.vref=vref;
        this.resolucion = this.vref/(Math.pow(2,this.bits)+1);
        this.error = this.resolucion/2;
        if (tipo == 'rampa')
        {
            this.tconver = Math.pow(2,this.bits)*(1/this.reloj);    
        } 
        else{

            this.tconver = (this.bits+1)*(1/this.reloj);
        }
    }
    Dato10(Va){
        let dato = Va/this.resolucion;
        return Math.round(dato);
    }
    bitsPerSeconds(fsa){
        let bps = fsa * this.bits;
        return bps;
    }
    twr(bps, t){
        let MB = (bps*t)*(1/8)*(1/1024)*(1/1024);
        return MB;  
    }
}

const boton = document.querySelector("#iniciar");

boton.addEventListener("click", function(){
    
    botonon.classList.toggle('on');
    iniciar();
    $(id = "#results").toggle();
    $(id = "#parametros").toggle();
});



$("#Ventrada").on("change keyup paste", function(){
    iniciar();
})

function iniciar(){
    let tipo = document.getElementById('ADC').value;
    let bits = document.getElementById('bits').value;
    let vref = document.getElementById('Vref').value;
    let orden = document.getElementById('orden').value;
    let Formatiempo = document.getElementById('Formatiempo').value;
    let ventrada = document.getElementById('Ventrada').value;
    let frec = document.getElementById('frec').value;
    let Tiempo = document.getElementById('tiempo').value;
    if (orden == 'kilos')
    {
        frec = frec * 1000;
    }
    if (orden == 'Megas')
    {
        frec= frec * 1000000;
    }
    if (Formatiempo == 'Minutos')
    {
        Tiempo = Tiempo * 60;
    }
    const A = new ADC(bits,frec,tipo,vref);
    document.getElementById('datodec').innerHTML = "Dato de salida en Decimal = " + A.Dato10(ventrada);
    document.getElementById('datobin').innerHTML = "Dato de salida en Binario = " + A.Dato10(ventrada).toString(2);
    document.getElementById('tconversion').innerHTML = "Tiempo de conversión = " + A.tconver + " segundos";
    document.getElementById('bps').innerHTML = "Bits/segundo = " + A.bitsPerSeconds(frec)+ " bps";
    document.getElementById('espacio').innerHTML = "Espacio = " + A.twr(A.bitsPerSeconds(frec),Tiempo) + " Bytes";
}


