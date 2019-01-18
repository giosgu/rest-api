import { runInThisContext } from "vm";

export class Direccion {
    
    private _latitud: string;
    private _longitud: string;
    private _calle: string
    private _numero: string;

    constructor(latitud:string, longitud:string, calle:string, numero:string) {
        this._calle=calle
        this._latitud=latitud
        this._longitud=longitud
        this._numero=numero
    }

    public get latitud(): string {
        return this._latitud;
    }
    public set latitud(value: string) {
        this._latitud = value;
    }
    public get longitud(): string {
        return this._longitud;
    }
    public set longitud(value: string) {
        this._longitud = value;
    }

    public get calle(): string {
        return this._calle;
    }
    public set calle(value: string) {
        this._calle = value;
    }
    


    public get numero(): string {
        return this._numero;
    }
    public set numero(value: string) {
        this._numero = value;
    }

}