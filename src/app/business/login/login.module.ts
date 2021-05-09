
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms'
import { ReactiveFormsModule } from '@angular/forms';
import { AuthService } from '../../shared/services/auth.service';
import { BasicModule } from '../../shared/basic.module';
import { LoginComponent } from './login.component';
import { LoginRoutingModule } from './login-routing.module';

import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzSelectModule } from 'ng-zorro-antd/select';


@NgModule({
  imports: [
    LoginRoutingModule,
    ReactiveFormsModule,
    CommonModule,
    BasicModule,
    FormsModule,
    NzFormModule,
    NzInputModule,
    NzIconModule,
    NzButtonModule,
    NzSelectModule

  ],
  declarations: [
    LoginComponent
  ],
  exports: [LoginComponent],
  providers: []
})
export class LoginModule { }
