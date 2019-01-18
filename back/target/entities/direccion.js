"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Direccion {
    constructor(latitud, longitud, calle, numero) {
        this._calle = calle;
        this._latitud = latitud;
        this._longitud = longitud;
        this._numero = numero;
    }
    get latitud() {
        return this._latitud;
    }
    set latitud(value) {
        this._latitud = value;
    }
    get longitud() {
        return this._longitud;
    }
    set longitud(value) {
        this._longitud = value;
    }
    get calle() {
        return this._calle;
    }
    set calle(value) {
        this._calle = value;
    }
    get numero() {
        return this._numero;
    }
    set numero(value) {
        this._numero = value;
    }
}
exports.Direccion = Direccion;
