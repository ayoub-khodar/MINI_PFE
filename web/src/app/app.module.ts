import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AcceuilComponent } from './acceuil/acceuil.component';
import { SIGComponent } from './sig/sig.component';
import { AdministrationComponent } from './administration/administration.component';
import { ProfessionnelComponent } from './professionnel/professionnel.component';
import { IncidentComponent } from './incident/incident.component';
import { HttpClientModule } from '@angular/common/http';
import { IncidentService } from './services/Incident.service';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SecteurService } from './services/Secteur.service';
import { TypeService } from './services/Type.service';
import { ProvinceService } from './services/Province.service';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ChartsModule } from 'ng2-charts';
import { HighchartsChartComponent } from './highcharts-chart/highcharts-chart.component';
// Import angular-fusioncharts
import { FusionChartsModule } from 'angular-fusioncharts';
import { ModalModule} from 'ngx-bootstrap';
import { MatPaginatorModule } from '@angular/material';


// Import FusionCharts library
import * as FusionCharts from 'fusioncharts';

// Load FusionCharts Individual Charts
import * as Charts from 'fusioncharts/fusioncharts.charts';
import { LoginComponent } from './Security/Component/login/login.component';
import { SecutityService} from './services/security.service';
import { GestionUtilisateurComponent } from './gestion-utilisateur/gestion-utilisateur.component';
import {UserService} from './services/UserService';
import { SidebarComponent } from './sidebar/sidebar.component';
import { MapComponent } from './map/map.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import { ProfilComponent } from './profil/profil.component';


// Use fcRoot function to inject FusionCharts library, and the modules you want to use
FusionChartsModule.fcRoot(FusionCharts, Charts);




const routes: Routes = [
  {path: 'acceuil', component: AcceuilComponent},
  {path: 'profil', component: ProfilComponent},
  {path: 'SIG', component: SIGComponent},
  {path: 'professionnel', component: ProfessionnelComponent},
  {path: 'administration', component: AdministrationComponent},
  {path: 'incident', component: IncidentComponent},
  {path: 'dashboard', component: DashboardComponent},
  {path: '', redirectTo: '/acceuil', pathMatch: 'full'},
  {path: 'login', component: LoginComponent},
  {path: 'gestion', component: GestionUtilisateurComponent}

];
@NgModule({
  declarations: [
    AppComponent,
    AcceuilComponent,
    SIGComponent,
    AdministrationComponent,
    ProfessionnelComponent,
    IncidentComponent,
    DashboardComponent,
    HighchartsChartComponent,
    LoginComponent,
    GestionUtilisateurComponent,
    SidebarComponent,
    MapComponent,
    ProfilComponent
    ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MatPaginatorModule,
    MatButtonModule,
    MatIconModule,
    RouterModule.forRoot(routes), HttpClientModule, FormsModule, ReactiveFormsModule,
    ChartsModule, FusionChartsModule, ModalModule.forRoot(), BrowserAnimationsModule

  ],
  providers: [IncidentService, SecteurService, TypeService, ProvinceService, SecutityService, UserService],
  bootstrap: [AppComponent]
})
export class AppModule { }