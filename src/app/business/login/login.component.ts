import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router'
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../shared/services/auth.service';
import { I18NService } from '../../shared/services/i18n.service';

@Component({
  selector: 'os-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.less']
})
export class LoginComponent implements OnInit {

  validateForm!: FormGroup;

  constructor(
    public i18n: I18NService,
    private fb: FormBuilder,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private authService: AuthService
  ) { }

  ngOnInit(): void {
    // 页面重定向
    this.redirectHome();

    this.validateForm = this.fb.group({
      userName: [null, [Validators.required]],
      password: [null, [Validators.required]],
      remember: [true]
    });
  }

  onLogin() {
    for (const i in this.validateForm.controls) {
      this.validateForm.controls[i].markAsDirty();
      this.validateForm.controls[i].updateValueAndValidity();
    }
    // 如果验证通过则跳转
    if (this.validateForm.valid) {
      console.log(111);
      this.authService.setToken('daffaewrwqerqezczdfasdfadfa');
      this.authService.setRole('admin');
      this.authService.setAccountName('xiaoxie');
      this.authService.setTimeout('30000000');
      this.router.navigate(['/home']);
    }
  }

  redirectHome() {
    if (this.authService.isAuth) {
      this.router.navigate(['/home']);
    }
  }
  
}
