import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {IndexComponent} from './index.component';

const routes: Routes = [
  {
    path: '', component: IndexComponent, children: [
      {path: 'list', loadChildren: '../list/list.module#ListModule'},
      {path: 'report', loadChildren: '../report/report.module#ReportModule'},
      {path: 'resource', loadChildren: '../resource/resource.module#ResourceModule'},
      {path: 'collection', loadChildren: '../collections/collections.module#CollectionsModule'},
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class IndexRoutingModule {
}
