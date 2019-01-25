import {Caso} from './caso'

export class Result {
    
    private results:Array<Caso>;

    constructor(casos:Array<Caso>){
        this.results = casos;
    }
}