import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ResourceRoutingModule } from './resource-routing.module';
import {ResourceComponent} from './resource.component';
import {ResourceService} from './resource.service';
import {SharedModule} from '../shared/shared.module';
import {PdfViewerSelfComponent} from './pdf-viewer-self/pdf-viewer-self.component';
import {DetailResourceComponent} from './detail-resource/detail-resource.component';
import {PdfViewerModule} from 'ng2-pdf-viewer';
import {VgBufferingModule} from 'videogular2/buffering';
import {VgOverlayPlayModule} from 'videogular2/overlay-play';
import {VgControlsModule} from 'videogular2/controls';
import {VgCoreModule} from 'videogular2/core';
import {BrowserModule} from '@angular/platform-browser';

@NgModule({
  declarations: [
    ResourceComponent,
    DetailResourceComponent,
    PdfViewerSelfComponent
  ],
  imports: [
    CommonModule,
    ResourceRoutingModule,
    SharedModule,
    VgCoreModule,
    VgControlsModule,
    VgOverlayPlayModule,
    VgBufferingModule,
    PdfViewerModule
  ],
  providers: [ResourceService],
})
export class ResourceModule { }
