type Indexed<T = unknown> = {
  [key in string]: T;
};

export function mergeObjects(lhs: Indexed, rhs: Indexed): Indexed {
  const isObject = (value: unknown) => {
    if (value && value !== null && typeof value === 'object' && !Array.isArray(value)) {
      return true
    }
    return false
  }
  for (let key in rhs) {
    if (typeof lhs[key] === 'undefined') {
      lhs[key] = rhs[key]
    } else {
      if (isObject(lhs[key]) && isObject(rhs[key])) {
        mergeObjects((lhs[key] as Indexed<unknown>), (rhs[key] as Indexed<unknown>))
      } else {
        lhs[key] = rhs[key]
      }
    }
  }
  return lhs
}