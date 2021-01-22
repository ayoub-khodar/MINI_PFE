package com.incident.backend.controller;

import java.text.DateFormat;
import java.text.SimpleDateFormat;
import java.util.Calendar;
import java.util.Date;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.fasterxml.jackson.annotation.JsonProperty;
import com.incident.backend.entity.Etat;
import com.incident.backend.entity.Incident;
import com.incident.backend.entity.Province;
import com.incident.backend.service.ProvinceService;
import com.incident.backend.service.helpers.ProvinceReq;
@RequestMapping(value = "Province")
@CrossOrigin("*")
@RestController
public class ProvinceController {

    @Autowired
    ProvinceService provinceService;
    @GetMapping(value = "/find/all")
    public List<Province> findAll(){
        return provinceService.findAll();
    }
    @GetMapping(value = "/find/{id}")
    public Province findByID(@PathVariable long id ){
        return provinceService.findByID(id);
    }
    
    @PostMapping(value = "/findProvince")
    public Province findProvince(@RequestBody()  ProvinceReq Pr){
     
    	return provinceService.findProvince(Pr);
    }



}
