type ObjectValueType = {
  [index: string]: any
}

export function getObjectValue(obj: {}, path: string, defaultValue: string = ''): any {
  const keys = path.split('.');
  let result: ObjectValueType = obj;
  for (let key of keys) {
    result = result[key];
    if (result === undefined) {
      return defaultValue;
    }
  }
  return result ?? defaultValue;
}