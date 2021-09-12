import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map as _map } from 'lodash'
import { of } from 'rxjs';
import { tap } from 'rxjs/operators';
import { CookieService } from './cookie.service'

export declare type I18nLanguage = 'zh-cn' | 'en-us';

@Injectable({
  providedIn: 'root'
})

export class I18NService {
  // 语言key值
  languageKey = 'language';
  // 语言, 默认支持zh-cn, en-us
  language: I18nLanguage = 'zh-cn';
  // 国际化资源
  resource = {};
  // 支持的语言
  supportLanguages = ['zh-cn', 'en-us'];
  // 默认语言
  defaultLanguage: I18nLanguage = 'zh-cn';
  // 是否是中文

  get isZh() {
    return this.language === 'zh-cn';
  }

  constructor(
    private http: HttpClient,
    private cookie: CookieService
  ) {
    this.initLanguage();
  }

  /**
   * 语言初始化
   * 优先级: 1.cookie 2.浏览器语言 3.默认zh-cn
   */

  initLanguage() {
    this.language = (
      this.cookie.get(this.languageKey) || navigator.language
    ).toLowerCase();
    if (this.supportLanguages.indexOf(this.language) === -1) {
      this.language = this.defaultLanguage;
    }
  }

  /**
   * 切换语言, 会重新加载页面
   * @param language 语言
   */
  changeLanguage(language) {
    this.language = language;
    this.cookie.set(this.languageKey, this.language);
    window.location.reload();
  }

  /**
   * 实时获取当前语言
   * @param language 语言
   */
  getLanguage() {
    const language = this.cookie.get(this.languageKey);
    return language || this.defaultLanguage;
  }

  /**
   * 加载国际化资源
   * @param resource 远端资源地址(en/i18n.json)或资源对象({xxkeyid:xxkeyvalue})
   */
  load(resource) {
    if (typeof resource === 'string') {
      return this.http.get(resource).pipe(
        tap(r => {
          Object.assign(this.resource, r);
        })
      );
    } else {
      return of(resource).pipe(
        tap(r => {
          Object.assign(this.resource, resource);
        })
      );
    }
  }

  /**
   * 获取国际化信息
   * @param key     i18n资源的key
   * @param params  i18n中占位符内要填充的内容
   * @param colon   是否要带冒号输出，默认不带冒号（false）
   */
  get(
    key: string,
    params?: { [key: string]: any } | number[],
    colon?: boolean
  ): string {
    let i18nStr = this.resource[key] || key || '';
    const i18nParams = params || [],
      getKeyRegexp = str => {
        return new RegExp(`\\{${str}\\}`, 'gi');
      };

    _map(i18nParams, (item, k) => {
      i18nStr = i18nStr.replace(getKeyRegexp(k), item);
    });
    i18nStr += colon ? (this.language === 'zh-cn' ? '：' : ': ') : '';
    return i18nStr;
  }
}
