import {Secteur} from './Secteur';
import {Type} from './Type';
import {Province} from './Province';
import {User} from './User';
import { Statut } from './Statut';

export class Incident {
    id: number;
    Date: Date;
    description: string;
    secteur: Secteur;
    longitude: number;
    latitude: number;
    statut: Statut;
    province: Province;
    type: Type;
    photo: string;
    idProv: number;
    motif: string;
   user: User;
    setSecteur(value: Secteur) {
        this.secteur = value;
    }

    setProvince(value: Province) {
        this.province = value;
    }

    setType(value: Type) {
        this.type = value;
    }



    constructor() {}


}
