import {Component, OnInit, TemplateRef} from '@angular/core';
import { IncidentService } from '../services/Incident.service';
import {BsModalRef, BsModalService} from 'ngx-bootstrap';
import {UserService} from '../services/UserService';
import {LIST_STATUTS} from '../Util/constantes';
import { Statut } from '../entities/Statut';
import { Incident } from '../entities/Incidents';
//import * as L from 'leaflet';
class test {
  id: number;
  name: String;

}
declare  let L;
declare var require: any;
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  //iconRetinaUrl: require('leaflet/dist/images/marker-icon-2x.png'),
  //iconUrl: require('leaflet/dist/images/marker-icon.png'),
  //shadowUrl: require('leaflet/dist/images/marker-shadow.png'),
  
});

const markers = Array();
@Component({
  selector: 'app-administration',
  templateUrl: './administration.component.html',
  styleUrls: ['./administration.component.scss']
})

export class AdministrationComponent implements OnInit {

  statut: any;
  Incidents: any;
  stat: any;
  modalRef: BsModalRef;
  ListUserSec: any;
  listProf = [];
  StatutChoisi: any;
  SecteurIncident: any;
  prof = [];
  p: test;
  IncidentChoisi: any;
  motifChoisi:string;
  userChoisi: any;
  comportement:any;
  Incident: Incident;
  Incident1: Incident; 
  ListSecteur: any;
  ListType: any;
  data: any;
  ListProvince: any;
  CustumFilter: any;
  ListIncident: any;
  idProvinceChoisi: any;
  idStatutChoisi: any;
  idSecteurChoisi: any;
  idTyprChoisi: any;
  map: any;
  listIncident2: any;
  selectedProvinceId: any;
  selectedType: any;
  selectedSecteur: any;
  selectedStatut: any;
  selectedSecteur2:any;
  div1:boolean=true;
  page:number = 0;
  incidents:Array<any>;
  selectedincidents:Array<Incident>;
  pages:Array<number>;
    constructor( private incidentService: IncidentService,
                 private modalService: BsModalService,
                 private userService: UserService) {
      this.p = new test();
      this.statut = ['validé', 'rejeté'];
      this.incidentService.findAllIncident().subscribe(
        data => {
          this.Incidents = data;
         // console.log(this.Incidents);
        }
      );
      this.userService.findUserSec().subscribe(data => {
        this.ListUserSec = data;
       // console.log(this.ListUserSec);
      });


     }



  
  edit(item){
    this.incidentService.findAllIncident().subscribe(
           data => {
            
             console.log(this.ListIncident);
             this.ListIncident = data;
             console.log(this.ListIncident);

          //  this.marker(this.ListIncident);
          });
          this.selectedincidents = [];
            this.isShow = !this.isShow;
            this.map.setView([item.latitude, item.longitude], 14);
            this.Incident1=item;
            console.log(this.Incident1);
            console.log(this.Incident1.statut.etat);
            this.selectedincidents.push(this.Incident1);
            console.log(this.selectedincidents[0].statut.id);
            console.log(this.selectedincidents.length);
            this.IncidentChoisi = item;
            this.marker(this.selectedincidents);
           this.SecteurIncident = item.secteur.secteur;
              console.log(this.SecteurIncident);

  }

  getStatut(evt) {
    this.StatutChoisi = evt.target.value;
    console.log(this.StatutChoisi);
    this.prof = [];
    console.log(this.ListUserSec);
    console.log(this.ListUserSec[0][0]);
    console.log(this.SecteurIncident);
    for (let i = 0; i < this.ListUserSec.length; i++) {

      if (this.ListUserSec[i][0] == this.SecteurIncident) {
        this.p = {id: null,
           name: null
        };
        this.p.id = this.ListUserSec[i][1];
        this.p.name = this.ListUserSec[i][2];
        this.prof.push(this.p);
        console.log(this.prof);
        console.log(this.p);

      }

    }

    console.log('this.prof', this.prof);

  }
  do2(evt) {
    console.log(evt.target.value);
    this.userService.finbById(evt.target.value).subscribe(
      data => {
        console.log(data);
        this.userChoisi = data;
        console.log(this.userChoisi);

      }
    );

  }
  motif(evt){

    this.motifChoisi = evt.target.value;
  }

  ngOnInit() {
    const lat = 31.1728205;
    const lng = -7.3362482;
    const zoom = 6;
    // set up the map and remove the default zoomControl
    const mapboxAccessToken = 'pk.eyJ1Ijoic3VwZXJwaWthciIsImEiOiI0MGE3NGQ2OWNkMzkyMzFlMzE4OWU5Yjk0ZmYzMGMwOCJ9.3bGFHjoSXB8yVA3KeQoOIw';
    this.map = L.map('map', {zoomControl: false}, {measureControl: true}).setView([31.1728205, -7.3362482], 6);
    const streets = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png');
    L.tileLayer('http://server.arcgisonline.com/ArcGIS/rest/services/World_Street_Map/MapServer/tile/{z}/{y}/{x}', {
      attribution: 'gestion des incidents',
    }).addTo(this.map);
    // custom zoom bar control that includes a Zoom Home function
    L.Control.zoomHome = L.Control.extend({
      options: {
        position: 'topleft',
        zoomInText: '+',
        zoomInTitle: 'Zoom in',
        zoomOutText: '-',
        zoomOutTitle: 'Zoom out',
        zoomHomeText: '<i class="fa fa-home" style="line-height:1.65;"></i>',
        zoomHomeTitle: 'Zoom home'
      },

      onAdd(map) {
        const controlName = 'gin-control-zoom',
          container = L.DomUtil.create('div', controlName + ' leaflet-bar'),
          options = this.options;

        this._zoomInButton = this._createButton(options.zoomInText, options.zoomInTitle,
          controlName + '-in', container, this._zoomIn);
        this._zoomHomeButton = this._createButton(options.zoomHomeText, options.zoomHomeTitle,
          controlName + '-home', container, this._zoomHome);
        this._zoomOutButton = this._createButton(options.zoomOutText, options.zoomOutTitle,
          controlName + '-out', container, this._zoomOut);

        this._updateDisabled();
        map.on('zoomend zoomlevelschange', this._updateDisabled, this);

        return container;
      },

      onRemove(map) {
        map.off('zoomend zoomlevelschange', this._updateDisabled, this);
      },

      _zoomIn(e) {
        this._map.zoomIn(e.shiftKey ? 3 : 1);
      },

      _zoomOut(e) {
        this._map.zoomOut(e.shiftKey ? 3 : 1);
      },

      _zoomHome(e) {
        this.map.setView([31.1728205, -7.3362482], 6);
      },

      _createButton(html, title, className, container, fn) {
        const link = L.DomUtil.create('a', className, container);
        link.innerHTML = html;
        link.href = '#';
        link.title = title;

        L.DomEvent.on(link, 'mousedown dblclick', L.DomEvent.stopPropagation)
          .on(link, 'click', L.DomEvent.stop)
          .on(link, 'click', fn, this)
          .on(link, 'click', this._refocusOnMap, this);

        return link;
      },

      _updateDisabled() {
        const map = this._map,
          className = 'leaflet-disabled';

        L.DomUtil.removeClass(this._zoomInButton, className);
        L.DomUtil.removeClass(this._zoomOutButton, className);

        if (map._zoom === map.getMinZoom()) {
          L.DomUtil.addClass(this._zoomOutButton, className);
        }
        if (map._zoom === map.getMaxZoom()) {
          L.DomUtil.addClass(this._zoomInButton, className);
        }
      }
    });
    // add the new control to the map
    const zoomHome = new L.Control.zoomHome();
    zoomHome.addTo(this.map);
  }
  marker(ListIncident) {
    var redIcon = L.icon({
      iconUrl: require('src/assets/leaflet/images/red_marker.png'),
      iconAnchor:   [10, 41],
      iconSize:     [25, 41], // size of the icon    
  });
  var blueIcon = L.icon({
      iconUrl: require('src/assets/leaflet/images/blue_marker.png'),
      iconAnchor:   [10, 41],
      iconSize:     [25, 41], // size of the icon    
  });
  var greenIcon = L.icon({
      iconUrl: require('src/assets/leaflet/images/green_marker.png'),
      iconAnchor:   [10, 41],
      iconSize:     [25, 41], // size of the icon    
  });
  var yellowIcon = L.icon({
      iconUrl: require('src/assets/leaflet/images/yellow_marker.png'),
      iconAnchor:   [10, 41],
      iconSize:     [25, 41], // size of the icon    
  });
  var orangeIcon = L.icon({
      iconUrl: require('src/assets/leaflet/images/orange_marker.png'),
      iconAnchor:   [10, 41],
      iconSize:     [25, 41], // size of the icon    
  });
  var greyIcon = L.icon({
    iconUrl: require('src/assets/leaflet/images/grey_marker.png'),
    iconAnchor:   [10, 41],
    iconSize:     [25, 41], // size of the icon    
});
    for (let i = 0; i < ListIncident.length; i++) {
      
      if (ListIncident[i].statut.id ==1) {
        const marker = L.marker([ListIncident[i].latitude, ListIncident[i].longitude], {icon: redIcon} ).addTo(this.map);
        marker.bindPopup('<img src="' + ListIncident[i].photo  + '" ' + 'style=" width: 150px;' + ' height: 150px;"  />'+
          '</br> <b>Secteur:</b>' + ListIncident[i].secteur.secteur +
          '</br> <b>Type: </b>' + ListIncident[i].type.type 
          
        );
        markers.push(marker);
      }
      
      if (ListIncident[i].statut.id ==2) {
        const marker = L.marker([ListIncident[i].latitude, ListIncident[i].longitude], {icon: yellowIcon} ).addTo(this.map);
        marker.bindPopup('<img src="' + ListIncident[i].photo  + '" ' + 'style=" width: 150px;' + ' height: 150px;"  />'+
          '</br> <b>Secteur:</b>' + ListIncident[i].secteur.secteur +
          '</br> <b>Type: </b>' + ListIncident[i].type.type 
          
        );
        markers.push(marker);
      } 

      if (ListIncident[i].statut.id ==3 ) {
        const marker = L.marker([ListIncident[i].latitude, ListIncident[i].longitude], {icon: greenIcon} ).addTo(this.map);
        marker.bindPopup('<img src="' + ListIncident[i].photo  + '" ' + 'style=" width: 150px;' + ' height: 150px;"  />'+
          '</br> <b>Secteur:</b>' + ListIncident[i].secteur.secteur +
          '</br> <b>Type: </b>' + ListIncident[i].type.type 
          
        );
        markers.push(marker);
      } 

      if (ListIncident[i].statut.id ==4) {
        const marker = L.marker([ListIncident[i].latitude, ListIncident[i].longitude], {icon: orangeIcon} ).addTo(this.map);
        marker.bindPopup('<img src="' + ListIncident[i].photo  + '" ' + 'style=" width: 150px;' + ' height: 150px;"  />'+
          '</br> <b>Secteur:</b>' + ListIncident[i].secteur.secteur +
          '</br> <b>Type: </b>' + ListIncident[i].type.type 
          
        );
        markers.push(marker);
      } 

      if (ListIncident[i].statut.id ==5) {
        const marker = L.marker([ListIncident[i].latitude, ListIncident[i].longitude], {icon: greyIcon} ).addTo(this.map);
        marker.bindPopup('<img src="' + ListIncident[i].photo  + '" ' + 'style=" width: 150px;' + ' height: 150px;"  />'+
          '</br> <b>Secteur:</b>' + ListIncident[i].secteur.secteur +
          '</br> <b>Type: </b>' + ListIncident[i].type.type 
          
        );
        markers.push(marker);
      } 

      if (ListIncident[i].statut.id ==6) {
        const marker = L.marker([ListIncident[i].latitude, ListIncident[i].longitude], {icon: blueIcon} ).addTo(this.map);
        marker.bindPopup('<img src="' + ListIncident[i].photo  + '" ' + 'style=" width: 150px;' + ' height: 150px;"  />'+
          '</br> <b>Secteur:</b>' + ListIncident[i].secteur.secteur +
          '</br> <b>Type: </b>' + ListIncident[i].type.type 
          
        );
        markers.push(marker);
      } 

      if (ListIncident[i].statut.id ==7) {
        const marker = L.marker([ListIncident[i].latitude, ListIncident[i].longitude], {icon: greyIcon} ).addTo(this.map);
        marker.bindPopup('<img src="' + ListIncident[i].photo  + '" ' + 'style=" width: 150px;' + ' height: 150px;"  />'+
          '</br> <b>Secteur:</b>' + ListIncident[i].secteur.secteur +
          '</br> <b>Type: </b>' + ListIncident[i].type.type 
          
        );
        markers.push(marker);
      } 

    }

  }
  deleteMarker() {
    for (let i = 0; i < markers.length; i++) {
      this.map.removeLayer(markers[i]);
    }

  }
  isShow = false; 
 
  toggleDisplay() {
    this.isShow = !this.isShow;
    this.map.setView([31.1728205, -7.3362482], 6);}

    toggleDisplay3(){
      this.isShow = !this.isShow;
    }




  submit() {
    if (this.StatutChoisi == this.statut[0]) {
        this.IncidentChoisi.statut = new Statut();
        this.IncidentChoisi.statut.id = 3;
        this.IncidentChoisi.statut.etat = this.statut[0];
        this.IncidentChoisi.user = this.userChoisi;
        this.isShow = !this.isShow;
        //this.modalRef.hide();
         this.incidentService.updateIncident(this.IncidentChoisi).subscribe(
           data=>{
             console.log(data);

           }
         )
      }
      else{
        this.IncidentChoisi.statut = new Statut();
        this.IncidentChoisi.statut.id = 5;
        this.IncidentChoisi.statut.etat = this.statut[1];
        this.IncidentChoisi.motif = this.motifChoisi;
        this.isShow = !this.isShow;
        //this.modalRef.hide();
        this.incidentService.updateIncident(this.IncidentChoisi).subscribe(
          data=>{
            console.log(data);


          }
        )

      }
    this.StatutChoisi=null;
    //this.modalRef.hide();
  }

}
