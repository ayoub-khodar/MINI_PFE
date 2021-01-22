package com.incident.backend.service;

import java.util.List;

import com.incident.backend.entity.Incident;
import com.incident.backend.entity.Province;
import com.incident.backend.entity.Secteur;
import com.incident.backend.entity.Etat;
import com.incident.backend.entity.Type;
import com.incident.backend.service.helpers.Filter;
import com.incident.backend.service.helpers.IncidentInfos;
import com.incident.backend.service.helpers.ProvinceType;
import com.incident.backend.service.helpers.SecteurProvince;
import com.incident.backend.service.helpers.SecteurType;
import com.incident.backend.service.helpers.StatutProvince;
import com.incident.backend.service.helpers.StatutSecteur;
import com.incident.backend.service.helpers.StatutSecteurType;
import com.incident.backend.service.helpers.StatutType;


public interface IncidentService {
    public void save(Incident incident);
    public void deleteByID(long id );
    public List<Incident> findAll() ;
    public  Incident findByID(long id );
    public List<Incident> findBySecteur(Secteur secteur);
    List<Incident> findByStatut(Etat etat);
    List<Incident> findByProvince(Province province);
    List<Incident> findByType(Type type);
    List<Incident> findByQuery(String field, Object value);
    List<Incident> findByQuerySecteur(Secteur secteur);
    List<Incident> findByQueryCM(Filter customFilter);
    List<Incident> findByQueryBonus(Filter customFilter, String condition);
    List<Incident> findBySecteurProvince(SecteurProvince sectProvince);
    List<Incident> findBySecteurType(SecteurType secteurType);
    List<Incident> findByProvinceType(ProvinceType provinceType);
    List<Incident> finsByProvSectType(IncidentInfos ProvinceSecteurType);
    List<Incident> finsByStatutSectType( StatutSecteurType statutSecteurType);
    List<Incident> findByStatutProv(StatutProvince statutProvince);
     List<Incident> findByStatutSecteur(StatutSecteur StatutSecteur);
     List<Incident> findByStatutType(StatutType statutType);
    List<Incident> findByime(String ime);

    List findIncidents();
    List findIncidentsProv();
    List  findIncidentsStatut();
    List  findIncidentsType();
    List<String> getGeometry();
    List findByUserId(long id);

}