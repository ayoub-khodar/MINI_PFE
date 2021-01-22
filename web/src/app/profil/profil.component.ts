import {Component, OnInit, TemplateRef} from '@angular/core';
import {UserService} from '../services/UserService';
import {HttpClient} from '@angular/common/http';
import {BsModalRef, BsModalService} from 'ngx-bootstrap';
import {User} from '../entities/User';
import {SecteurService} from '../services/Secteur.service';
import {FormBuilder, FormGroup} from '@angular/forms';
import {Secteur} from '../entities/Secteur';
import { Router } from '@angular/router';
import {data} from '../../assets/data/incidents';
import {NULL_EXPR} from '@angular/compiler/src/output/output_ast';
import { Role } from '../entities/Role';
import { Route } from '@angular/compiler/src/core';
import { LoginService } from '../services/Login.service';

@Component({
  selector: 'app-profil',
  templateUrl: './profil.component.html',
  styleUrls: ['./profil.component.scss']
})
export class ProfilComponent implements OnInit {
listUsers: any;
listProf = [];
  modalRef: BsModalRef;
  user: User;
  ListSecteur: any;
  idSecteurChoisi: any;
  data: any;
  errDuplicqted: string;
  errusername: string;
  errfullname: string;
  item: any;
  selectedsecteur : Secteur;
  errpassword: string;
  i: number;
  selectedSecteur2: any;
  totalRecords: String;
  page : Number = 1;
  currentUser: User;
  formData: FormGroup = this.formBuilder.group({
  username: [null],
  fullname: [null],
  password: [null],
  organisme: [null],
  email: [null],
  telephone: [null],
  secteurUser : [null]
  });
  constructor(private userService: UserService, private  http: HttpClient,private loginService: LoginService,
              private modalService: BsModalService, private router: Router,
              private Secteurservice: SecteurService, private formBuilder: FormBuilder) {
    this.user = new User();

    this.getSecteur();
    this.i = 0;
  }

  ngOnInit() {
    this.loginService.currentUser.subscribe(newUser => {
       this.currentUser = newUser;
            
      });

      this.listProf.push(this.currentUser);

  }
  getSecteur() {
    this.Secteurservice.findAllSecteur().subscribe(
      data => {this.ListSecteur = data;
      }
    );
  }
  openModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template);
    console.log(this.item);



  }
  do2(evt) {
    this.Secteurservice.findSecteurById(evt.target.value).subscribe( data => {
      this.idSecteurChoisi = evt.target.value;
      this.data = data;
      //this.user.secteurUser.id = this.data.id;
      //this.user.secteurUser.secteur = this.data.secteur;
      console.log(this.data);
      this.selectedsecteur=this.data;

    });
  }
  checkUsername(evt) {

    for (let i = 0; i < this.listUsers.length; i++) {
      console.log('ali');
      if (this.user.username == this.listUsers[i].username) {

        this.errusername = 'ce champ existe deja ';
        console.log(this.user.username);
      } else {
        this.errusername = null;
      }

    }
  }
  checkUsername1(evt) {
    console.log('this.user', this.listUsers);
    console.log('this.item', this.item);
    for (let i = 0; i < this.listUsers.length; i++) {
      console.log('ali');
      if (this.item.username == this.listUsers[i].username && this.item.id != this.listUsers[i].id) {

        this.errusername = 'ce champ existe deja ';
        console.log(this.user.username);
      }

    }
  }

  update() {
    this.user.role=new Role();
    this.user.role.id = 2;
    this.user.role.role =  'professionnel';

    if(this.selectedsecteur != null){
      this.user.secteurUser = new Secteur();
    this.user.secteurUser = this.selectedsecteur ;
    this.item.secteur = this.selectedsecteur ;
    this.item.secteurUser = this.selectedsecteur;

    }

    console.log(this.selectedsecteur);
    this.modalRef.hide();

    console.log(this.item);

    this.userService.updateuser(this.item).subscribe(
      data => {
        console.log(data);

      },
      err => {

        if (this.item.password == null) {this.errpassword = 'ce champ est obligatoire'; }
        if (this.item.fullname == null) {this.errfullname = 'ce champ est obligatoire'; }

        if (this.item.username == null) {
          this.errusername = 'ce champ est obligatoire'; }
      }

    );
    console.log(this.user);
  }
  openModal1(template: TemplateRef<any>, item) {
    this.modalRef = this.modalService.show(template);
    this.item = item;
    console.log(this.item);


    console.log(this.selectedSecteur2);
  }
  hide() {
    this.errusername = null;
    this.errpassword = null;
    this.errfullname = null;
    this.user.username = null;
    this.user.fullname = null;
    this.user.password = null;
    this.modalRef.hide();
  }

}


// import { Component, OnInit, TemplateRef } from '@angular/core';
// import {LoginService} from '../services/Login.service';
// import {UserService} from '../services/UserService';
// import {BsModalRef, BsModalService} from 'ngx-bootstrap';
// import {LoginDtoData} from '../Security/Component/shared/data/login-dto.data';
// import {FormBuilder, FormGroup} from '@angular/forms';
// import {User} from '../entities/User';
// import {IncidentService} from '../services/Incident.service';
// import {HttpClient} from '@angular/common/http';
// import {SecteurService} from '../services/Secteur.service';
// import {Secteur} from '../entities/Secteur';
// import { Router } from '@angular/router';
// import {data} from '../../assets/data/incidents';
// import {NULL_EXPR} from '@angular/compiler/src/output/output_ast';
// import { Role } from '../entities/Role';
// import { Route } from '@angular/compiler/src/core';

// @Component({
//   selector: 'app-profil',
//   templateUrl: './profil.component.html',
//   styleUrls: ['./profil.component.scss']
// })
// export class ProfilComponent implements OnInit {

  
//    //------------------


//   listUsers: any;
// listProf = [];
//   modalRef: BsModalRef;
//   user: User;
//   ListSecteur: any;
//   idSecteurChoisi: any;
//   data: any;
//   errDuplicqted: string;
//   errusername: string;
//   errfullname: string;
//   item: any;
//   currentUser: User;
//   selectedsecteur : Secteur;
//   errpassword: string;
//   i: number;
//   selectedSecteur2: any;
//   totalRecords: String;
//   page : Number = 1;
//   formData: FormGroup = this.formBuilder.group({
//   username: [null],
//   fullname: [null],
//   password: [null],
//   organisme: [null],
//   email: [null],
//   telephone: [null],
//   secteurUser : [null]
//   });

//   test: string;
//   message: string;
//   IdUserChoisi: any;
//   constructor(private loginService: LoginService, private modalService: BsModalService,private router: Router,
//               private formBuilder: FormBuilder ,private userService: UserService, private incidentService: IncidentService) {

//   }
//   ngOnInit() {
//     this.loginService.currentUser.subscribe(newUser => {
//       this.currentUser = newUser;
      
//     });
//   }

//   update() {
//     this.currentUser.role=new Role();
//     this.currentUser.role.id = 2;
//     this.currentUser.role.role =  'professionnel';

//     this.userService.updateuser(this.currentUser).subscribe(
//       data => {
//         console.log(data);
//       }

//     );
//     console.log(this.currentUser);
//   }
  
// }


