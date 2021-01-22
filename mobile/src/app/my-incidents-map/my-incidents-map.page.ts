
import { Component, OnInit } from '@angular/core';
import {  marker } from 'leaflet';
import {IncidentService} from '../services/Incident.service';
import { Map, latLng, tileLayer, Layer } from 'leaflet';
import {Device} from '@ionic-native/device/ngx';
declare  let L;
declare var require: any;
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
    iconRetinaUrl: require('leaflet/dist/images/marker-icon-2x.png'),
    iconUrl: require('leaflet/dist/images/marker-icon.png'),
    shadowUrl: require('leaflet/dist/images/marker-shadow.png')
});
@Component({
  selector: 'app-my-incidents-map',
  templateUrl: './my-incidents-map.page.html',
  styleUrls: ['./my-incidents-map.page.scss'],
})
export class MyIncidentsMapPage implements OnInit {
    map: Map;
    ListIncident: any;
    data: any;
    
    constructor(
        private incidentService: IncidentService,private device: Device
    ) {

        
    }
    ionViewDidEnter() { this.leafletMap(); }
    // todo: update list incident in this composante using this function to update its value in the incident service
    updateListIncidents(nextValue) {
        this.ListIncident = nextValue;
        this.incidentService.listIncidents.next(nextValue);
    }

    ngOnInit() {

//        console.log(this.incidentService.listIncidents)
        this.incidentService.listIncidents.subscribe(
            (value: any) => {
                this.ListIncident = value;
                console.log('map console :', this.ListIncident);
            }
        );
        this.updateListIncidents(this.incidentService.listIncidents.value);
        console.log(this.ListIncident);
    }

    showCurrentValue() {
        console.log(this.ListIncident[46].longitude);
        console.log(this.ListIncident[46].photo);

    }

   leafletMap() {
    var redIcon = L.icon({
        iconUrl: '../../assets/images/red_marker.png',
        iconAnchor:   [10, 41],
        iconSize:     [25, 41], // size of the icon    
    });
    var blueIcon = L.icon({
        iconUrl: '../../assets/images/blue_marker.png',
        iconAnchor:   [10, 41],
        iconSize:     [25, 41], // size of the icon    
    });
    var greenIcon = L.icon({
        iconUrl: '../../assets/images/green_marker.png',
        iconAnchor:   [10, 41],
        iconSize:     [25, 41], // size of the icon    
    });
    var yellowIcon = L.icon({
        iconUrl: '../../assets/images/yellow_marker.png',
        iconAnchor:   [10, 41],
        iconSize:     [25, 41], // size of the icon    
    });
    var orangeIcon = L.icon({
        iconUrl: '../../assets/images/orange_marker.png',
        iconAnchor:   [10, 41],
        iconSize:     [25, 41], // size of the icon    
    });

    var greyIcon = L.icon({
        iconUrl: '../../assets/images/grey_marker.png',
        iconAnchor:   [10, 41],
        iconSize:     [25, 41], // size of the icon    
    });
    var cornblueIcon = L.icon({
        iconUrl: '../../assets/images/cornflowblue_marker.png',
        iconAnchor:   [10, 41],
        iconSize:     [25, 41], // size of the icon    
    });

        // In setView add latLng and zoom
       //this.map = new Map('mapId').setView([ 31.1728205, -7.3362482], 5);

       var layer1 = L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/World_Street_Map/MapServer/tile/{z}/{y}/{x}', {
           //
           attribution: 'edupala.com © ionic LeafLet',
       })
       var layer2 = L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}', {
        attribution: 'satellite'})

       this.map = L.map('mapId', {
        center: [31.1728205, -7.3362482],
        zoom: 5,
        layers: [layer1,layer2]
         });
         var baseMaps = {
            "fond street map": layer1,
            "Fond Satelittaire": layer2
        };
        
      
         L.control.layers(baseMaps).addTo(this.map);

       for (let i = 0; i < this.ListIncident.length; i++) {
           console.log(this.ListIncident[i].longitude);
           // .circle([this.ListPoi[i].latitude, this.ListPoi[i].longitude], {radius: 500}).addTo(this.map);
           var marker;
           console.log("statut est  : " + this.ListIncident[i].statut.id );

           if(this.ListIncident[i].statut.id==1 && this.ListIncident[i].ime == this.device.uuid){marker = L.marker([this.ListIncident[i].latitude, this.ListIncident[i].longitude], {icon: redIcon}).addTo(this.map);            marker.bindPopup('</br> <img src="' + this.ListIncident[i].photo  + '" ' + 'style=" display: block;margin-left: auto;margin-right: auto; width: 180px;' + ' height: 150px;border-radius:3%"  />'+
           '</br><b style="color:#5ccca7">Secteur : </b>' + this.ListIncident[i].secteur.secteur +
          '</br> <b style="color:#5ccca7">Type : </b>' + this.ListIncident[i].type.type +
          '</br> <b style="color:#5ccca7">Statut : </b>' + this.ListIncident[i].statut.etat
      );}
           if(this.ListIncident[i].statut.id==2  && this.ListIncident[i].ime ==this.device.uuid){marker = L.marker([this.ListIncident[i].latitude, this.ListIncident[i].longitude], {icon: yellowIcon}).addTo(this.map);            marker.bindPopup('</br> <img src="' + this.ListIncident[i].photo  + '" ' + 'style=" display: block;margin-left: auto;margin-right: auto; width: 180px;' + ' height: 150px;border-radius:3%"  />'+
           '</br><b style="color:#5ccca7">Secteur : </b>' + this.ListIncident[i].secteur.secteur +
          '</br> <b style="color:#5ccca7">Type : </b>' + this.ListIncident[i].type.type +
          '</br> <b style="color:#5ccca7">Statut : </b>' + this.ListIncident[i].statut.etat
      );}
           if(this.ListIncident[i].statut.id==3  && this.ListIncident[i].ime == this.device.uuid ){marker = L.marker([this.ListIncident[i].latitude, this.ListIncident[i].longitude], {icon: greenIcon}).addTo(this.map);            marker.bindPopup('</br> <img src="' + this.ListIncident[i].photo  + '" ' + 'style=" display: block;margin-left: auto;margin-right: auto; width: 180px;' + ' height: 150px;border-radius:3%"  />'+
           '</br><b style="color:#5ccca7">Secteur : </b>' + this.ListIncident[i].secteur.secteur +
          '</br> <b style="color:#5ccca7">Type : </b>' + this.ListIncident[i].type.type +
          '</br> <b style="color:#5ccca7">Statut : </b>' + this.ListIncident[i].statut.etat
      );}
           if(this.ListIncident[i].statut.id==4  && this.ListIncident[i].ime ==this.device.uuid ){marker = L.marker([this.ListIncident[i].latitude, this.ListIncident[i].longitude], {icon: orangeIcon}).addTo(this.map);            marker.bindPopup('</br> <img src="' + this.ListIncident[i].photo  + '" ' + 'style=" display: block;margin-left: auto;margin-right: auto; width: 180px;' + ' height: 150px;border-radius:3%"  />'+
           '</br><b style="color:#5ccca7">Secteur : </b>' + this.ListIncident[i].secteur.secteur +
          '</br> <b style="color:#5ccca7">Type : </b>' + this.ListIncident[i].type.type +
          '</br> <b style="color:#5ccca7">Statut : </b>' + this.ListIncident[i].statut.etat
      );}
           if(this.ListIncident[i].statut.id==5  && this.ListIncident[i].ime ==this.device.uuid){ marker = L.marker([this.ListIncident[i].latitude, this.ListIncident[i].longitude], {icon: greyIcon}).addTo(this.map);            marker.bindPopup('</br> <img src="' + this.ListIncident[i].photo  + '" ' + 'style=" display: block;margin-left: auto;margin-right: auto; width: 180px;' + ' height: 150px;border-radius:3%"  />'+
           '</br><b style="color:#5ccca7">Secteur : </b>' + this.ListIncident[i].secteur.secteur +
          '</br> <b style="color:#5ccca7">Type : </b>' + this.ListIncident[i].type.type +
          '</br> <b style="color:#5ccca7">Statut : </b>' + this.ListIncident[i].statut.etat
      );}
           if(this.ListIncident[i].statut.id==6  && this.ListIncident[i].ime ==this.device.uuid){ marker = L.marker([this.ListIncident[i].latitude, this.ListIncident[i].longitude], {icon: blueIcon}).addTo(this.map);            marker.bindPopup('</br> <img src="' + this.ListIncident[i].photo  + '" ' + 'style=" display: block;margin-left: auto;margin-right: auto; width: 180px;' + ' height: 150px;border-radius:3%"  />'+
           '</br><b style="color:#5ccca7">Secteur : </b>' + this.ListIncident[i].secteur.secteur +
          '</br> <b style="color:#5ccca7">Type : </b>' + this.ListIncident[i].type.type +
          '</br> <b style="color:#5ccca7">Statut : </b>' + this.ListIncident[i].statut.etat
      );}
           if(this.ListIncident[i].statut.id==7  && this.ListIncident[i].ime == this.device.uuid ){ marker = L.marker([this.ListIncident[i].latitude, this.ListIncident[i].longitude], {icon: cornblueIcon}).addTo(this.map);            marker.bindPopup('</br> <img src="' + this.ListIncident[i].photo  + '" ' + 'style=" display: block;margin-left: auto;margin-right: auto; width: 180px;' + ' height: 150px;border-radius:3%"  />'+
           '</br><b style="color:#5ccca7">Secteur : </b>' + this.ListIncident[i].secteur.secteur +
          '</br> <b style="color:#5ccca7">Type : </b>' + this.ListIncident[i].type.type +
          '</br> <b style="color:#5ccca7">Statut : </b>' + this.ListIncident[i].statut.etat
      );}

          // marker.bindPopup('longitude:' + this.ListIncident[i].longitude + '</br> latitude:' + this.ListIncident[i].latitude);

       }
       }

    /** Remove map when we have multiple map object */
    ionViewWillLeave() {
        this.map.remove();
    }

}
