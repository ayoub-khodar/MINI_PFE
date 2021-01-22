import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Incident} from '../entites/Incident';
import {CustomFilter} from '../entites/CustumFilter';
import {AND, API_URL, INCIDENT_AND_QUERY, INCIDENT_OR_QUERY} from '../utils/constants';
import {SectProvince} from '../entites/SectProvince';
import {SecteurType} from '../entites/SecteurType';
import {ProvinceType} from '../entites/ProvinceType';
import {ProvSecteurType} from '../entites/ProvSecteurType';
import {StatutProvince} from '../entites/StatutProvince';
import {StatutSecteur} from '../entites/StatutSecteur';
import {StatutType} from '../entites/StatutType';
import {BehaviorSubject, Subject} from 'rxjs';
import {StatutSecteurType} from '../entites/StatutSecteurType';

@Injectable({
    providedIn: 'root'
})
export class IncidentService {
    listIncidents: BehaviorSubject<any>;
    constructor(private http: HttpClient) {
        this.listIncidents = new BehaviorSubject<any>(null);
    }
    findAllIncident() {

        return this.http.get(API_URL + '/Incident/find' );

    }
    findIncidentById(id: number) {

        return this.http.get(API_URL + '/Incident/find/' + id );

    }

    AddIncident(incident: Incident) {
        return this.http.post(API_URL + '/Incident/add', incident);
    }

    findByQuery( custmFilter: CustomFilter) {
        // const endpoint = (condition == AND) ? INCIDENT_AND_QUERY : INCIDENT_OR_QUERY;
        return this.http.post(API_URL +  '/Incident/and_query' , custmFilter);
    }
    findByIme(ime: string) {

        return this.http.get(API_URL +  '/Incident/findIme/' + ime );
    }
    findByQueryOr(custmFilter: CustomFilter) {
        return this.http.post(API_URL +  '/Incident/or_query' , custmFilter);
    }

    findByProvince(id: number) {
        return this.http.get(API_URL + '/Incident/find/province/' + id);
    }
    findByBySecteur(id: number) {
        return this.http.get(API_URL + '/Incident/find/secteur/' + id);
    }
    findByByType(id: number) {
        return this.http.get(API_URL + '/Incident/find/type/' + id);
    }
   findByStatut(id: number) {
        return this.http.get(API_URL + '/Incident/find/Statut/'+ id );
    }
    findByProvinceSecteur(sectprovince: SectProvince) {
        return this.http.post(API_URL +  '/Incident/querySectProvince' , sectprovince );
    }
    findBySecteurType(secteurType: SecteurType) {
        return this.http.post(API_URL +  '/Incident/querySectType' ,  secteurType);
    }
    findByProvinceType(provinceType: ProvinceType)
    {
        return this.http.post(API_URL +  '/Incident/queryProvinceType' , provinceType );
    }
    findByProvSecteurTye(provSecteurType: ProvSecteurType)
    {
        return this.http.post(API_URL +  '/Incident/queryProvinceTypeSecteur' , provSecteurType );
    }
    findByStatutProvince(Statutprovince: StatutProvince)
    {
        return this.http.post(API_URL +  '/Incident/querystatutProvince' , Statutprovince );
    }
    findByStatutSecteur(statutSecteur: StatutSecteur)
    {
        return this.http.post(API_URL +  '/Incident/querystatutSecteur' , statutSecteur );
    }
    findByStatutType(statutType : StatutType)
    {
        return this.http.post(API_URL +  '/Incident/querystatutType' , statutType );
    }

    findByStatutSecteurType( statutSecteurType : StatutSecteurType){
        return this.http.post(API_URL +  '/Incident/queryStatutTypeSecteur' , statutSecteurType );
    }





}
