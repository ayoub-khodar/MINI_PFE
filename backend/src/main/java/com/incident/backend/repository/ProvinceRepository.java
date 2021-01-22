package com.incident.backend.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.incident.backend.entity.Province;


public interface ProvinceRepository extends JpaRepository<Province,Long> {
public Province findById(long id);

@Query( value="select * from province where ST_INTERSECTS(ST_SetSRID(ST_Point(?2,?1),4326),province.geometry)", nativeQuery = true)
Province findProvince(@Param("lat") float lat,@Param("lon") float lon);

}
