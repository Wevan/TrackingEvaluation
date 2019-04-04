import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {IndexRoutingModule} from './index-routing.module';
import {IndexComponent} from './index.component';
import {SharedModule} from '../shared/shared.module';

@NgModule({
  declarations: [
    IndexComponent,
  ],
  imports: [
    CommonModule,
    IndexRoutingModule,
    SharedModule,
  ]
})
export class IndexModule {
}
