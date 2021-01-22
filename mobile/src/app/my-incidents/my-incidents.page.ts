import { Component, OnInit } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {SecteurService} from '../services/secteur.service';
import {TypeService} from '../services/type.service';
import {Incident} from '../entites/Incident';
import {ProvinceService} from '../services/province.service';
import {CustomFilter} from '../entites/CustumFilter';
import {Secteur} from '../entites/Secteur';
import {Province} from '../entites/Province';
import {Type} from '../entites/Type';
import {Statut} from '../entites/Statut';
import {LIST_SECTEUR} from '../utils/constants';
import {IncidentService} from '../services/Incident.service';
import {Map} from 'leaflet';
import {Camera} from '@ionic-native/camera/ngx';
import {ModalController} from '@ionic/angular';
import {ModalpopupPage} from '../modalpopup/modalpopup.page';
import {ModifymodalPage} from '../modifymodal/modifymodal.page';
import {NgForm} from '@angular/forms';
import {Device} from '@ionic-native/device/ngx';
declare  let L;
@Component({
  selector: 'app-my-incidents',
  templateUrl: './my-incidents.page.html',
  styleUrls: ['./my-incidents.page.scss'],
})
export class MyIncidentsPage implements OnInit {
    map: Map;
  Incident: Incident;
  ListSecteur: any;
  ListType: any;
  data: any;
  ListProvince: any;
  CustumFilter: any;
  ListIncident: any;
  idProvinceChoisi: any;
  selectedProvinceId: any = '';
  idStatutChoisi: number;
  idSecteurChoisi: any;
  idTyprChoisi: any;
    selectedValue: any;
    resetForm: any;
    selectedProvince: any;
    selectedSecteur1: any;
    SelectedType1: any;
    SelectedStatut1: any;
    Myime =  this.device.uuid;
  constructor(private httpClient: HttpClient,
              private Secteurservice: SecteurService,
              // tslint:disable-next-line:no-shadowed-variable
              private Typeservice: TypeService,
              private provinceService: ProvinceService,
              private incidentService: IncidentService,
              private camera: Camera,
              private modalController: ModalController, private device: Device) {

    this.Incident = new Incident();
    this.CustumFilter = new CustomFilter();
    this.CustumFilter.secteur = new Secteur();
    this.CustumFilter.province = new Province();
    this.CustumFilter.type = new Type();
    this.CustumFilter.statut = new Statut();
    this.getSecteur();

    this.getProvince();
    
    console.log(this.selectedProvinceId);
    console.log('Device UUID is: ' + this.device.uuid);
  }
  ionViewWillEnter() {
    //window.location.reload();
    this.getIncident();
    }
  ngOnInit() {
      console.log(this.selectedProvinceId);
  }
    async OpenModal(item) {
        console.log(item.id);
        const modal = await this.modalController.create({
            component: ModalpopupPage,
            componentProps: {
                id: item.id
            }
        });
        return await modal.present();
    }
    async ModifyModal(item) {
        console.log(item.id);
        const modal = await this.modalController.create({
            component: ModifymodalPage,
            componentProps: {
                id: item.id
            }
        });
        return await modal.present();
    }
  getSecteur() {
    this.Secteurservice.findAllSecteur().subscribe(
        data => {this.ListSecteur = data;
        }
    );
  }
  getType() {
      console.log(this.CustumFilter.secteur.id);
      this.Typeservice.findTypeBySecteur(this.CustumFilter.secteur.id).subscribe(
        data => {
          this.ListType = data;

        }
    );
  }
  getProvince() {
    this.provinceService.findAll().subscribe(
        data => {
          this.ListProvince = data;
          console.log(data);

        }
    );

  }

 getIncident() {
    this.incidentService.findByIme(this.Myime).subscribe(
        data => {
          this.data = data;
          this.Incident = this.data;
          console.log("here");
          console.log( "dezda" + this.Incident);
          this.ListIncident = this.data;
          var ReverseArray = [];
          var length = this.ListIncident.length;
          for(var i = length-1;i>=0;i--){
              ReverseArray.push(this.ListIncident[i]);
          }
          this.ListIncident = ReverseArray;
          console.log('ReversergetIncident', this.ListIncident);
          this.incidentService.listIncidents.next(this.ListIncident);
        }
    );
  }


  do1(evt) {
     console.log(evt);

     this.provinceService.findprovinceById(evt.target.value).subscribe(data => {
             console.log(evt.target.value);
             this.data = data;
             this.idProvinceChoisi = evt.target.value;
             this.CustumFilter.province.id = this.data.id;
             this.CustumFilter.province.province = this.data.province;
         });




  }
  do2(evt) {
    this.Secteurservice.findSecteurById(evt.target.value).subscribe( data => {
      this.idSecteurChoisi = evt.target.value;
      this.data = data;
      this.CustumFilter.secteur.id = this.data.id;
      this.CustumFilter.secteur.secteur = this.data.secteur;
      this.getType();


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
  do4(evt) {
    this.CustumFilter.statut.id = this.idStatutChoisi;
    //this.idStatutChoisi = LIST_SECTEUR[evt.target.value];
  }
  setStatut(s){
      console.log(s);

  }
  FiltreIncident() {
    
    console.log(this.idTyprChoisi, this.idSecteurChoisi, this.idProvinceChoisi, this.idStatutChoisi);
    if (this.idTyprChoisi != undefined && this.idSecteurChoisi != undefined && this.idProvinceChoisi != undefined  &&  this.idStatutChoisi != undefined) {
        this.incidentService.findByQuery(this.CustumFilter).subscribe(
            (data) => {
                console.log(data);
                this.data = data;
                this.ListIncident = this.data;
                var ReverseArray = [];
                var length = this.ListIncident.length;
                for(var i = length-1;i>=0;i--){
                    ReverseArray.push(this.ListIncident[i]);
                }
                this.ListIncident = ReverseArray;
                this.incidentService.listIncidents.next(this.ListIncident);
            }
        );
    } else {
        if (this.idTyprChoisi != undefined && this.idProvinceChoisi == undefined && this.idSecteurChoisi == undefined && this.idStatutChoisi == undefined ) {
            this.incidentService.findByByType(this.idTyprChoisi).subscribe(
                data => {
                    this.data = data;
                    this.ListIncident = this.data;
                    var ReverseArray = [];
                    var length = this.ListIncident.length;
                    for(var i = length-1;i>=0;i--){
                        ReverseArray.push(this.ListIncident[i]);
                    }
                    this.ListIncident = ReverseArray;
                    this.incidentService.listIncidents.next(this.ListIncident);
                    
                }
            );
        }
        if (this.idSecteurChoisi != undefined && this.idTyprChoisi == undefined && this.idProvinceChoisi == undefined && this.idStatutChoisi == undefined) {
            this.incidentService.findByBySecteur(this.idSecteurChoisi).subscribe(
                data => {
                    this.data = data;
                    this.ListIncident = this.data;
                    var ReverseArray = [];
                    var length = this.ListIncident.length;
                    for(var i = length-1;i>=0;i--){
                        ReverseArray.push(this.ListIncident[i]);
                    }
                    this.ListIncident = ReverseArray;
                    this.incidentService.listIncidents.next(this.ListIncident);
                    
                }
            );
        }

        if (this.idProvinceChoisi != undefined && this.idTyprChoisi == undefined && this.idSecteurChoisi == undefined && this.idStatutChoisi == undefined) {
            this.incidentService.findByProvince(this.idProvinceChoisi).subscribe(
                data => {
                    this.data = data;
                    console.log(data);
                    this.ListIncident = this.data;
                    var ReverseArray = [];
                    var length = this.ListIncident.length;
                    for(var i = length-1;i>=0;i--){
                        ReverseArray.push(this.ListIncident[i]);
                    }
                    this.ListIncident = ReverseArray;
                    this.incidentService.listIncidents.next(this.ListIncident);
                    
                    console.log(this.ListIncident);
                }
            );
        }
        if (this.idStatutChoisi != undefined && this.idTyprChoisi == undefined && this.idSecteurChoisi == undefined && this.idProvinceChoisi == undefined ) {
            console.log(this.idStatutChoisi);
            this.incidentService.findByStatut(this.idStatutChoisi).subscribe(
                data => {
                    this.data = data;
                    this.ListIncident = this.data;
                    var ReverseArray = [];
                    var length = this.ListIncident.length;
                    for(var i = length-1;i>=0;i--){
                        ReverseArray.push(this.ListIncident[i]);
                    }
                    this.ListIncident = ReverseArray;
                   
                    this.incidentService.listIncidents.next(this.ListIncident);

                }
            );
        }
        if (this.idSecteurChoisi != undefined && this.idProvinceChoisi != undefined  && this.idTyprChoisi == undefined  && this.idStatutChoisi == undefined) {
            this.incidentService.findByProvinceSecteur(this.CustumFilter).subscribe(
                data => {
                    this.data = data;
                    this.ListIncident = this.data;
                    var ReverseArray = [];
                    var length = this.ListIncident.length;
                    for(var i = length-1;i>=0;i--){
                        ReverseArray.push(this.ListIncident[i]);
                    }
                    this.ListIncident = ReverseArray;
                    
                    this.incidentService.listIncidents.next(this.ListIncident);

                }
            );
        }

        if (this.idSecteurChoisi != undefined && this.idTyprChoisi != undefined && this.idProvinceChoisi == undefined  && this.idStatutChoisi == undefined) {
            this.incidentService.findBySecteurType(this.CustumFilter).subscribe(
                data => {
                    this.data = data;
                    this.ListIncident = this.data;
                    var ReverseArray = [];
                    var length = this.ListIncident.length;
                    for(var i = length-1;i>=0;i--){
                        ReverseArray.push(this.ListIncident[i]);
                    }
                    this.ListIncident = ReverseArray;
                    
                    this.incidentService.listIncidents.next(this.ListIncident);

                }
            );
        }
        if ( this.idProvinceChoisi != undefined && this.idTyprChoisi != undefined && this.idSecteurChoisi == undefined && this.idStatutChoisi == undefined ) {
            this.incidentService.findByProvinceType(this.CustumFilter).subscribe(
                data => {
                    this.data = data;
                    this.ListIncident = this.data;
                    var ReverseArray = [];
                    var length = this.ListIncident.length;
                    for(var i = length-1;i>=0;i--){
                        ReverseArray.push(this.ListIncident[i]);
                    }
                    this.ListIncident = ReverseArray;
                   
                    this.incidentService.listIncidents.next(this.ListIncident);
                    console.log('oui', this.ListIncident);
                }
            );
        }

        if ( this.idProvinceChoisi != undefined && this.idTyprChoisi != undefined && this.idSecteurChoisi != undefined && this.idStatutChoisi == undefined ) {
            this.incidentService.findByProvSecteurTye(this.CustumFilter).subscribe(
                data => {
                    this.data = data;
                    this.ListIncident = this.data;
                    var ReverseArray = [];
                    var length = this.ListIncident.length;
                    for(var i = length-1;i>=0;i--){
                        ReverseArray.push(this.ListIncident[i]);
                    }
                    this.ListIncident = ReverseArray;
                    this.incidentService.listIncidents.next(this.ListIncident);
                    
                    console.log('oui', this.ListIncident);
                }
            );
        }

        if ( this.idProvinceChoisi != undefined &&  this.idStatutChoisi != undefined && this.idSecteurChoisi == undefined  && this.idTyprChoisi == undefined ) {
            this.incidentService.findByStatutProvince(this.CustumFilter).subscribe(
                data => {
                    this.data = data;
                    this.ListIncident = this.data;
                    var ReverseArray = [];
                    var length = this.ListIncident.length;
                    for(var i = length-1;i>=0;i--){
                        ReverseArray.push(this.ListIncident[i]);
                    }
                    this.ListIncident = ReverseArray;
                    this.incidentService.listIncidents.next(this.ListIncident);
                    
                    console.log('oui', this.ListIncident);
                }
            );
        }
        if (  this.idSecteurChoisi != undefined  &&  this.idStatutChoisi != undefined  && this.idTyprChoisi == undefined && this.idProvinceChoisi == undefined) {
            this.incidentService.findByStatutSecteur(this.CustumFilter).subscribe(
                data => {
                    this.data = data;
                    this.ListIncident = this.data;
                    var ReverseArray = [];
                    var length = this.ListIncident.length;
                    for(var i = length-1;i>=0;i--){
                        ReverseArray.push(this.ListIncident[i]);
                    }
                    this.ListIncident = ReverseArray;
                    this.incidentService.listIncidents.next(this.ListIncident);
                    
                    console.log('oui', this.ListIncident);
                }
            );
        }
        if ( this.idProvinceChoisi == undefined && this.idTyprChoisi != undefined && this.idSecteurChoisi != undefined && this.idStatutChoisi != undefined ) {

            this.incidentService.findByStatutSecteurType(this.CustumFilter).subscribe(
                data => {
                    this.data = data;
                    this.ListIncident = this.data;
                    var ReverseArray = [];
                    var length = this.ListIncident.length;
                    for(var i = length-1;i>=0;i--){
                        ReverseArray.push(this.ListIncident[i]);
                    }
                    this.ListIncident = ReverseArray;
                    this.incidentService.listIncidents.next(this.ListIncident);
                    console.log('oui', this.ListIncident);

                }
            );
        }
        if (  this.idTyprChoisi != undefined &&  this.idStatutChoisi != undefined && this.idSecteurChoisi == undefined && this.idProvinceChoisi == undefined) {
            this.incidentService.findByStatutType(this.CustumFilter).subscribe(
                data => {
                    this.data = data;
                    this.ListIncident = this.data;
                    var ReverseArray = [];
                    var length = this.ListIncident.length;
                    for(var i = length-1;i>=0;i--){
                        ReverseArray.push(this.ListIncident[i]);
                    }
                    this.ListIncident = ReverseArray;
                    this.incidentService.listIncidents.next(this.ListIncident);
                    console.log('oui', this.ListIncident);
                    
                }
            );
        }






    }

     /* if(this.idSecteurChoisi!= undefined) {
          this.incidentService.findByByStatut(this.idProvinceChoisi).subscribe(
              data => {
                  this.data = data;
                  this.ListIncident = this.data;
                  console.log(this.ListIncident);
              }
          )
      }*/



  }
    AnnulerFiltreIncident() {

       // document.getElementById('secteur').selectedIndex = 0;
        this.idTyprChoisi = undefined ;
        this.idSecteurChoisi = undefined ;
        this.idProvinceChoisi = undefined ;
        this.idStatutChoisi = undefined;
        this.ListIncident = this.Incident;
        var ReverseArray = [];
        var length = this.ListIncident.length;
        for(var i = length-1;i>=0;i--){
            ReverseArray.push(this.ListIncident[i]);
        }
        this.ListIncident = ReverseArray;
        this.incidentService.listIncidents.next(this.ListIncident);
        this.selectedProvinceId = '';
        this.selectedProvince = '';
        this.selectedSecteur1 = '';
        this.SelectedType1 = '';
        this.SelectedStatut1 = '';

    }



}
