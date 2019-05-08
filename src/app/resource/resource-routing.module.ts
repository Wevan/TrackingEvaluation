import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {ResourceComponent} from './resource.component';
import {DetailResourceComponent} from './detail-resource/detail-resource.component';
import {PdfViewerSelfComponent} from './pdf-viewer-self/pdf-viewer-self.component';

const routes: Routes = [
  {path: '', component: ResourceComponent},
  {path: 'viewer/:id', component: PdfViewerSelfComponent},
  {path: 'video/:id/:endTime', component: DetailResourceComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ResourceRoutingModule { }
