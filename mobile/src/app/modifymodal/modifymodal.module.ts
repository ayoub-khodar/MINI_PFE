import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { ModifymodalPageRoutingModule } from './modifymodal-routing.module';
import { ModifymodalPage } from './modifymodal.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ModifymodalPageRoutingModule
  ],
  declarations: [ModifymodalPage]
})
export class ModifyModelPageModule {}

