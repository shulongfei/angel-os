import { from, zip } from "rxjs";
import { I18NService } from "../services";
import { getI18nResource, I18N_CONFIG } from "../services/preload-i18n-resolver.service";
import { ICONS_CONFIG } from "./icons-config.config"

export class SharedConfig {
  // 配置入口
  static config(i18n: I18NService) {
    SharedConfig.lvConfig(i18n);
    SharedConfig.iconConfig();
    return () => SharedConfig.I18NConfig(i18n);
  }

  // I18N服务配置
  static I18NConfig(i18n: I18NService) {
    const preloadModules = I18N_CONFIG.initI18n;
    const i18nStream = preloadModules.map(module =>
      getI18nResource(i18n, module)
    );
    return zip(...i18nStream).toPromise();
  }

  // icon配置
  static iconConfig() {
    document.body.insertAdjacentHTML('afterbegin', ICONS_CONFIG);
  }

  // 组件配置
  static lvConfig(i18n: I18NService) {
    // LvConfig.language = i18n.language as any;
    // LvConfig.operationMenuOptions = {
    //   lvMaxShowNum: 3
    // };

    // message config
    // LvConfig.messageOptions = {
    //   lvPosition: 'topRight',
    //   lvDuration: 5 * 1e3,
    //   lvKeepShowOnHover: true,
    //   lvMaxWidth: '400px'
    // };

    // page config
    // LvConfig.paginatorOptions = {
    //   lvPageSize: 10,
    //   lvPageSizeOptions: [10, 20, 30, 50]
    // };


    // form config
    // LvConfig.formOptions = {
    //   lvLabelColon: false
    // };

    // tooltip config

    // LvConfig.tooltipOptions = {
    //   lvTheme: 'light'
    };

  }