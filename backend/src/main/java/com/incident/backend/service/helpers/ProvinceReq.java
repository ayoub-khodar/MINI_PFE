package com.incident.backend.service.helpers;

import com.incident.backend.entity.Secteur;

public class ProvinceReq {
	private String lon;
    private String lat;
    
    public float getlon() {
    	return Float.parseFloat(this.lon);
    }
    public float getlat() {
    	return Float.parseFloat(this.lat);
    }
}
