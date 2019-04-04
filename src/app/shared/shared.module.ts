import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {en_US, NgZorroAntdModule, NZ_I18N} from 'ng-zorro-antd';
import {httpInterceptorProviders} from '../httpInterceptor';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    NgZorroAntdModule,
    FormsModule,
    ReactiveFormsModule
  ],
  exports: [
    NgZorroAntdModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [{provide: NZ_I18N, useValue: en_US}, httpInterceptorProviders],
})
export class SharedModule {
}
