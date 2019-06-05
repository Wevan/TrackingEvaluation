import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {ListComponent} from './list.component';
import {DetailResourceComponent} from '../resource/detail-resource/detail-resource.component';
import {RecommendDetailComponent} from './recommend-detail/recommend-detail.component';

const routes: Routes = [
  {path: '', component: ListComponent},
  {path: 'recommend/:id', component: RecommendDetailComponent},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ListRoutingModule {
}
