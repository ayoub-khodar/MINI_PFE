import { Component, OnInit, TemplateRef } from '@angular/core';
import {LoginService} from '../services/Login.service';
import {BsModalRef, BsModalService} from 'ngx-bootstrap';
import {LoginDtoData} from '../Security/Component/shared/data/login-dto.data';
import {FormBuilder, FormGroup} from '@angular/forms';
import {User} from '../entities/User';
import {IncidentService} from '../services/Incident.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {

  title = 'Projet';
  currentRole: string;
  modalRef: BsModalRef;
  comportement: string;
  isShow = false; 
  formData: FormGroup = this.formBuilder.group({
    username: [null],
    password: [null]
  });
  public image = {

    logo: 'assets/Images/logo2.jpg',


  };
  test: string;
  currentUser: User;
  message: string;
  IdUserChoisi: any; 
  constructor(private loginService: LoginService, private modalService: BsModalService,
              private formBuilder: FormBuilder , private incidentService: IncidentService) {
    this.comportement = 'Se connecter ';
    this.loginService.currentUser.subscribe((newUser) => {
      this.currentRole = newUser ? newUser.role.role : null;
      console.log(this.currentRole);

    });

  }
  ngOnInit() {
    this.loginService.currentUser.subscribe(newUser => {
      this.currentUser = newUser;
    });
  }
  openModel(template: TemplateRef<any>) {
    if (this.comportement == 'Se connecter ') {
      this.modalRef = this.modalService.show(template);
    }

    if (this.comportement == 'Se deconnecter ') {

      this.currentUser = null;
      this.currentRole = null;
      this.comportement = 'Se connecter ';
      this.test = '';
    }
  }

 
  toggleDisplay() {
    this.isShow = !this.isShow;}

  onlogin() {
    if (this.comportement == 'Se connecter ') {
      // console.log(this.currentUser);
      // console.log(this.currentRole);
      const data: LoginDtoData = new LoginDtoData();
      data.username = this.formData.get('username').value;
      data.password = this.formData.get('password').value;
      // console.log(data);
      this.loginService.login(data).subscribe(res => {
        if (res) {
          // console.log(res);
          this.loginService.currentUser.next(res);
          // console.log("azza");
          this.message = '';

          this.modalRef.hide();
          this.comportement = 'Se deconnecter ';
          this.test = ' Salut  ' + this.currentUser.fullname;

        } else {
           this.message = ' ! username ou password est errone';
        }
      });

    }



  }
}
