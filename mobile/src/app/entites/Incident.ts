import {Secteur} from './Secteur';
import {Type} from './Type';
import {Province} from './Province';
import {Statut} from './Statut';
export class Incident {
    id: number;
    Date: string;
    description: string;
    secteur: Secteur;
    longitude: number;
    latitude: number;
    statut: Statut;
    province: Province;
    type: Type;
    photo: string;
    ime: string;

    setSecteur(value: Secteur) {
        this.secteur = value;
    }

    setProvince(value: Province) {
        this.province = value;
    }

    setType(value: Type) {
        this.type = value;
    }
    getProv() {
        return this.province;
    }

    constructor() {}


}
