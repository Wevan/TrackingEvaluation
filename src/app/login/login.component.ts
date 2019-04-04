import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {User} from '../entity/User';
import {LoginService} from './login.service';
import {Router} from '@angular/router';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {


  validateForm: FormGroup;

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

    this.loginService.onLogin(user).subscribe(
      next => {
        console.log('what');
        console.log(next);
        console.log('exe');
        localStorage.setItem('token', `Bearer ${next.data}`);
        this.router.navigateByUrl('/');
      },
      err => {
        console.log(err);
      }
    );
  }

  constructor(private fb: FormBuilder, private loginService: LoginService, private router: Router) {
  }

  ngOnInit(): void {
    if (localStorage.getItem('token') !== null) {
      this.router.navigateByUrl('/');
    }
    this.validateForm = this.fb.group({
      userName: [null, [Validators.required]],
      password: [null, [Validators.required]],
      remember: [true]
    });

  }
}
