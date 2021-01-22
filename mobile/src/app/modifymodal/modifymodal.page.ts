import { Component, OnInit } from '@angular/core';
import {ModalController, NavParams} from '@ionic/angular';
import {SecteurService} from '../services/secteur.service';
import {HttpClient} from '@angular/common/http';
import {API_URL} from '../utils/constants';
import {TypeService} from '../services/type.service';
import {Geolocation} from '@ionic-native/geolocation/ngx';
import {Incident} from '../entites/Incident';
import {Secteur} from '../entites/Secteur';
import {Province} from '../entites/Province';
import {Type} from '../entites/Type';
import {IncidentService} from '../services/Incident.service';
import { Camera, CameraOptions } from '@ionic-native/camera/ngx';
import {AlertController} from '@ionic/angular';
import { Device } from '@ionic-native/device/ngx';
import {ProvinceService} from '../services/province.service';
import {Base64} from '@ionic-native/base64/ngx';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-modalpopup',
  templateUrl: './modifymodal.page.html',
  styleUrls: ['./modifymodal.page.scss'],
})
export class ModifymodalPage implements OnInit {
  private win: any = window;
  Incident: Incident;
  ListSecteur: any;
  ListType: any;
  data: any;
  inci: Incident;
  
    title = 'ImageUploaderFrontEnd';
    
    public selectedFile;
    public event1;
    imgURL: any;
    receivedImageData: any;
    base64Data: any;
    convertedImage: any;
    reader: any;
    selectedSecteur: any;
    listProvince: any;
    ProvinceSelected: any;
    selectedType: any;
    longitude: any;
    latitude: any;
    description: any;
    photo: any;
    variableIteam:any;
    ListeChoisi:any;
  constructor( private base64:Base64,
              private http: HttpClient,
              private Secteurservice: SecteurService,
              // tslint:disable-next-line:no-shadowed-variable
              private Typeservice: TypeService, private Geolocation: Geolocation, private  IncidentService: IncidentService,
              private camera: Camera, private alertCtrl: AlertController,
              private provinceService: ProvinceService,
              
              private device: Device,
              private modalController: ModalController,
              private params: NavParams,
              private incidentService: IncidentService,
              private navController : NavController,
            ) {
    this.variableIteam = params.get('id');
    this. getList();
    this.Incident = new Incident();
    this.Incident.secteur = new Secteur();
    this.Incident.type = new Type();
    this.Incident.province = new Province();
    this.inci = new Incident();
    this.getSecteur();
    
    //this.getProvince();
  }

  ngOnInit() {}

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
      this.provinceService.RetrieveProvince(this.Incident.longitude,this.Incident.latitude).subscribe(
          data => {
              this.Incident.province=<any>data
              
          }
      );
  }
  do(evt) {
   // this.Incident.Type = evt.target.value;
      if (evt.target.value != null) {
    this.Typeservice.findTypeById(evt.target.value).subscribe(
        data => {
          this.data = data;
          this.Incident.type.id = this.data.id ;
          this.Incident.type.type = this.data.type;
        }
    );
      }


  }
  do2(evt) {
      if (evt.target.value != null) {
          this.Secteurservice.findSecteurById(evt.target.value).subscribe( data => {
              this.data = data;
              this.Incident.secteur.id = this.data.id ;
              this.Incident.secteur.secteur = this.data.secteur;
              this.getType( this.Incident.secteur.id );

          });
      }

  }
    do4(evt) {
        if (evt.target.value != null) {
            this.provinceService.findprovinceById(evt.target.value).subscribe(data => {
                this.data = data;
                this.Incident.province.id = this.data.id;
                this.Incident.province.province = this.data.secteur;

            });
        }}
  location() {
    this.Geolocation.getCurrentPosition().then(resp => {
      this.Incident.latitude = resp.coords.latitude;
      this.Incident.longitude = resp.coords.longitude;
      this.getProvince();

    });
  }

  
  public async  TakePicture() {

    this.location();
    //get province name/id
    
    
    const option1: CameraOptions = {
      quality: 50,
      destinationType: this.camera.DestinationType.FILE_URI,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE,
      sourceType: this.camera.PictureSourceType.CAMERA,
      allowEdit: true,

    };
    const option2: CameraOptions = {
      quality: 50,
      destinationType: this.camera.DestinationType.FILE_URI,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE,
      sourceType: this.camera.PictureSourceType.PHOTOLIBRARY,
      allowEdit: true,


    };
    const alert = await this.alertCtrl.create({
      message: 'Source ?',
      buttons: [
        {
          text: 'Camera',
          handler: () => {
            this.getPicture(option1);
          }
        },
        {
          text: 'Libererie',
          handler: () => {
            this.getPicture(option2);
          }
        }
      ]

    });
    await alert.present();

  }
  private getPicture(params: CameraOptions) {
    this.camera.getPicture(params).then(
        data => {
          const base64Image = 'data:image/jpeg;base64,' + data;
          
          this.base64.encodeFile(data).then((base64File: string) => {
            console.log(base64File);
            //base64Image = base64Image + base64File;
            this.Incident.photo=base64File;
            //this.showAlert(this.file2base64);
           // alert(base64File);
          
          }, (err) => {
            console.log(err);
          });
          //this.Incident.photo = base64Image;
          //this.win.Ionic.WebView.convertFileSrc(data);
          this.photo=data;

        }
    );

  }
    public  onFileChanged(event) {
        console.log(event);
        this.selectedFile = event.target.files[0];
        console.log(this.selectedFile);
        // Below part is used to display the selected image
        this.reader = new FileReader();
        this.reader.readAsDataURL(event.target.files[0]);
        this.reader.onload = (event2) => {
            this.imgURL = this.reader.result;
        };

    }
   /* onUpload() {
        const uploadData = new FormData();
        console.log(this.selectedFile);
        console.log(this.selectedFile.name);
        uploadData.append('myFile', this.selectedFile, this.selectedFile.name);


        this.http.post('http://localhost:9090/check/upload', uploadData)
            .subscribe(
                res => {console.log(res);
                    this.receivedImageData = res;
                    this.base64Data = this.receivedImageData.pic;
                    this.convertedImage = 'data:image/jpeg;base64,' + this.base64Data; },
                err => console.log('Error Occured duringng saving: ' + err)
            );


    }*/
    addIncident() {
        this.Incident.ime =  this.device.uuid;
        console.log('Device UUID is: ' + this.device.uuid);
        this.http.post(API_URL + '/Incident/add', this.Incident).subscribe(
        data => {
          console.log(data);
          alert("Image ajoutée avec succées");
        }
      
    );

    //navigate
    this.CloseModal();
    //this.navController.navigateRoot(['/menu/filter/my-incidents']);
     
    

    }
    AnnulerIncident() {
        /*this.Incident.description = null;
        this.Incident.ime = null;
        this.Incident.Date = null;
        this.Incident.province = undefined;
        this.Incident.secteur = undefined;
        this.Incident.type = undefined;
        this.Incident.latitude = null;
        this.Incident.longitude = null;
        this.Incident.statut = null;
        this.selectedSecteur = null;*/
        this.Incident.secteur.secteur = undefined;
        this.ProvinceSelected = null;
        this.selectedSecteur = null;
        this.selectedType = null;
        this.longitude = null;
        this.latitude = null;
        this.description = null;


    }



 
    getList()
    {
        this.incidentService.findIncidentById(this.variableIteam).subscribe(data =>{
          console.log(data);
          this.ListeChoisi= data;
          this.selectedSecteur = this.ListeChoisi.secteur.id;
          this.getType(this.ListeChoisi.secteur.id);
          
          console.log(this.ListeChoisi.type.id)
          this.selectedType = this.ListeChoisi.type.id; 
          this.Incident.latitude = this.ListeChoisi.latitude; 
          this.Incident.longitude = this.ListeChoisi.longitude; 
          this.Incident.province = this.ListeChoisi.province; 
          this.Incident.photo = this.ListeChoisi.photo; 
          this.Incident.description = this.ListeChoisi.description;
          this.Incident.type = this.ListeChoisi.type;
        });
    }
    CloseModal() {
        this.modalController.dismiss();
        window.location.reload();
        
    }
}
