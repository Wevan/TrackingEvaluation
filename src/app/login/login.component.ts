import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {User} from '../entity/User';
import {LoginService} from './login.service';
import {Router} from '@angular/router';
import {CookieService} from 'ngx-cookie-service';
import {NzNotificationService} from 'ng-zorro-antd';
import {Result} from '../entity/Result';
import {HttpClient} from '@angular/common/http';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {


  validateForm: FormGroup;
  time: number = 7 * 24 * 60 * 60 * 1000; // cookie过期时间7*24个小时

  submitForm(): void {
    for (const i of Object.keys(this.validateForm.controls)) {
      this.validateForm.controls[i].markAsDirty();
      this.validateForm.controls[i].updateValueAndValidity();
    }
  }

  loginTo(): void {
    const obj = this.validateForm.getRawValue();
    const user = new User();
    user.username = obj.userName;
    user.password = obj.password;
    // 学生端
    user.type = 3;

    this.loginService.onLogin(user).subscribe(
      next => {
        console.log(next);
        console.log('exe');
        if (next.code !== 200) {
          this.notification.blank(
            '登陆错误',
            '请检查您的账号和密码'
          );
          this.router.navigateByUrl('/login');
        } else {
          if (this.validateForm.get('remember').value) {
            console.log('true');
            this.cookieService.set('token', `Bearer ${next.data}`, new Date(new Date().getTime() + this.time));
            localStorage.setItem('userName', user.username);
          } else {
            sessionStorage.setItem('token', `Bearer ${next.data}`);
            sessionStorage.setItem('userName', user.username);
          }
          this.router.navigateByUrl('/');
        }
      },
      err => {
        console.log(err);
      }
    );
    // this.getStudent();
  }

  constructor(private fb: FormBuilder, private loginService: LoginService, private router: Router,
              private cookieService: CookieService, private notification: NzNotificationService) {
  }

  ngOnInit(): void {
    if (this.cookieService.get('token') !== null && this.cookieService.get('token') !== '') {
      console.log('Login get cookie');
      this.router.navigateByUrl('/');
    }
    this.validateForm = this.fb.group({
      userName: [null, [Validators.required]],
      password: [null, [Validators.required]],
      remember: [true]
    });

  }

}
