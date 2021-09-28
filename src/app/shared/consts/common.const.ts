export const enum HttpStatusCodes {
  Ok = 200,
  BadRequest = 400,
  Unauthorized = 401,
  Forbidden = 403,
  NotFound = 404,
  RequestTimeout = 408,
  UnsupportedMediaType = 415,
  InternalServerError = 500,
  BadGateway = 502,
  GatewayTimeout = 504
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