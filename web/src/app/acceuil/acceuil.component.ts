import { Component, OnInit } from '@angular/core';
import {$} from 'protractor';

@Component({
  selector: 'app-acceuil',
  templateUrl: './acceuil.component.html',
  styleUrls: ['./acceuil.component.scss']
})
export class AcceuilComponent implements OnInit {
  
  public contact = {

    //logo: 'assets/Images/Capture.PNG',
   // location: 'assets/Images/Capture.PNG'

  };
  constructor() { }

  ngOnInit() {


  }

}
