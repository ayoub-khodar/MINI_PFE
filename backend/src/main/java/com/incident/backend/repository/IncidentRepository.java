package com.incident.backend.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.data.jpa.repository.Query;

import com.incident.backend.entity.Incident;
import com.incident.backend.entity.Province;
import com.incident.backend.entity.Secteur;
import com.incident.backend.entity.Type;
import com.incident.backend.entity.Etat;

public interface IncidentRepository extends JpaRepository<Incident,Long>, JpaSpecificationExecutor<Incident> {
    public Incident findById(long Id);
    public List<Incident> findBySecteur(Secteur secteur);
    List<Incident> findByStatut(Etat etat);
    List<Incident> findByProvince(Province province);
    List<Incident> findByType(Type type);
    List<Incident> findByime(String ime);

    @Query("select i.secteur.secteur,count(*) from Incident i  join Secteur s  on i.secteur.id = s.id group by i.secteur.secteur")
    List  findIncidents();

    @Query("select i.province.province,count(*) from Incident i  join Province p  on i.province.id = p.id group by i.province.province")
    List  findIncidentsProv();
    @Query("select i.statut.statut,count(*) from Incident i  join Etat e  on i.statut.id = e.id group by i.statut.statut")
    List  findIncidentsStatut();
    @Query("select i.type.type,count(*) from Incident i  join Type t  on i.type.id = t.id group by i.type.type")
    List  findIncidentsType();

    @Query("select i.Id from Incident i  join User u  on i.user.Id = u.Id and u.Id=?1")
    List findByUserId( long id);

    @Query( value="select ST_SetSRID(ST_MakePoint (i.latitude,i.longitude),4326 ) from  Incident i", nativeQuery = true)
    List<String> GetGeometry();
    /*@Query("")
    void findProvIncident();
    select p.id,i.id
    from province as p,incident as i
    where ST_Intersects(ST_SetSRID(p.geometry,4326),i.geom)
    and i.id=70 ;*/

}
