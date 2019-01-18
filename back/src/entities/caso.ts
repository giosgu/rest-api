import { Direccion } from "./direccion";

export class Caso {
    private _sintoma: string
    private _socio: string  
    private _direccion:Direccion

    
    constructor(sintoma:string, socio:string, direccion:Direccion   ){
        this._sintoma = sintoma;
        this._socio = socio;
        this._direccion = direccion;
    }

    public get socio(): string {
        return this._socio;
    }
    public set socio(value: string) {
        this._socio = value;
    }

    public get sintoma(): string {
        return this._sintoma;
    }
    public set sintoma(value: string) {
        this._sintoma = value;
    }
    




}