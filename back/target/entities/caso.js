"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Caso {
    constructor(sintoma, socio, direccion) {
        this._sintoma = sintoma;
        this._socio = socio;
        this._direccion = direccion;
    }
    get socio() {
        return this._socio;
    }
    set socio(value) {
        this._socio = value;
    }
    get sintoma() {
        return this._sintoma;
    }
    set sintoma(value) {
        this._sintoma = value;
    }
}
exports.Caso = Caso;
