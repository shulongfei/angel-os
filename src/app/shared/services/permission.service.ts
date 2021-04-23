export enum Roles {

  SYS_ADMIN = 'SYS_ADMIN'

}


type PermissionConfigType = {

  [key in Roles]: PermissionConfigItem;

};


interface PermissionConfigItem {

  action: string[];

  accessUrls: any;

}


export const enum StorageKey {

  ErrorInfo = '__error_info__',

  PasswordStrategy = '__password_strategy__',

  AccountStrategy = '__account_strategy__',

  CurrentRole = '__current_role__',

  AccountName = '__account_name__',

  IsExpire = '__is_expire__',

  Timeout = '__timeout__',

  TimeSpan = '__timespan__',

  InitialStatus = '__initial_status__',

  SiteInfo = '__site_info__',

  FrontTaskQueen = '__front_task_queen__',

  AuthToken = 'X-Auth-Token',

  VncAuthToken = '__X_AUTH_TOKEN__',

  InitData = '__init_data__',

  IpManagement = '__ip_management__'

}


const PERMISSION_CONFIG: PermissionConfigType = {

  [Roles.SYS_ADMIN]: {

    // 操作权限列表

    action: [],


    // 路由访问权限列表, 当-1时默认全部

    accessUrls: [

      '^/home',

    ]

  }

};


export class PermissionService {


  constructor() { }


  // 根据角色判断是否有url访问权限

  isAccessByRole(url: string): boolean {

    // const currentRole = this._authService.getRole();

    const currentRole = 'SYS_ADMIN';

    if (!currentRole) {

      return false;

    }

    // TODO: 未知角色,直接退出登录(后面考虑添加403无权限页面)

    if (!PERMISSION_CONFIG[currentRole]) {

      // this._authService.logout();

      return false;

    }

    const accessUrls = PERMISSION_CONFIG[currentRole].accessUrls;

    if (accessUrls.includes('*')) {

      return true;

    }

    return !!(accessUrls || []).filter(item => {

      return new RegExp(item, 'gi').test(url);

    }).length;


  }

}