package com.incident.backend.service.helpers;

import com.incident.backend.entity.Province;
import com.incident.backend.entity.Etat;

public class StatutProvince {

    private Etat statut;
    private Province province;

    public StatutProvince() {
    }

    public StatutProvince(Etat etat, Province province) {
        this.statut = etat;
        this.province = province;
    }

    public Etat getStatut() {
        return statut;
    }

    public void setStatut(Etat statut) {
        this.statut = statut;
    }

    public Province getProvince() {
        return province;
    }

    public void setProvince(Province province) {
        this.province = province;
    }
}
