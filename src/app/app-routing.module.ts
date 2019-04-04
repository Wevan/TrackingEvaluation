import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {IndexComponent} from './index/index.component';
import {CanLoginProvide} from './definder/CanLoginProvide';

const routes: Routes = [
  {path: '', loadChildren: './index/index.module#IndexModule', canActivate: [CanLoginProvide]},
  {path: 'login', loadChildren: './login/login.module#LoginModule'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
