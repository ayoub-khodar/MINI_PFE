import { Component, OnInit } from '@angular/core';
import {data} from 'src/assets/data/incidents';
import { ChartOptions, ChartType, ChartDataSets } from 'chart.js';
import { Label } from 'ng2-charts';
import { SingleDataSet, monkeyPatchChartJsLegend, monkeyPatchChartJsTooltip } from 'ng2-charts';
import { IncidentService } from '../services/Incident.service';
import { SecteurService } from '../services/Secteur.service';
import { HttpClient } from '@angular/common/http';
//import 'chartjs-plugin-datalabels';
import * as Highcharts from 'highcharts';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
sect_statistique: any;
  prov_statistique: any;
  type_statistique:any;
  Labels = [];
  Values = [];
  LabelsType = [];
  ValuesType = [];
  LabelsProv = [];
  ValuesProv = [];
  statut_statistique:any;
  LabelsStatut=[];
  ValuesStatut=[];
  div1:boolean=true;
  div2:boolean=true;
  div3:boolean=true;
  div4:boolean=true;
  constructor(private IncidentService: IncidentService, private SecteurService: SecteurService,
              private http: HttpClient) {
                
    this.http.get('http://localhost:9090/Incident/secteur/Statistique').subscribe(
      data => {
        this.sect_statistique = data;

        console.log(this.sect_statistique.length);
        for (let i = 0; i < this.sect_statistique.length; i++) {
          console.log(this.sect_statistique[i][0]);
          this.Labels.push(this.sect_statistique[i][0]);
          this.Values.push(this.sect_statistique[i][1]);

        }
      }
    );
    this.http.get('http://localhost:9090/Incident/province/Statistique').subscribe(
      data => {
        this.prov_statistique = data;
        for (let i = 0; i < this.prov_statistique.length; i++) {

          this.LabelsProv.push(this.prov_statistique[i][0]);
          this.ValuesProv.push(this.prov_statistique[i][1]);
          console.log(this.LabelsProv, this.ValuesProv);

        }
      }
    );
    this.http.get('http://localhost:9090/Incident/statut/Statistique').subscribe(
      data => {
        this.statut_statistique = data;
        for (let i = 0; i < this.statut_statistique.length; i++) {

          if(this.statut_statistique[i][0]=="declaré"){
            this.LabelsStatut.push(this.statut_statistique[i][0]);
            this.ValuesStatut.push(this.statut_statistique[i][1]);
          }
                
         
          
        }
        for (let i = 0; i < this.statut_statistique.length; i++) {

          if(this.statut_statistique[i][0]=="rejeté"){
            this.LabelsStatut.push(this.statut_statistique[i][0]);
            this.ValuesStatut.push(this.statut_statistique[i][1]);
          }
          

        }
        for (let i = 0; i < this.statut_statistique.length; i++) {

          if(this.statut_statistique[i][0]=="validé"){
            this.LabelsStatut.push(this.statut_statistique[i][0]);
            this.ValuesStatut.push(this.statut_statistique[i][1]);
          }
          

        }
        for (let i = 0; i < this.statut_statistique.length; i++) {

          if(this.statut_statistique[i][0]=="En cours de traitement"){
            this.LabelsStatut.push(this.statut_statistique[i][0]);
            this.ValuesStatut.push(this.statut_statistique[i][1]);
          }
          

        }
        for (let i = 0; i < this.statut_statistique.length; i++) {

          if(this.statut_statistique[i][0]=="Traité"){
            this.LabelsStatut.push(this.statut_statistique[i][0]);
            this.ValuesStatut.push(this.statut_statistique[i][1]);
          }
          

        }
        for (let i = 0; i < this.statut_statistique.length; i++) {

          if(this.statut_statistique[i][0]=="redirigé"){
            this.LabelsStatut.push(this.statut_statistique[i][0]);
            this.ValuesStatut.push(this.statut_statistique[i][1]);
          }
          

        }
        for (let i = 0; i < this.statut_statistique.length; i++) {

          if(this.statut_statistique[i][0]=="Bloqué"){
            this.LabelsStatut.push(this.statut_statistique[i][0]);
            this.ValuesStatut.push(this.statut_statistique[i][1]);
          }
          

        }
      }
    );
    this.http.get('http://localhost:9090/Incident/type/Statistique').subscribe(
      data => {
        this.type_statistique = data;
        for (let i = 0; i < this.type_statistique.length; i++) {
          console.log(this.type_statistique[i][0]);

          this.LabelsType.push(this.type_statistique[i][0]);
          this.ValuesType.push(this.type_statistique[i][1]);

        }
      }
    );

    


    // pie chart
    monkeyPatchChartJsTooltip();
    monkeyPatchChartJsLegend();
   }



// secteur
  barChartOptions: ChartOptions = {
    responsive: true,
    
      plugins: {
        datalabels: {
          render: 'secteur',
          display: true,
          align: 'bottom',
          backgroundColor: '#ccc',
          borderRadius: 3,
          font: {
            size: 18,
          }
        },
      }
    
  };
 
  barChartLabels: Label[] = this.Labels;
  barChartType: ChartType = 'radar';
  barChartLegend = true;
  barChartPlugins = {
  };
  

  barChartData: ChartDataSets[] = [
    { data: this.Values, label: 'Nombre d incidents par secteur',
    backgroundColor: ["blue","grey","green","#FBD72B","cornflowerblue","orange","red","purple","black"], }
  ];
  

// province
  ProvChartOptions: ChartOptions = {
    
    responsive: true,
    scales: {
      yAxes: [{
          ticks: {
              suggestedMin: 0,
              suggestedMax: this.Labels.length +4,
          }
      }]
  } 
  };
  ProvChartLabels: Label[] = this.LabelsProv;
  ProvbarChartType: ChartType = 'bar';
  ProvChartLegend = true;
  ProvChartPlugins = [];
  //color = [red];

  ProvChartData: ChartDataSets[] = [
    {
      data: this.ValuesProv, label: 'Nombre d incidents par province',
      backgroundColor: "#3e95cd", }
  ];
// statut
  StatutChartOptions: ChartOptions = {
    responsive: true,
    scales: {
      yAxes: [{
          ticks: {
              suggestedMin: 0,
              suggestedMax: this.Labels.length +4,
          }
      }]
  }
  };
  StatutChartLabels: Label[] = this.LabelsStatut;
  StatutbarChartType: ChartType = 'bar';
  
  StatutChartLegend = true;
  StatutChartPlugins = [];
  

  StatutChartData: ChartDataSets[] = [
    {
      data: this.ValuesStatut, label: 'Nombre d incidents par statut',
      backgroundColor: ["blue","grey","green","#FBD72B","cornflowerblue","orange","red"], }
  ];
  // type
  TypeChartOptions: ChartOptions = {
    responsive: true,
    scales: {
      yAxes: [{
          ticks: {
              suggestedMin: 0,
              suggestedMax: this.Labels.length +4,
          }
      }]
  }
  };
  TypeChartLabels: Label[] = this.LabelsType;
  TypebarChartType: ChartType = 'bar';
  TypeChartLegend = true;
  TypeChartPlugins = [];

  TypeChartData: ChartDataSets[] = [
    {
      data: this.ValuesType, label: 'Nombre d incidents par type',
      backgroundColor: "#c45850"}
  ];
  ngOnInit() {
    

  }
  isShow = false;
  isShow1 = false;
  isShow2 = false;
  isShow3 = false;
  isShow4 = false;
 
  toggleDisplay1() {
    this.isShow = !this.isShow;
    this.isShow1 = !this.isShow1;
    this.isShow2 = false;
    this.isShow3 = false;
    this.isShow4 = false;}
    toggleDisplay2() {
      this.isShow = !this.isShow;
      this.isShow1 = false;
      this.isShow2 = !this.isShow2;
       this.isShow3 = false;
       this.isShow4 = false;}
       toggleDisplay3() {
        this.isShow = !this.isShow;
        this.isShow1 = false;
        this.isShow2 = false;
         this.isShow3 = !this.isShow3;
         this.isShow4 = false;}
         toggleDisplay4() {
          this.isShow = !this.isShow;
          this.isShow1 = false;
          this.isShow2 = false;
           this.isShow3 = false;
           this.isShow4 = !this.isShow4;}

}
