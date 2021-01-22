package com.incident.backend.service.helpers;

import com.incident.backend.entity.Secteur;
import com.incident.backend.entity.Etat;
public class StatutSecteur {
    private Etat statut;
    private Secteur secteur;

    public StatutSecteur() {
    }

    public StatutSecteur(Etat statut, Secteur secteur) {
        this.statut = statut;
        this.secteur = secteur;
    }

    public Etat getStatut() {
        return statut;
    }

    public void setStatut(Etat statut) {
        this.statut = statut;
    }

    public Secteur getSecteur() {
        return secteur;
    }

    public void setSecteur(Secteur secteur) {
        this.secteur = secteur;
    }
}
