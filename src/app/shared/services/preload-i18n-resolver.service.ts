import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { from, Observable, of, throwError } from 'rxjs';
import { catchError, mergeMap, retry } from 'rxjs/operators';

import { 
  forEach as _forEach,
  indexOf as _indexOf
} from 'lodash';

import { I18NService } from './i18n.service'

export const I18N_CONFIG = {
  // 系统默认加载的国际化文件
  initI18n: ['common', 'errorcode'],

  // 根据不同路由加载对应国际化文件
  urlToI18nMap: {
    // 匹配的路由: 需要加载国际化文件
    '^/home': ['home'],
    '^/system': ['system'],
    '^/login': ['login'],
  },

  // 国际化文件加载失败，支持重试n次
  retry: 3,

  // 国际化文件资源前缀
  assetsPrefix: 'assets/i18n/'
};

/**
 * 获取I18n资源
 *
 * @export
 * @param {I18NService} i18n I18n服务
 * @param {string} moduleName I18n资源模块名
 */

 export function getI18nResource(i18n: I18NService, moduleName: any) {
  if (!moduleName) {
    return throwError('I18n Module No Config!');
  }
  // 适配系统国际化文件夹不同情况
  const resourceUrl = `${I18N_CONFIG.assetsPrefix}${i18n.language}/${moduleName}.json`;
  return i18n.load(resourceUrl).pipe(
    retry(I18N_CONFIG.retry),
    catchError(error => {
      console.error('Error loading i18n file: %o', error);
      return of('Load I18n Module Error!');
    })
  );
}

@Injectable({
  providedIn: 'root'
})

export class PreloadI18nResolverService implements Resolve<any> {
  
  // 已加载的资源模块
  loadedModules = [];
  constructor(private i18n: I18NService) {}

  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<any> {
    const url = state.url;
    const requestModule: string[] = [];
    // 过滤出未加载的模块名
    _forEach(I18N_CONFIG.urlToI18nMap, (value: string, key: string) => {
      if (!new RegExp(key, 'gi').test(url)) {
        return true;
      }
      _forEach(value, item => {
        // 避免重复加载相同资源模块
        if (this.has(item)) {
          return true;
        }
        this.loadedModules.push(item);
        requestModule.push(item);
      });
    });

    // 批量获取I18n资源
    return of(...requestModule).pipe(
      mergeMap(module => getI18nResource(this.i18n, module))
    );
  }

  // 是否已经存在
  has(item: string) {
    return _indexOf(this.loadedModules, item) !== -1;
  }

  // 添加已加载的国家化模块
  append(item: any) {
    // 避免重复加载相同资源模块
    if (this.has(item)) {
      return;
    }
    this.loadedModules.push(item);
  }

  // 清空已加载的国际化模块
  clear() {
    this.loadedModules.length = 0;
  }
}


