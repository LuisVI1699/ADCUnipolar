class ADC{
    constructor(bits, reloj, tipo, vref){
        this.bits = bits;
        this.reloj = reloj;
        this.tipo=tipo;
        this.vref=vref;
        this.resolucion = this.vref/(Math.pow(2,this.bits)+1);
        this.error = this.resolucion/2;
        if (tipo == 'Aprox'){
            this.tconver = (this.bits+1)*(1/this.reloj);
        } 
        else{
            this.tconver = Math.pow(2,this.bits)*(1/this.reloj);
        }
    }
    Dato10(Va){
        let dato = Va/this.resolucion;
        return dato;
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