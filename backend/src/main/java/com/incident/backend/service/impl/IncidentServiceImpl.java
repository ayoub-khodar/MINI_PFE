package com.incident.backend.service.impl;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Service;

import com.incident.backend.entity.Incident;
import com.incident.backend.entity.Province;
import com.incident.backend.entity.Secteur;
import com.incident.backend.entity.Type;
import com.incident.backend.entity.Etat;
import com.incident.backend.repository.IncidentRepository;
import com.incident.backend.service.IncidentService;
import com.incident.backend.service.helpers.Filter;
import com.incident.backend.service.helpers.IncidentInfos;
import com.incident.backend.service.helpers.ProvinceType;
import com.incident.backend.service.helpers.SecteurProvince;
import com.incident.backend.service.helpers.SecteurType;
import com.incident.backend.service.helpers.StatutProvince;
import com.incident.backend.service.helpers.StatutSecteur;
import com.incident.backend.service.helpers.StatutSecteurType;
import com.incident.backend.service.helpers.StatutType;
import com.incident.backend.specification.IncidentSpecification;


@Service
public class IncidentServiceImpl implements IncidentService {

    public static final String AND = "and";
    public static final String OR = "or";

    @Autowired
    IncidentRepository incidentRepository;

    @Override
    public void save(Incident incident) {
        incidentRepository.save(incident);

    }

    @Override
    public void deleteByID(long id) {

        incidentRepository.deleteById(id);


    }

    public List<Incident> findByQuery(String field, Object value) {
        Specification<Incident> spec = IncidentSpecification.fieldEqual(field, value);
        return incidentRepository.findAll(spec);
    };

    public List<Incident> findByQuerySecteur(Secteur secteur) {
        Specification<Incident> spec = IncidentSpecification.secteurEqual(secteur);
        return incidentRepository.findAll(spec);
    };

    public List<Incident> findByQueryCM(Filter customFilter) {
        Specification<Incident> spec = null;
        Specification<Incident> finalSpec = null;
        if (customFilter.getStatut() != null) {
        	
            finalSpec = IncidentSpecification.statutEqual(customFilter.getStatut());
        }
        if (customFilter.getProvince() != null) {
            spec = IncidentSpecification.provinceEqual(customFilter.getProvince());
            finalSpec =  (finalSpec != null) ? finalSpec.and(spec) : spec;
        }
        if (customFilter.getSecteur() != null) {
            spec = IncidentSpecification.secteurEqual(customFilter.getSecteur());
            finalSpec =  (finalSpec != null) ? finalSpec.and(spec) : spec;
        }
        if (customFilter.getType() != null) {
            spec = IncidentSpecification.typeEqual(customFilter.getType());
            finalSpec =  (finalSpec != null) ? finalSpec.and(spec) : spec;
        }
        return incidentRepository.findAll(finalSpec);
    }


    public List<Incident> findByQueryBonus(Filter customFilter, String condition) {
        if (AND.equals(condition)) {
            return findByQueryCM(customFilter);
        }
        else {
            Specification<Incident> spec = null;
            Specification<Incident> finalSpec = null;
            if (customFilter.getStatut() != null) {
                finalSpec = IncidentSpecification.statutEqual(customFilter.getStatut());
            }
            if (customFilter.getProvince() != null) {
                spec = IncidentSpecification.provinceEqual(customFilter.getProvince());
                finalSpec =  (finalSpec != null) ? finalSpec.or(spec) : spec;
            }
            if (customFilter.getSecteur() != null) {
                spec = IncidentSpecification.secteurEqual(customFilter.getSecteur());
                finalSpec =  (finalSpec != null) ? finalSpec.or(spec) : spec;
            }
            if (customFilter.getType() != null) {
                spec = IncidentSpecification.typeEqual(customFilter.getType());
                finalSpec =  (finalSpec != null) ? finalSpec.or(spec) : spec;
            }
            return incidentRepository.findAll(finalSpec);
        }
    }

    @Override
    public Incident findByID(long id) {
        return incidentRepository.findById(id);
    }

    @Override
    public List<Incident> findBySecteur(Secteur secteur) {
        return incidentRepository.findBySecteur(secteur);
    }

    @Override
    public List<Incident> findByStatut(Etat etat) {
        return incidentRepository.findByStatut(etat);
    }
    @Override
    public List<Incident> findByProvince(Province province ) {

        return incidentRepository.findByProvince(province);
    }
    @Override
    public List<Incident> findByType(Type type ) {

        return incidentRepository.findByType(type);
    }
    @Override
    public List<Incident> findAll() {
        return incidentRepository.findAll();

    }

    @Override
    public List<Incident> findBySecteurProvince(SecteurProvince sectProvince) {
        Specification<Incident> spec = null;
        Specification<Incident> finalSpec = null;

        if (sectProvince.getProvince() != null) {
            spec = IncidentSpecification.provinceEqual(sectProvince.getProvince());
            finalSpec =  (finalSpec != null) ? finalSpec.and(spec) : spec;
        }
        if (sectProvince.getSecteur() != null) {
            spec = IncidentSpecification.secteurEqual(sectProvince.getSecteur());
            finalSpec =  (finalSpec != null) ? finalSpec.and(spec) : spec;
        }

        return incidentRepository.findAll(finalSpec);
    }

    @Override
    public List<Incident> findBySecteurType(SecteurType secteurType) { Specification<Incident> spec = null;
        Specification<Incident> finalSpec = null;

        if (secteurType.getSecteur() != null) {
            spec = IncidentSpecification.secteurEqual(secteurType.getSecteur());
            finalSpec =  (finalSpec != null) ? finalSpec.and(spec) : spec;
        }
        if (secteurType.getType() != null) {
            spec = IncidentSpecification.typeEqual(secteurType.getType());
            finalSpec =  (finalSpec != null) ? finalSpec.and(spec) : spec;
        }
        return incidentRepository.findAll(finalSpec);
    }

    @Override
    public List<Incident> findByProvinceType(ProvinceType provinceType) {
        Specification<Incident> spec = null;
        Specification<Incident> finalSpec = null;

        if (provinceType.getProvince() != null) {
            spec = IncidentSpecification.provinceEqual(provinceType.getProvince());
            finalSpec =  (finalSpec != null) ? finalSpec.and(spec) : spec;
        }

        if (provinceType.getType() != null) {
            spec = IncidentSpecification.typeEqual(provinceType.getType());
            finalSpec =  (finalSpec != null) ? finalSpec.and(spec) : spec;
        }
        return incidentRepository.findAll(finalSpec);
    }

    @Override
    public List<Incident> finsByProvSectType(IncidentInfos ProvinceSecteurType) {
        Specification<Incident> spec = null;
        Specification<Incident> finalSpec = null;
        if (ProvinceSecteurType.getProvince() != null) {
            spec = IncidentSpecification.provinceEqual(ProvinceSecteurType.getProvince());
            finalSpec =  (finalSpec != null) ? finalSpec.and(spec) : spec;
        }
        if (ProvinceSecteurType.getSecteur() != null) {
            spec = IncidentSpecification.secteurEqual(ProvinceSecteurType.getSecteur());
            finalSpec =  (finalSpec != null) ? finalSpec.and(spec) : spec;
        }
        if (ProvinceSecteurType.getType() != null) {
            spec = IncidentSpecification.typeEqual(ProvinceSecteurType.getType());
            finalSpec =  (finalSpec != null) ? finalSpec.and(spec) : spec;
        }
        return incidentRepository.findAll(finalSpec);
    }

    @Override
    public List<Incident> finsByStatutSectType(StatutSecteurType statutSecteurType) {
        Specification<Incident> spec = null;
        Specification<Incident> finalSpec = null;
        if (statutSecteurType.getStatut() != null) {
            finalSpec = IncidentSpecification.statutEqual(statutSecteurType.getStatut());
        }

        if (statutSecteurType.getSecteur() != null) {
            spec = IncidentSpecification.secteurEqual(statutSecteurType.getSecteur());
            finalSpec =  (finalSpec != null) ? finalSpec.and(spec) : spec;
        }
        if (statutSecteurType.getType() != null) {
            spec = IncidentSpecification.typeEqual(statutSecteurType.getType());
            finalSpec =  (finalSpec != null) ? finalSpec.and(spec) : spec;
        }
        return incidentRepository.findAll(finalSpec);
    }

    @Override
    public List<Incident> findByStatutProv(StatutProvince statutProvince) {
        Specification<Incident> spec = null;
        Specification<Incident> finalSpec = null;
        if (statutProvince.getStatut() != null) {
            finalSpec = IncidentSpecification.statutEqual(statutProvince.getStatut());
        }
        if (statutProvince.getProvince() != null) {
            spec = IncidentSpecification.provinceEqual(statutProvince.getProvince());
            finalSpec =  (finalSpec != null) ? finalSpec.and(spec) : spec;
        }

        return incidentRepository.findAll(finalSpec);
    }

    @Override
    public List<Incident> findByStatutSecteur(StatutSecteur StatutSecteur) {
        Specification<Incident> spec = null;
        Specification<Incident> finalSpec = null;
        if (StatutSecteur.getStatut() != null) {
            finalSpec = IncidentSpecification.statutEqual(StatutSecteur.getStatut());
        }

        if (StatutSecteur.getSecteur() != null) {
            spec = IncidentSpecification.secteurEqual(StatutSecteur.getSecteur());
            finalSpec =  (finalSpec != null) ? finalSpec.and(spec) : spec;
        }

        return incidentRepository.findAll(finalSpec);
    }

    @Override
    public List<Incident> findByStatutType(StatutType statutType) {
        Specification<Incident> spec = null;
        Specification<Incident> finalSpec = null;
        if (statutType.getStatut() != null) {
            finalSpec = IncidentSpecification.statutEqual(statutType.getStatut());
        }


        if (statutType.getType() != null) {
            spec = IncidentSpecification.typeEqual(statutType.getType());
            finalSpec =  (finalSpec != null) ? finalSpec.and(spec) : spec;
        }
        return incidentRepository.findAll(finalSpec);
    }

    @Override
    public List<Incident> findByime(String ime) {
        return incidentRepository.findByime(ime) ;
    }

    @Override
    public List findIncidents() {
         return incidentRepository.findIncidents();

    }

    @Override
    public List findIncidentsProv() {
        return incidentRepository.findIncidentsProv();
    }

    @Override
    public List findIncidentsStatut() {
        return incidentRepository.findIncidentsStatut();
    }

    @Override
    public List findIncidentsType() {
        return incidentRepository.findIncidentsType();
    }

    @Override
    public List <String> getGeometry() {
       return incidentRepository.GetGeometry();

    }

    @Override
    public List findByUserId(long id) {
        return incidentRepository.findByUserId(id);
    }


}
