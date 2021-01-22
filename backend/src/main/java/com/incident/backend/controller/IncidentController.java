package com.incident.backend.controller;

import java.text.DateFormat;
import java.text.SimpleDateFormat;
import java.util.Calendar;
import java.util.Date;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.incident.backend.entity.Incident;
import com.incident.backend.entity.Province;
import com.incident.backend.entity.Secteur;
import com.incident.backend.entity.Type;
import com.incident.backend.repository.IncidentRepository;
import com.incident.backend.entity.Etat;
import com.incident.backend.service.IncidentService;
import com.incident.backend.service.ProvinceService;
import com.incident.backend.service.SecteurService;
import com.incident.backend.service.TypeService;
import com.incident.backend.service.EtatService;
import com.incident.backend.service.helpers.Filter;
import com.incident.backend.service.helpers.IncidentInfos;
import com.incident.backend.service.helpers.ProvinceType;
import com.incident.backend.service.helpers.SecteurProvince;
import com.incident.backend.service.helpers.SecteurType;
import com.incident.backend.service.helpers.StatutProvince;
import com.incident.backend.service.helpers.StatutSecteur;
import com.incident.backend.service.helpers.StatutSecteurType;
import com.incident.backend.service.helpers.StatutType;



@RequestMapping (value = "Incident")
@CrossOrigin("*")
@RestController
public class IncidentController {
    @Autowired
    IncidentService incidentService;
    @Autowired
    private SecteurService secteurService;
    @Autowired
    private TypeService typeService;
    @Autowired
    private EtatService etatService;
    
    @Autowired
    private ProvinceService provinceService;
    @PostMapping(value = "/query")
    
    public List<Incident> query(@RequestBody Filter Filter) {
        List<Incident> result = incidentService.findByQueryCM(Filter);
        return result;
    }
    @PostMapping(value = "/querySectProvince")
    public List<Incident> queryer(@RequestBody SecteurProvince SecteurProvince) {
        List<Incident> result = incidentService.findBySecteurProvince(SecteurProvince);
        return result;
    }
    @PostMapping(value = "/querySectType")
    public List<Incident> queryer(@RequestBody SecteurType secteurType) {
        List<Incident> result = incidentService.findBySecteurType(secteurType);
        return result;
    }
    @PostMapping(value = "/queryProvinceType")
    public List<Incident> queryer(@RequestBody ProvinceType provinceType) {
        List<Incident> result = incidentService.findByProvinceType(provinceType);
        return result;
    }
    @PostMapping(value = "/queryProvinceTypeSecteur")
    public List<Incident> queryer(@RequestBody IncidentInfos IncidentInfos) {
        List<Incident> result = incidentService.finsByProvSectType(IncidentInfos);
        return result;
    }
    @PostMapping(value = "/queryStatutTypeSecteur")
    public List<Incident> queryer(@RequestBody  StatutSecteurType StatutSecteurType) {
        List<Incident> result = incidentService.finsByStatutSectType(StatutSecteurType);
        return result;
    }
    @PostMapping(value = "/querystatutType")
    public List<Incident> queryer(@RequestBody StatutType statutType ) {
        List<Incident> result = incidentService.findByStatutType(statutType);
        return result;
    }
    @PostMapping(value = "/querystatutSecteur")
    public List<Incident> queryer(@RequestBody StatutSecteur statutSecteur ) {
        List<Incident> result = incidentService.findByStatutSecteur(statutSecteur);
        return result;
    }
    @PostMapping(value = "/querystatutProvince")
    public List<Incident> queryer(@RequestBody StatutProvince statutProvince ) {
    	System.out.println(statutProvince);
        List<Incident> result = incidentService.findByStatutProv(statutProvince);
        return result;
    }
    @PostMapping(value = "/{condition}_query")
    public List<Incident> query(@RequestBody Filter Filter, @PathVariable("condition") String condition) {
        List<Incident> result = incidentService.findByQueryBonus(Filter, condition);
        return result;
    }

    @PostMapping(value = "/findByQuery")
    public List<Incident> findByQuery(@RequestParam("field") String field,
                                      @RequestBody() Object value) {
        return incidentService.findByQuery(field, value);
    }

    @PostMapping(value = "/findBySecQuery")
    public List<Incident> findBySec(@RequestParam("field") String field,
                                    @RequestBody Secteur value) {
        
        return incidentService.findByQuery(field, value);
    }

    @GetMapping(value = "/find")
    public List<Incident> findAll(){
        return incidentService.findAll();
    }
    @GetMapping(value = "/findIme/{ime}")
    public List<Incident> findByime( @PathVariable String ime){
        return incidentService.findByime(ime);
    }
    @GetMapping(value = "/find/{id}")
    public Incident findByID (@PathVariable long id ){
        return incidentService.findByID(id);
    }



    @GetMapping(value = "/find/secteur/{id}")
    public List<Incident> findSecteur(@PathVariable long id) {
        Secteur secteur= secteurService.findByID(id);

        return incidentService.findBySecteur(secteur);
    }
    @GetMapping(value = "/find/type/{id}")
    public List<Incident> findType(@PathVariable long id) {
        Type type =  typeService.findByID(id);
        return incidentService.findByType(type);
    }
    @GetMapping(value = "/find/province/{id}")
    public List<Incident> findProvince(@PathVariable long id) {
        Province province=provinceService.findByID(id);
        return incidentService.findByProvince(province);
    }
    @GetMapping(value = "/find/Statut/{id}")
    public List<Incident> findByStatut(@PathVariable long id) {
    	Etat etat= etatService.findByID(id);
        return incidentService.findByStatut(etat);
    }
    @GetMapping(value = "/find/UserId/{id}")
    public List findByUserId(@PathVariable long id) {

        return incidentService.findByUserId(id);
    }


    @PostMapping(value = "/add")
    public void save(@RequestBody   Incident incident){
        Calendar cal = Calendar.getInstance();
        Date date=cal.getTime();
        DateFormat dateFormat = new SimpleDateFormat("MM-dd-yyyy");
        String formattedDate=dateFormat.format(date);
        incident.setDate(date);
        Etat s = new Etat(6,"declaré");
        incident.setStatut(s);
         //incidentService.getGeometry();
        incidentService.save(incident);
    }
    @GetMapping(value = "/delete/{ID}")
    public String deleteByID (@PathVariable long ID) {

        incidentService.deleteByID(ID);
        return  "deleted success" ;}

    @PatchMapping("/update")//replace an existing Resource entirely  // @PatchMapping partial update
    public String update(@RequestBody Incident incident) {

        incidentService.save(incident);
        return "updated  success";
    }

    // les statistiques
    @GetMapping(value = "/secteur/Statistique")
    public List findIncidents () {
        return incidentService.findIncidents();
    }
    @GetMapping(value = "/province/Statistique")
    public List findIncidentsProv () {
        return incidentService.findIncidentsProv();
    }
    @GetMapping(value = "/statut/Statistique")
    public List findIncidentsStatut () {
        return incidentService.findIncidentsStatut();
    }
    @GetMapping(value = "/type/Statistique")
    public List findIncidentsType () {
        return incidentService.findIncidentsType();
    }
    
    
    @Autowired
    private IncidentRepository incidentRepository;
  //10 premiers
    @GetMapping(value = "/list")
	Page<Incident> incidentsPageable(Pageable pageable) {
		return incidentRepository.findAll(pageable);
	}

}
