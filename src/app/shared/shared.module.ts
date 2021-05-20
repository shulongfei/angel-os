
import { APP_INITIALIZER, ModuleWithProviders, NgModule, Optional, SkipSelf } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms'
import {  } from '@angular/forms';

import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzIconModule } from 'ng-zorro-antd/icon';

import { ToggleI18nComponent } from './components/toggle-i18n/toggle-i18n.component';
import { UploadComponent } from './components/upload/upload.component';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { HttpInterceptorProviders } from './httpInterceptors';
import { SharedConfig } from './config/shared.config';
import { I18NService } from './services/i18n.service';


@NgModule({
  imports: [
    ReactiveFormsModule,
    CommonModule,
    FormsModule,
    NzFormModule,
    NzInputModule,
    NzIconModule,
    NzButtonModule,
    NzSelectModule  
  ],
  declarations: [
    ToggleI18nComponent,
    UploadComponent
  ],
  exports: [
    ToggleI18nComponent,
    UploadComponent
  ],
  providers: []
})

export class SharedModule { 
  constructor(@Optional() @SkipSelf() parentModule: SharedModule) {
    if (parentModule) {
      throw new Error(
        'SharedModule is already loaded. Import it in the AppModule only'
      );
    }
  }

  static forRoot(): ModuleWithProviders<NgModule> {
    return {
      ngModule: SharedModule,
      providers: [
        // DatePipe,
        HttpInterceptorProviders,
        {
          provide: APP_INITIALIZER,
          useFactory: SharedConfig.config,
          deps: [I18NService],
          multi: true
        }
      ]
    };
  }


}
