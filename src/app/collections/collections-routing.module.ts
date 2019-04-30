import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {CollectionsComponent} from './collections.component';

const routes: Routes = [
  {path: '', component: CollectionsComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CollectionsRoutingModule { }
