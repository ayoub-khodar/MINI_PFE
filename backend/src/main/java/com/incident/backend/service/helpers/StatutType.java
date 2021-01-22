package com.incident.backend.service.helpers;

import com.incident.backend.entity.Type;
import com.incident.backend.entity.Etat;

public class StatutType {
    private Etat statut;
    private Type type;

    public StatutType() {
    }

    public StatutType(Etat statut, Type type) {
        this.statut = statut;
        this.type = type;
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
}
