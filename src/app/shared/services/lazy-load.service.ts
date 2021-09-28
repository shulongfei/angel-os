import {
  Injectable,
  ViewContainerRef,
  ComponentFactoryResolver,
  ComponentRef,
  NgZone,
  Type,
  ReflectiveInjector,
  EventEmitter,
  ApplicationRef,
  Injector
} from '@angular/core';

import { map, assign, filter } from 'lodash';

@Injectable({
  providedIn: 'root'
})
export class LazyloadService {

  // 组件引用
  private container: ComponentRef<any> = null;

  // 根节点引用
  private vcf: ViewContainerRef;

  // 根节点引用
  private rootVcf: ViewContainerRef;

  // 配置默认选项
  private defaultOptions = {
    provider: [],
    refresh: false // 刷新标识
  };

  /**
   * Creates an instance of LazyloadService.
   * @param {Http} vcf ViewContainerRef容器
   * @memberof LazyloadService
   */

  constructor(
    private ngZone: NgZone,
    private resolver: ComponentFactoryResolver,
    private injector: Injector
  ) { }

  // 设置根节点
  setVcf(vcf: ViewContainerRef) {
    this.vcf = vcf;
  }

  /**
   * 动态加载组件
   *
   * @template T 泛型类型
   * @param {T} component 组件类
   * @param {*} options 组件选项
   * @memberof UtilService
   */

  dynamicComponent<T>(component: Type<T>, options?: any) {

    // 创建组件工厂
    const tFactory = this.resolver.resolveComponentFactory<T>(component);

    //  若无刷新标识，则重新创建组件
    const refresh = options.refresh;
    delete options.refresh;
    if (!refresh) {
      // 加载依赖项
      const tProvider = ReflectiveInjector.resolve(options.provider);
      const tInjector = ReflectiveInjector.fromResolvedProviders(
        tProvider,
        this.vcf.parentInjector
      );

      // 创建动态组件
      this.container = this.vcf.createComponent<T>(
        tFactory,
        this.vcf.length,
        tInjector
      );
    }

    // 配置动态属性
    const instance: any = this.container.instance as T;

    // TODO：只映射inputs和outputs公布属性，防止内部变量污染
    map(options, (value, key) => {
      const filterOutputs = filter(
        tFactory.outputs,
        output => output.templateName === key
      );

      const filterInputs = filter(
        tFactory.inputs,
        input => input.templateName === key
      );

      // 处理outputs属性
      if (filterOutputs && filterOutputs.length) {
        // outputs属性需调用subscribe
        const propOutput = filterOutputs[0].propName;
        (instance[propOutput] as EventEmitter<any>).subscribe(event =>
          value(event)
        );
      } else if (filterInputs && filterInputs.length) {
        // 处理inputs属性
        // outputs属性需调用subscribe
        const propInput = filterInputs[0].propName;
        instance[propInput] = value;
      } else {
        instance[key] = value;
      }
    });

    // 更新组件及子组件值
    this.container.changeDetectorRef.detectChanges();

    // 渲染后的Html元素
    instance.renderHtml = this.container.location.nativeElement.innerHTML;
    instance.nativeElement = this.container.location.nativeElement;
    return instance;
  }

  /**
   * 加载动态组件
   *
   * @template T 泛型类型
   * @param {ViewContainerRef} vfc 组件引用
   * @param {Type<T>} component 动态加载的组件类
   * @param {*} [opt] 动态加载的组件选项
   * @memberof LazyloadService
   */

  load<T>(vfc: ViewContainerRef, component: Type<T>, opt?: any) {

    const options = assign({}, this.defaultOptions, opt);
    this.setVcf(vfc);
    if (!options.refresh && this.container) {
      this.vcf.clear();
    }

    return this.dynamicComponent(component, options);
  }

  /**
   * 在根节点加载动态组件
   *
   * @template T 泛型类型
   * @param {Type<T>} component 动态加载的组件类
   * @param {*} [opt] 动态加载的组件选项
   * @memberof LazyloadService
   */

  loadRoot<T>(component: Type<T>, opt?: any) {
    if (!this.rootVcf) {
      let applicationRef: ApplicationRef = this.injector.get(ApplicationRef);
      let viewContainerRef = applicationRef.components[0].instance.viewContainerRef;
      if (!viewContainerRef) {
        throw '需要在app.ts中引入viewContainerRef';
      }
      this.rootVcf = viewContainerRef;
    }
    return this.load(this.rootVcf, component, opt);
  }

  /**
   * 销毁动态组件
   *
   * @memberof LazyloadService
   */
  dispose() {
    if (!this.container) {
      return;
    }
    this.container.destroy();
    this.container = null;
  }

}


