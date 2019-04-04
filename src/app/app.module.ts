import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NgZorroAntdModule, NZ_I18N, en_US } from 'ng-zorro-antd';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { registerLocaleData } from '@angular/common';
import en from '@angular/common/locales/en';
import { IndexComponent } from './index/index.component';
import { CardComponent } from './card/card.component';
import { ProgressComponent } from './progress/progress.component';
import { LoginComponent } from './login/login.component';
import {SharedModule} from './shared/shared.module';
import {CanLoginProvide} from './definder/CanLoginProvide';
import { ResourceComponent } from './resource/resource.component';
import { ListComponent } from './list/list.component';
import { ReportComponent } from './report/report.component';

registerLocaleData(en);

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    SharedModule,
    FormsModule,
    HttpClientModule,
    BrowserAnimationsModule,

  ],
  providers: [{provide: NZ_I18N, useValue: en_US}, CanLoginProvide],
  bootstrap: [AppComponent]
})
export class AppModule { }
