type PlainObject<T = unknown> = {
  [k in string]: T;
};

export function cloneDeep(obj: unknown) {

  const cloneArray = (item: unknown[]) => {
    let newArray: unknown[] = []
    for (let i = 0; i < item.length; i++) {
      newArray[i] = checkType(item[i])
    }
    return newArray
  }
  const cloneObject = (item: PlainObject) => {
    let newObject: PlainObject = {}
    for (let [key, value] of Object.entries(item)) {
      newObject[key] = checkType(value)
    }
    return newObject
  }
  const checkType = (item: unknown) => {
    if (item === null) {
      return null
    } else {
      if (typeof item === 'object') {
        if (Array.isArray(item)) {
          return cloneArray(item)
        } else {
          return cloneObject((item as PlainObject))
        }
      } else {
        return item
      }
    }
  }
  return checkType(obj)
}