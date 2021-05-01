import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeRoutingModule } from './home-routing.module';


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
import { AccountBookFill, AlertFill, AlertOutline } from '@ant-design/icons-angular/icons';
import { NzListModule } from 'ng-zorro-antd/list';
import { NzEmptyModule } from 'ng-zorro-antd/empty';
import { NzDropDownModule } from 'ng-zorro-antd/dropdown';
import { NzAvatarModule } from 'ng-zorro-antd/avatar';
import { NzBadgeModule } from 'ng-zorro-antd/badge';



import { HomeComponent } from './home.component';
// import { CeshiComponent } from './ceshi/ceshi.component';


@NgModule({
  imports: [
    CommonModule,
    HomeRoutingModule,
    NzFormModule,
    NzInputModule,
    NzIconModule,
    NzMenuModule, 
    NzLayoutModule,
    NzButtonModule,
    NzBreadCrumbModule,
    NzCardModule,
    NzSpaceModule,
    NzCarouselModule,
    NzProgressModule,
    NzListModule,
    NzEmptyModule,
    NzDropDownModule,
    NzAvatarModule,
    NzBadgeModule
    
  ],
  declarations: [HomeComponent],
  exports: [HomeComponent]
})

export class HomeModule { }
