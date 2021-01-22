import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ModifymodalPage } from './modifymodal.page';

const routes: Routes = [
  {
    path: '',
    component: ModifymodalPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ModifymodalPageRoutingModule {}
