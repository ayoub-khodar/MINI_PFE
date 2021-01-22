package com.incident.backend.service.impl;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.incident.backend.entity.Province;
import com.incident.backend.repository.ProvinceRepository;
import com.incident.backend.service.ProvinceService;
import com.incident.backend.service.helpers.ProvinceReq;


@Service
public class ProvinceServiceImpl implements ProvinceService {
    @Autowired
    private ProvinceRepository provinceRepository;
    @Override
    public Province findByID(long id) {
        return  provinceRepository.findById(id);
    }

    @Override
    public List<Province> findAll() {
        return provinceRepository.findAll();
    }

    @Override
    public void save(Province province) {
        provinceRepository.save(province);

    }

    @Override
    public void deleteByID(long Id) {
        provinceRepository.deleteById(Id);
    }
    @Override
    public Province findProvince(ProvinceReq Pr) {
    	
    	//float latitude = Float.parseFloat(lat);
    	//System.out.println("la nouvelle float valeur de lat : " + latitude);
    	//float longitude = Float.parseFloat(lon);
    	//System.out.println("la nouvelle float valeur de long : " + longitude);
    	return provinceRepository.findProvince(Pr.getlat(),Pr.getlon());
    }
}
