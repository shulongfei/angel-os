import { isString as _isString} from 'lodash'

export function deserialize(val: string, defaultVal: string = '') {
  if (!val) {
    return defaultVal;
  }
  let parseVal;
  try {
    parseVal = JSON.parse(val);
  } catch (e) {
    parseVal = val;
  }
  return parseVal !== undefined ? parseVal : defaultVal;
}


export function serialize(obj: any): string {
  if (_isString(obj)) {
    return obj;
  }
  return JSON.stringify(obj);
}


