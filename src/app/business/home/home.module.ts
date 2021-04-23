import { NgModule } from '@angular/core';

import { HomeRoutingModule } from './home-routing.module';


import { NzFormModule } from 'ng-zorro-antd/form';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzLayoutModule } from 'ng-zorro-antd/layout';
import { NzMenuModule } from 'ng-zorro-antd/menu';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzBreadCrumbModule } from 'ng-zorro-antd/breadcrumb';

import { HomeComponent } from './home.component';
// import { CeshiComponent } from './ceshi/ceshi.component';


@NgModule({
  imports: [
    HomeRoutingModule, 
    NzFormModule,
    NzInputModule,
    NzIconModule,
    NzMenuModule, 
    NzLayoutModule,
    NzButtonModule,
    NzBreadCrumbModule
    
  ],
  declarations: [HomeComponent],
  exports: [HomeComponent]
})

export class HomeModule { }
