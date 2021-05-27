# **前端命名规范**
## **文件夹命名规范**

+ 采用 `camel-case` 命名规范，例如：`security-policy`、`user-management`。

## **文件命名规范**
+ 采用 `camel-case` + `suffix` 命名规范，例如：`security-policy.ts`、`security-policy.scss` 。
+ HTML页面命名规范：*模块名 + [html]后缀*，例如：`security-policy.html`。
+ CSS/LESS样式命名规范：*模块名 + [less]后缀*，例如：`security-policy.less`。
+ 模块module命名规范：*模块名 + [module]后缀*，例如：`security-policy.module.ts`。
+ 服务service命名规范：*模块名 + [service]后缀*，例如：`security-policy.service.ts`。
+ 组件component命名规范：*模块名 + [component]后缀*，例如：`security-policy.component.ts`。
+ 指令directive命名规范：*模块名 + [directive]后缀*，例如：`security-policy.directive.ts`。
+ 验证指令validator命名规范：*模块名 + [validator]后缀*，例如：`security-policy.validator.ts`。
+ 配置文件config命名规范：*模块名 + [config]后缀*，例如：`security-policy.config.ts`。
+ 资源文件resource命名规范：*模块名 + [resource]后缀*，例如：`security-policy.resource.json`。

## **模块结构搭建规范**
  + 简单模块结构（以系统模块->时间配置模块为例）
    + system-time.module.ts         -- 模块声明文件
    + system-time.component.ts      -- 组件实现文件
    + system-time.service.ts        -- 服务实现文件
    + system-time.html              -- Html模板文件
    + system-time.less              -- Less样式文件
    + system-time.model.d.ts        -- 模型定义文件
    + others...
  + 复杂模块结构（以资源分配->卷管理模块为例)
    + _shared           ----------|-- 共享当前模块的功能组件
      + inner-component     ------|-- 此模块共享组件（可能会存在），不需要通过`index`暴露
      + index.ts        ----------|-- `index`只负责暴露当前模块的功能组件，其他模块使用时只从`_shared`引入
    -----------------------------------------------------------------------
    + list              ----------|
      + volume-list.component.ts--|
      + volume-list.html        --|
    + create            ----------|
      + volume-create.component.ts|
      + volume-create.html  ------|-- 当前模块功能
      + volume-modify.component.ts|
      + volume-modify.html  ------|-- *模块名+功能组件名称，这样方便查找及定位*
      + ...             ----------|
    + delete            ----------|
    + detail            ----------|
    ----------------------------------------------------------------------
    + qos-policy        ----------|
    + clone             ----------|
    + shapshot          ----------|-- 此模块关联功能
    + expansion         ----------|
    + mapping           ----------|
    + others...         ----------|
    ----------------------------------------------------------------------
    + volume.routing.ts        -- 路由定义文件（可能会存在）
    + volume.module.ts         -- 模块声明文件
    + volume.component.ts      -- 组件实现文件
    + volume.service.ts        -- 服务实现文件
    + volume.html              -- Html模板文件
    + volume.less              -- Less样式文件
    + volume.model.d.ts        -- 模型定义文件
    + volume.component.spec.ts -- 组件测试文件

## **Import文件导入规范**
  + 0.Import模块之间换行，不需要写注释
  + 1.angular内置服务(Core、Forms...) ->使用绝对路径
  + 2.third party第三方服务(RxJs、Lodash...) ->使用绝对路径
  + 3.AngUI + app/core公用服务(Ang、app/core...) ->使用绝对路径
  + 4.business module业务代码模块定义文件d.ts ->使用绝对路径
  + 5.business module业务代码(Service + Component) ->使用相对路径
```
<!-- 备注：模块按一下顺序引入 -->

// angular内置服务(Core、Forms...) ->使用绝对路径
import { Component, OnInit, Output } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ReactiveFormsModule, FormControl, FormGroup, Validators, FormBuilder, ValidatorFn } from '@angular/forms';

// third party第三方服务(RxJs、Lodash...) ->使用绝对路径
import { filter } from 'rxjs/operators';
import { isArray, isFunction } from 'lodash';

// AngUI + app/core公用服务(Ang、app/core...) ->使用绝对路径
import { NzMenuModule } from 'ng-zorro-antd/menu';
import { Validator } from '@shared/untils'
import { AlertService, AuthenticationService, EventService, CookieService, LocalService } from '@shared/services';

// business module业务代码模块定义文件d.ts ->使用相对路径
import { LoginMo, LoginVm } from '../login.d.ts';

// business module业务代码(Service + Component) ->使用相对路径
import { LoginService } from '../login.service';
import { LOGIN_STEP } from '../../login/login.component';
```

## **HTML页面规范**
  + 安装VsCode插件【EditorConfig for VS Code】，重启VsCode即可用
  + 全选Html页面内容【`Ctrl+A`】，格式化选定代码【`Ctrl+K` `Ctrl+F`】

```html
<div class="app">
  <p-header-templete *ngIf="loginSucces"
    [linkUrl]="linkUrl"
    [menus]="items"
    [userName]="userName"
    [logOutText]="logOutText"
    (logOut)="logOut($event)"
    (onClickMenu)="onClickMenu($event)"
    [selectedMunu]="selectedMunu">
  </p-header-templete>
  <section>
    <app-alert></app-alert>
    <router-outlet></router-outlet>
  </section>
</div>
```

## **CSS/LESS页面规范**
  + 所有样式组件通过#region xxx #endregion包裹。标准模块参考如下：
  + 样式组件命名规范：[ut-] + 组件名称；如`ut-panel`
  + 组件按照三级目录结构(header、body、footer)，即`ut-panel-header`、`ut-panel-body`、`ut-panel-footer`

  + Less的层级结构不允许超过三层
  + **修改公用样式，采用BEM(Block, Element, Modifier)**，示列如下：
### *BEM LESS 样式如下*

```
  /* Block component */
  .btn {
      /* Element that depends upon the block */
      @at-root #{&}-price {}
      /* Modifier that changes the style of the block */
      @at-root #{&}-orange {}
      @at-root #{&}-big {}
  }
```

### *BEM CSS 样式如下*
```
  /* Block component */
  .btn {}
  /* Element that depends upon the block */
  .btn_price {}
  /* Modifier that changes the style of the block */
  .btn-orange {}
  .btn-big {}
```

### *BEM HTML 使用样式如下*
```
<a class="btn btn-big btn-orange" href=" ">
  <div class="nav-price">Item one</div>
  <div class="nav-price">Item two</div>
</a >
```

### *Panel 组件示列如下*
```
// #region Panel Components Less       -- 写上当前所属组件或者模块
// .ut-panel                           -- 每个样式有简单注释
.ut-panel {
  position: relative;
  // .ut-panel-header                  -- 注释换一行
  .ut-panel-header {
  }
  // .ut-panel-body
  .ut-panel-body {
  }
  // .ut-panel-footer
  .ut-panel-footer {
    position: relative;
    &::before {
      display: block;
      content: "";
      border-top: 1px solid #ccc;
      position: relative;
      width: 100%;
      bottom: 0;
      padding-top: 30px;
    }
  }
}
// .ui-btn-group
.ut-panel-footer .ui-button-group {
  .ui-button + .ui-button {
    margin-left: 20px;
  }
}
// #endregion

// 跨组件样式覆盖
:host ::ng-deep {

}
```

## **服务Service规范**
```
import { Injectable } from '@angular/core';
import { trim } from 'rxjs';
import { UtilService } from '@shared/services';

@Injectable()
export class CookieService {
  constructor(utilService: UtilService) {}
}
```

## **组件Component规范**
  + 组件分为通用组件和业务组件两大类
  + 通用组件设计规范，尽量少的公布属性及事件，不可涉及具体业务功能
  + 业务组件设计规范，公布的属性尽量通用，可以设计具体的业务功能；业务组件目的是让其使用更*简洁*

### *通用组件示列*
  + ...

### *业务组件示列*
  + ...

## **指令Directive规范**

```
import { Directive, Input, ElementRef, Renderer, AfterViewInit, forwardRef, Provider } from '@angular/core';
import { NG_VALUE_ACCESSOR, ControlValueAccessor, FormControl } from '@angular/forms';
import { Observable } from 'rxjs/Observable';

@Directive({
    selector: '[appDebounce]',
    // host: {'(change)': 'doOnChange($event.target)', '(blur)': 'onTouched()'},
    providers: [{
        provide: NG_VALUE_ACCESSOR,
        useExisting: forwardRef(() => DebounceDirective),
        multi: true
    }]
})

export class DebounceDirective implements ControlValueAccessor, AfterViewInit {

}
```

## **验证指令Validator规范**
```
import { OnChanges, Directive, StaticProvider, forwardRef, Input } from '@angular/core';
import { Validator, NG_VALIDATORS, AbstractControl, ValidationErrors, Validators } from '@angular/forms';

import { DMValidators } from './index';

/**
 * 特殊业务逻辑IPV4地址(ipv4)指令
 *
 * ### Example
 *
 * ```
 * <input type="text" name="ipv4" ngModel appIpv4>
 * <input type="text" name="ipv4" ngModel appIpv4="true">
 * <input type="text" name="ipv4" ngModel [appIpv4]="true">
 * ```
 *
 * @experimental
 */

@Directive({
    selector: '[appIpv4][formControlName],[appIpv4][formControl],[appIpv4][ngModel]',
    providers: [{
        provide: NG_VALIDATORS,
        useExisting: forwardRef(() => Ipv4Validator),
        multi: true
    }]
})

export class Ipv4Validator implements Validator {
    // 是否可用
    private _enabled: boolean;

    // 输入参数ipv4
    @Input()
    set ipv4(value: string) {

    }
}
```

## **模块定义Typings规范**

```
/**
 * 告警通知模块定义文件.d.ts
 *
 * Notice：命名规范：[di(依赖注入)]+[主模块名]+[子模块名]，如："di/system/alarm-notify"
 *         备注：主模块名 ->一级菜单项；子模块名 ->二级菜单项
 *
 * @see "app/business/system/alarm-notify/alarm-notify.model.d.ts"
 */
```