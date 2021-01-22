import { Component, OnInit, ViewChild } from '@angular/core';
import { IncidentService } from '../services/Incident.service';
import { SecteurService } from '../services/Secteur.service';
import { TypeService } from '../services/Type.service';
import { ProvinceService } from '../services/Province.service';
import {LIST_STATUTS} from '../Util/constantes';
import { Incident } from '../entities/Incidents';
import { HttpClient } from '@angular/common/http';
import { CustomFilter } from '../entities/CustomFilter';
import { Secteur } from '../entities/Secteur';
import { Province } from '../entities/Province';
import { Type } from '../entities/Type';
import { icon } from 'leaflet';
import { MatPaginator } from '@angular/material';
import { Statut } from '../entities/Statut';
import { Router } from '@angular/router';

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
  selector: 'app-incident',
  templateUrl: './incident.component.html',
  styleUrls: ['./incident.component.scss']
})
export class IncidentComponent implements OnInit {
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
  listIncident21: any;
  selectedProvinceId: any;
  selectedType: any;
  selectedSecteur: any;
  selectedStatut: any;
  selectedSecteur2:any;
  div1:boolean=true;
  page:number = 0;
  size:number = 5;
  incidents:Array<any>;
  pages:Array<number>;
  @ViewChild(MatPaginator, {static: false}) paginator: MatPaginator;
  Incident1: any;

  constructor(private httpClient: HttpClient,
              private Secteurservice: SecteurService,
              private Typeservice: TypeService,
              private provinceService: ProvinceService,
              private incidentService: IncidentService,
              private router: Router) {

    

    this.Incident = new Incident();
    this.CustumFilter = new CustomFilter();
    this.CustumFilter.secteur = new Secteur();
    this.CustumFilter.province = new Province();
    this.CustumFilter.statut = new Statut();
    this.CustumFilter.type = new Type();
    this.getProvince();
    this.getSecteur();
   // this.getIncident();

  }

  setPage(event:any){
    console.log('hahiya');
    console.log(event);
    console.log('ha ana');
    this.page = event.pageIndex;
    this.size = event.pageSize;
    this.getpage();
  }

  ngOnInit() {
   

    

    this.incidentService.findAllIncident().subscribe(
      data => {
        this.listIncident21 = data;
        console.log(this.listIncident21);
        console.log(this.listIncident21.length);
       this.marker(this.listIncident21);
      });
   this.getpage();
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
  getSecteur() {
    this.Secteurservice.findAllSecteur().subscribe(
      data => {this.ListSecteur = data;
      }
    );
  }
  getType(id) {
    this.Typeservice.findTypeBySecteur(id).subscribe(
      data => {
        this.ListType = data;

      }
    );
  }
  getProvince() {
    this.provinceService.findAll().subscribe(
      data => {
        this.ListProvince = data;

      }
    );

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
  isShow1 = false;
  isShow2 = false;
 
  toggleDisplay() {
    this.isShow = !this.isShow;
    this.isShow2 = false;
    this.map.setView([31.1728205, -7.3362482], 6);}
  
  // getIncident() {
  //   this.incidentService.findAllIncident().subscribe(
  //     data => {
  //       this.data = data;
  //       this.Incident = this.data;
  //       console.log( this.Incident);
  //       this.ListIncident = this.data;
  //       this.listIncident2 = this.data;
  //      // console.log('getIncident', this.ListIncident);
  //       this.marker(this.ListIncident);
       

  //     }
  //   );
  // } 

  getpage(){
    this.incidentService.incidentsPageable(this.page, this.size).subscribe(
      data => {
        //console.log(data);
        this.data = data;
        this.ListIncident = data['content'];
        this.listIncident2 = data['content'];
        this.pages = new Array(data['totalPages']);
       // this.marker(this.ListIncident);
      },
      (error) => {
        console.log(error.error.message);
      }
    );
  }



  do4(evt) {
    this.CustumFilter.statut.etat = LIST_STATUTS[evt.target.value];
    if(LIST_STATUTS[evt.target.value]=="validé")
            this.idStatutChoisi = 3;
    if(LIST_STATUTS[evt.target.value]=="en cours de traitement")
            this.idStatutChoisi = 2;
    if(LIST_STATUTS[evt.target.value]=="Traité")
            this.idStatutChoisi = 7;
    if(LIST_STATUTS[evt.target.value]=="Bloqué")
            this.idStatutChoisi = 1;
    if(LIST_STATUTS[evt.target.value]=="redirigé")
            this.idStatutChoisi = 4;
    if(LIST_STATUTS[evt.target.value]=="declaré")
            this.idStatutChoisi = 6;
    if(LIST_STATUTS[evt.target.value]=="rejeté")
            this.idStatutChoisi = 5;
    console.log(this.idStatutChoisi);
    this.CustumFilter.statut.id = this.idStatutChoisi;
  }
  do2(evt) {
    this.Secteurservice.findSecteurById(evt.target.value).subscribe( data => {
      this.idSecteurChoisi = evt.target.value;
      this.data = data;
      this.CustumFilter.secteur.id = this.data.id;
      this.CustumFilter.secteur.secteur = this.data.secteur;
      console.log(this.CustumFilter.secteur.secteur);
      this.getType(this.CustumFilter.secteur.id);

    });
  }
  do3(evt) {
    this.Typeservice.findTypeById(evt.target.value).subscribe( data => {
      this.idTyprChoisi = evt.target.value;
      this.data = data;
      this.CustumFilter.type.id = this.data.id;
      this.CustumFilter.type.type = this.data.type;
      console.log(this.CustumFilter.type);
      console.log(this.CustumFilter.type.type);

    });
  }
  do1(evt) {
    console.log(evt);
    this.provinceService.findprovinceById(evt.target.value).subscribe(data => {
      console.log(evt.target.value);
      this.data = data;
      this.idProvinceChoisi = evt.target.value;
      this.CustumFilter.province.id = this.data.id;
      this.CustumFilter.province.province = this.data.province;
      console.log(this.CustumFilter.province.province);
    });


  }

  oneIncident(item){
    console.log(item);
    console.log(item.latitude);
    this.Incident1=item;
    console.log(this.Incident1);
    this.isShow = !this.isShow;
    this.isShow2 = !this.isShow2;
    this.map.setView([item.latitude, item.longitude], 14);
  }

  FiltreIncident() {
    this.isShow1 = !this.isShow1;
    console.log(this.idTyprChoisi, this.idSecteurChoisi, this.idProvinceChoisi, this.idStatutChoisi);
    if (this.idTyprChoisi != undefined && this.idSecteurChoisi != undefined && this.idProvinceChoisi != undefined && this.idStatutChoisi != undefined) {
      this.deleteMarker();
      this.incidentService.findByQuery(this.CustumFilter).subscribe(
        (data) => {
          console.log(data);
          this.data = data;
          this.ListIncident = this.data;
          this.marker(this.ListIncident);
          console.log(this.marker(this.ListIncident));
        }
      );
    } else {
      if (this.idTyprChoisi != undefined && this.idProvinceChoisi == undefined && this.idSecteurChoisi == undefined && this.idStatutChoisi == undefined ) {
        this.deleteMarker();
        this.incidentService.findByByType(this.idTyprChoisi).subscribe(
          data => {
            this.data = data;
            this.ListIncident = this.data;
            console.log('qq', this.ListIncident);
            this.marker(this.ListIncident);
          }
        );
      }
      if (this.idSecteurChoisi != undefined && this.idTyprChoisi == undefined && this.idProvinceChoisi == undefined && this.idStatutChoisi == undefined) {
        this.deleteMarker();
        this.incidentService.findByBySecteur(this.idSecteurChoisi).subscribe(
          data => {
            this.data = data;
            this.ListIncident = this.data;
            console.log(this.ListIncident);
            this.marker(this.listIncident2);
          }
        );
      }

      if (this.idProvinceChoisi != undefined && this.idTyprChoisi == undefined && this.idSecteurChoisi == undefined && this.idStatutChoisi == undefined) {
        this.deleteMarker();
        this.incidentService.findByProvince(this.idProvinceChoisi).subscribe(
          data => {
            this.data = data;
            this.ListIncident = this.data;
            console.log(this.ListIncident);
            this.marker(this.ListIncident);
          }
        );
      }
      if (this.idStatutChoisi != undefined && this.idTyprChoisi == undefined && this.idSecteurChoisi == undefined && this.idProvinceChoisi == undefined ) {
        this.deleteMarker();
        this.incidentService.findByByStatut(this.idStatutChoisi).subscribe(
          data => {
            this.data = data;
            this.ListIncident = this.data;
            console.log(this.ListIncident);
            this.marker(this.ListIncident);
          }
        );
      }
      if (this.idSecteurChoisi != undefined && this.idProvinceChoisi != undefined  && this.idTyprChoisi == undefined  && this.idStatutChoisi == undefined) {
        this.deleteMarker();
        this.incidentService.findByProvinceSecteur(this.CustumFilter).subscribe(
          data => {
            this.data = data;
            this.ListIncident = this.data;
            console.log('oui', this.ListIncident);
            this.marker(this.ListIncident);
          }
        );
      }

      if (this.idSecteurChoisi != undefined && this.idTyprChoisi != undefined && this.idProvinceChoisi == undefined  && this.idStatutChoisi == undefined) {
        this.deleteMarker();
        this.incidentService.findBySecteurType(this.CustumFilter).subscribe(
          data => {
            this.data = data;
            this.ListIncident = this.data;
            console.log('oui', this.ListIncident);
            this.marker(this.ListIncident);
          }
        );
      }
      if ( this.idProvinceChoisi != undefined && this.idTyprChoisi != undefined && this.idSecteurChoisi == undefined && this.idStatutChoisi == undefined ) {
        this.deleteMarker();
        this.incidentService.findByProvinceType(this.CustumFilter).subscribe(
          data => {
            this.data = data;
            this.ListIncident = this.data;
            console.log('oui', this.ListIncident);
            this.marker(this.ListIncident);
          }
        );
      }

      if ( this.idProvinceChoisi != undefined && this.idTyprChoisi != undefined && this.idSecteurChoisi != undefined && this.idStatutChoisi == undefined ) {
        this.deleteMarker();
        this.incidentService.findByProvSecteurTye(this.CustumFilter).subscribe(
          data => {
            this.data = data;
            this.ListIncident = this.data;

            console.log('oui', this.ListIncident);
            this.marker(this.ListIncident);
          }
        );
      }

      if ( this.idProvinceChoisi == undefined && this.idTyprChoisi != undefined && this.idSecteurChoisi != undefined && this.idStatutChoisi != undefined ) {
        this.deleteMarker();
        this.incidentService.findByStatutSecteurType(this.CustumFilter).subscribe(
          data => {
            this.data = data;
            this.ListIncident = this.data;

            console.log('oui', this.ListIncident);
            this.marker(this.ListIncident);
          }
        );
      }

      if ( this.idProvinceChoisi != undefined &&  this.idStatutChoisi != undefined && this.idSecteurChoisi == undefined  && this.idTyprChoisi == undefined ) {
        this.deleteMarker();
        this.incidentService.findByStatutProvince(this.CustumFilter).subscribe(
          data => {
            this.data = data;
            this.ListIncident = this.data;
            console.log('oui', this.ListIncident);
            this.marker(this.ListIncident);
          }
        );
      }
      if (  this.idSecteurChoisi != undefined  &&  this.idStatutChoisi != undefined  && this.idTyprChoisi == undefined && this.idProvinceChoisi == undefined) {
        this.deleteMarker();
        this.incidentService.findByStatutSecteur(this.CustumFilter).subscribe(
          data => {
            this.data = data;
            this.ListIncident = this.data;

            console.log('oui', this.ListIncident);
            this.marker(this.ListIncident);
          }
        );
      }
      if (  this.idTyprChoisi != undefined &&  this.idStatutChoisi != undefined && this.idSecteurChoisi == undefined && this.idProvinceChoisi == undefined) {
        this.deleteMarker();
        this.incidentService.findByStatutType(this.CustumFilter).subscribe(
          data => {
            this.data = data;
            this.ListIncident = this.data;

            console.log('oui', this.ListIncident);
            this.marker(this.ListIncident);
          }
        );
      }






    }






  }
  AnnulerFiltreIncident() {
    this.isShow1 = !this.isShow1;
    this.selectedProvinceId = null;
    this.selectedType = null;
    this.selectedSecteur = null;
    this.selectedStatut = null;
    this.idTyprChoisi = undefined ;
    this.idSecteurChoisi = undefined ;
    this.idProvinceChoisi = undefined ;
    this.idStatutChoisi = undefined;
    this.ListIncident = this.listIncident2;
    this.deleteMarker();
    this.marker(this.listIncident21);
    this.CustumFilter.secteur = undefined;
    // this.router.navigateByUrl('/incident');
    


  }


}











