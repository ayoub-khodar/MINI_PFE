package com.incident.backend.service.helpers;

import com.incident.backend.entity.Secteur;
import com.incident.backend.entity.Type;
import com.incident.backend.entity.Etat;
public class StatutSecteurType {
    private Secteur secteur;
    private Etat statut;
    private Type type;

    public StatutSecteurType() {
    }

    public Secteur getSecteur() {
        return secteur;
    }

    public void setSecteur(Secteur secteur) {
        this.secteur = secteur;
    }

    public Etat getStatut() {
        return statut;
    }

    public void setStatut(Etat statut) {
        this.statut = statut;
    }

    public Type getType() {
        return type;
    }

    public void setType(Type type) {
        this.type = type;
    }

    public StatutSecteurType(Secteur secteur, Etat statut, Type type) {
        this.secteur = secteur;
        this.statut = statut;
        this.type = type;
    }
}
