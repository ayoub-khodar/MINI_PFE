package com.incident.backend.specification;

import javax.persistence.criteria.CriteriaBuilder;
import javax.persistence.criteria.CriteriaQuery;
import javax.persistence.criteria.Predicate;
import javax.persistence.criteria.Root;

import org.springframework.data.jpa.domain.Specification;

import com.incident.backend.entity.Incident;
import com.incident.backend.entity.Province;
import com.incident.backend.entity.Secteur;
import com.incident.backend.entity.Type;
import com.incident.backend.entity.Etat;

public class IncidentSpecification {

    public static Specification<Incident> fieldEqual(String field, Object value) {
        switch (field) {
            case "secteur" :
                return secteurEqual((Secteur) value);
            case "statut" :
                return statutEqual((Etat) value);
            case "type":
                return typeEqual((Type) value);
            case "province":
                return provinceEqual((Province) value);
        }
        return new Specification<Incident>() {
            @Override
            public Predicate toPredicate(Root<Incident> root, CriteriaQuery<?> criteriaQuery, CriteriaBuilder criteriaBuilder) {
                return criteriaBuilder.equal(root.get(field), value);
            }
        };
    }

    public static Specification<Incident> provinceEqual(Province province) {
        return new Specification<Incident>() {
            @Override
            public Predicate toPredicate(Root<Incident> root, CriteriaQuery<?> criteriaQuery, CriteriaBuilder criteriaBuilder) {
                return criteriaBuilder.equal(root.get("province"), province);
            }
        };
    }

    public static Specification<Incident> statutEqual(Etat statut) {
        return new Specification<Incident>() {
            @Override
            public Predicate toPredicate(Root<Incident> root, CriteriaQuery<?> criteriaQuery, CriteriaBuilder criteriaBuilder) {
                return criteriaBuilder.equal(root.get("statut"), statut);
            }
        };
    }

    public static Specification<Incident> secteurEqual(Secteur secteur) {
        return new Specification<Incident>() {
            @Override
            public Predicate toPredicate(Root<Incident> root, CriteriaQuery<?> criteriaQuery, CriteriaBuilder criteriaBuilder) {
                return criteriaBuilder.equal(root.get("secteur"), secteur);
            }
        };
    }

    public static Specification<Incident> typeEqual(Type type) {
        return new Specification<Incident>() {
            @Override
            public Predicate toPredicate(Root<Incident> root, CriteriaQuery<?> criteriaQuery, CriteriaBuilder criteriaBuilder) {
                return criteriaBuilder.equal(root.get("type"), type);
            }
        };
    }
}
