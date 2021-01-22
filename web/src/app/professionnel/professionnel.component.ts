import { Component, OnInit, TemplateRef } from '@angular/core';
import { IncidentService } from '../services/Incident.service';
import {BsModalRef, BsModalService} from 'ngx-bootstrap';
import {LIST_STATUTS} from '../Util/constantes';
import {LIST_STATUTS2} from '../Util/constantes';
import {LoginService} from '../services/Login.service';
import {User} from '../entities/User';
import { Statut } from '../entities/Statut';
import { Incident } from '../entities/Incidents';


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
  selector: 'app-professionnel',
  templateUrl: './professionnel.component.html',
  styleUrls: ['./professionnel.component.scss']
})
export class ProfessionnelComponent implements OnInit {
statut: any;
  Incidentslist: any;
  ownIncidents = [];
  stat: any;
  item: any;
  list_statut2 = LIST_STATUTS2;
  modalRef: BsModalRef;
  currentUser: User;
  currentRole: string;
  IdUserChoisi: any;
  user: any;
  Incident: Incident;
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
  Incident1: Incident; 
  SecteurIncident: any;
  selectedincidents:Array<Incident>;
  IncidentChoisi: any;
  pages:Array<number>;
    constructor( private incidentService: IncidentService,
                 private modalService: BsModalService,
                 private loginService: LoginService) {
      this.statut = ['en cours de traitement', 'traité', 'bloqué'];
     
      this.loginService.currentUser.subscribe((newUser) => {
        this.currentRole = newUser ? newUser.role.role : null;
        console.log(this.currentRole);

      });

     }

     openModal(template: TemplateRef<any>, item) {
      this.modalRef = this.modalService.show(template);
      this.item = item;


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
    this.loginService.currentUser.subscribe(newUser => {
      this.currentUser = newUser;
      console.log( this.currentUser);
    });
    this.ownIncidents = [];
    this.incidentService.findUserById(this.currentUser.id).subscribe(data => {
        this.IdUserChoisi = data;
        console.log(this.IdUserChoisi);
        for (let i = 0; i < this.IdUserChoisi.length; i++) {
          console.log(this.IdUserChoisi[i]);
          this.incidentService.findIncidentById(this.IdUserChoisi[i]).subscribe(data => {
              this.ownIncidents.push(data);
              console.log("avant", this.ownIncidents);
              for (let i = 0; i < this.ownIncidents.length; i++) {
              if (this.ownIncidents[i].statut == 'rejeté' || this.ownIncidents[i].statut == 'declare' ) {
                this.ownIncidents = this.ownIncidents.filter(obj => obj != this.ownIncidents[i]);
                console.log('apres',this.ownIncidents);

              }
            }

          });
        }

      });
      



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

      if ( ListIncident[i].statut.id ==3 ) {
        const marker = L.marker([ListIncident[i].latitude, ListIncident[i].longitude], {icon: greenIcon} ).addTo(this.map);
        marker.bindPopup('<img src="' + ListIncident[i].photo  + '" ' + 'style=" width: 150px;' + ' height: 150px;"  />'+
          '</br> <b>Secteur:</b>' + ListIncident[i].secteur.secteur +
          '</br> <b>Type: </b>' + ListIncident[i].type.type 
          
        );
        markers.push(marker);
      } 

      if ( ListIncident[i].statut.id ==4) {
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
  isShow1 = false; 
 
  toggleDisplay() {
    this.isShow = !this.isShow;
    this.map.setView([31.1728205, -7.3362482], 6);}
    toggleDisplay3(){
      this.isShow = !this.isShow;
    }

    edit(item){
      this.incidentService.findAllIncident().subscribe(
             data => {
               this.ListIncident = data;
              });
              this.selectedincidents = [];
              this.isShow = !this.isShow;
              this.map.setView([item.latitude, item.longitude], 14);
              this.Incident1=item;
              console.log(this.Incident1);
              this.selectedincidents.push(this.Incident1);
              this.marker(this.selectedincidents);
              this.IncidentChoisi = item;
             this.SecteurIncident = item.secteur.secteur;
             this.isShow1 = true;
             
  
    }

  changeStatut(e) {
    this.stat = e.target.value;
    console.log(this.stat);

  }

  submit() {
    console.log(this.stat);
    console.log(this.Incident1.statut);
    this.Incident1.statut = new Statut();
    //this.modalRef.hide();
    this.isShow = !this.isShow;
    
    
        
    if(this.stat =="en cours de traitement")
            this.Incident1.statut.id = 2;

    else if(this.stat =="Traité")
            this.Incident1.statut.id = 7;

    else if(this.stat =="Bloqué")
            this.Incident1.statut.id = 1;

    else if(this.stat =="redirigé")
            this.Incident1.statut.id = 4;

    this.Incident1.statut.etat = this.stat;

    this.incidentService.updateIncident(this.Incident1).subscribe(

    );
    console.log(this.Incident1);
  }

}
