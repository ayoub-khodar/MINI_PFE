import { Component, OnInit, TemplateRef } from '@angular/core';
import {LoginService} from './services/Login.service';
import {UserService} from './services/UserService';
import {BsModalRef, BsModalService} from 'ngx-bootstrap';
import {LoginDtoData} from './Security/Component/shared/data/login-dto.data';
import {FormBuilder, FormGroup} from '@angular/forms';
import {User} from './entities/User';
import {IncidentService} from './services/Incident.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'Projet';
  currentRole: string;
  modalRef: BsModalRef;
  comportement: string;
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
  constructor(private loginService: LoginService, private modalService: BsModalService,private router: Router,
              private formBuilder: FormBuilder ,private userService: UserService, private incidentService: IncidentService) {
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
  logout(){
    this.loginService.logout(()=>{
      
      window.location.href = 'http://localhost:4200/acceuil' ;
      //this.router.navigateByUrl('/acceuil');
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
      this.logout();
      this.test = '';
    }
  }
  
  onlogin() {
    if (this.comportement == 'Se connecter ') {
      // console.log(this.currentUser);
      // console.log(this.currentRole);
      const data: LoginDtoData = new LoginDtoData();
      data.username = this.formData.get('username').value;
      data.password = this.formData.get('password').value;
      this.router.navigateByUrl('/acceuil');
      // console.log(data);
      this.loginService.login(data).subscribe(res => {
        if (res) {
          // console.log(res);
          this.loginService.currentUser.next(res);
          // console.log("azza");
          this.message = '';

          this.modalRef.hide();
          this.comportement = 'Se deconnecter ';
          this.test = ' Bonjour  ' + this.currentUser.fullname;

        } else {
           this.message = ' ! username ou password est errone';
        }
      });

    }
    if (this.comportement == 'Se deconnecter ') {
      this.logout();
      //this.router.navigate(['/home'])
    }



  }
}
