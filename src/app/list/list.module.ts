import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {SharedModule} from '../shared/shared.module';
import {ListRoutingModule} from './list-routing.module';
import {ListComponent} from './list.component';
import {CardComponent} from '../card/card.component';
import {ProgressComponent} from '../progress/progress.component';
import {ResourceService} from '../resource/resource.service';
import { RecommendDetailComponent } from './recommend-detail/recommend-detail.component';
import {VgCoreModule} from 'videogular2/core';
import {VgControlsModule} from 'videogular2/controls';
import {VgOverlayPlayModule} from 'videogular2/overlay-play';
import {VgBufferingModule} from 'videogular2/buffering';

@NgModule({
  declarations: [
    ListComponent,
    CardComponent,
    ProgressComponent,
    RecommendDetailComponent,
  ],
  imports: [
    CommonModule,
    SharedModule,
    ListRoutingModule,
    VgCoreModule,
    VgControlsModule,
    VgOverlayPlayModule,
    VgBufferingModule
  ],
  providers: [ResourceService],
})
export class ListModule {
}
