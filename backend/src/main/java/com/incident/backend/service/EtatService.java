package com.incident.backend.service;

import java.util.List;

import com.incident.backend.entity.Etat;

public interface EtatService {
	public void save(Etat etat );
    public void deleteByID(long id );
    public List<Etat> findAll() ;
    public Etat findByID(long id );
}
