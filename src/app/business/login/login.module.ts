
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms'
import { ReactiveFormsModule } from '@angular/forms';

import { LoginComponent } from './login.component';
import { LoginRoutingModule } from './login-routing.module';

import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzIconModule } from 'ng-zorro-antd/icon';


@NgModule({
  imports: [
    LoginRoutingModule,
    ReactiveFormsModule,
    CommonModule,
    FormsModule,
    NzFormModule,
    NzInputModule,
    NzIconModule,
    NzButtonModule

  ],
  declarations: [LoginComponent],
  exports: [LoginComponent]
})
export class LoginModule { }