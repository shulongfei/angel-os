import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SystemRoutingModule } from './system-routing.module';
import { SystemComponent } from './system.component';

import { NzFormModule } from 'ng-zorro-antd/form';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzLayoutModule } from 'ng-zorro-antd/layout';
import { NzMenuModule } from 'ng-zorro-antd/menu';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzBreadCrumbModule } from 'ng-zorro-antd/breadcrumb';
import { NzCardModule } from 'ng-zorro-antd/card';
import { NzSpaceModule } from 'ng-zorro-antd/space';
import { NzCarouselModule } from 'ng-zorro-antd/carousel';
import { NzProgressModule } from 'ng-zorro-antd/progress';
import { NzListModule } from 'ng-zorro-antd/list';
import { NzEmptyModule } from 'ng-zorro-antd/empty';
import { NzDropDownModule } from 'ng-zorro-antd/dropdown';
import { NzAvatarModule } from 'ng-zorro-antd/avatar';
import { NzBadgeModule } from 'ng-zorro-antd/badge';

import { DashboardComponent } from './dashboard/dashboard.component';


@NgModule({
  imports: [
    CommonModule,
    SystemRoutingModule,
    NzFormModule,
    NzInputModule,
    NzIconModule,
    NzMenuModule, 
    NzLayoutModule,
    NzCarouselModule,
    NzButtonModule,
    NzBreadCrumbModule,
    NzCardModule,
    NzProgressModule,
    NzSpaceModule,
    NzListModule,
    NzEmptyModule,
    NzBadgeModule,
    NzAvatarModule,
    NzDropDownModule
  ],
  declarations: [
    SystemComponent, 
    DashboardComponent,
  ],
  exports: [SystemComponent]
})

export class SystemModule { }
