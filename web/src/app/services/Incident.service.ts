import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CustomFilter } from '../entities/CustomFilter';
import { Incident } from '../entities/Incidents';
import { SectProvince } from '../entities/SectProvince';
import { SecteurType } from '../entities/SecteurType';
import { ProvinceType } from '../entities/ProvinceType';
import { ProvSecteurType } from '../entities/ProvSecteurType';
import { StatutProvince } from '../entities/StatutProvince';
import { StatutSecteur } from '../entities/StatutSecteur';
import { StatutType } from '../entities/StatutType';
import {AND, API_URL, INCIDENT_AND_QUERY, INCIDENT_OR_QUERY} from '../Util/constantes';
import {HttpClient} from '@angular/common/http';
import {StatutSecteurType} from '../entities/statutSecteurType';
@Injectable({
  providedIn: 'root'
})
export class IncidentService {
  Incidents:any;
  Secteurs:any;
      constructor(private http: HttpClient) {
       }
    findAllIncident() {

        return this.http.get(API_URL + '/Incident/find' );

    }
    updateIncident(incident: Incident){
      return this.http.patch(API_URL+'/Incident/update',incident);
    }
    findbysecteur(id){
      return this.http.get(API_URL +'/find/secteur/'+id);
    }
    AddIncident(incident: Incident) {
        this.http.post(API_URL + '/Incident/add', incident);
    }

  findByQuery( custmFilter: CustomFilter) {
    // const endpoint = (condition == AND) ? INCIDENT_AND_QUERY : INCIDENT_OR_QUERY;
    return this.http.post(API_URL +  '/Incident/and_query' , custmFilter);
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
  findByByStatut(statut: number) {
    return this.http.get(API_URL + '/Incident/find/Statut/'+ statut );
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
  findUserById(id:number){
        return this.http.get(API_URL+'/Incident/find/UserId/'+ id);
  }
 findIncidentById(id:number){
        return this.http.get(API_URL+'/Incident/find/'+id)
 }
findByStatutSecteurType( statutSecteurType : StatutSecteurType){
  return this.http.post(API_URL +  '/Incident/queryStatutTypeSecteur' , statutSecteurType );
}

incidentsPageable(page: number, size: number){
  return this.http.get(API_URL+'/Incident/list?page='+page+'&size='+size+'&sort=date');
}

}
    


