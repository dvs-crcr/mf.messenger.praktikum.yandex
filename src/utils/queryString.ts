export type StringIndexed = Record<string, unknown>;

function queryString(data?: StringIndexed): string | never {

  if (typeof data === 'undefined') {
    return '';
  }
  
  const getPrimitiveValue = (key: string, value: unknown): [string, string] | false => {
    if (typeof value === 'number' || typeof value === 'bigint') {
      return [key, value.toString()]
    }
    if (typeof value === 'string') {
      return [key, value]
    }
    if (typeof value === 'boolean') {
      return [key, (value?'true':'false')]
    }
    return false
  }

  const getObjectValue = (key: string, value: StringIndexed): string[] => {
    let arr: string[] = []
    for (let index in value) {
      const valData = checkobjectType(`${key}[${index}]`, value[index])
      arr = arr.concat(valData)
    }
    return arr
  }

  const checkobjectType = (key: string, value: unknown) => {
    let arr: string[] = []
    if (typeof value === 'object') {
      if (value === null) {
        arr.push([key, 'null'].join('='))
      } else {
        const valData = getObjectValue(key, (value as StringIndexed))
        arr = arr.concat(valData)
      }
    } else {
      const valData = getPrimitiveValue(key, value)
      if (valData !== false) {
        const [ key, value ] = valData
        arr.push(`${key}=${encodeURIComponent(value)}`)
      }
    }
    return arr
  }

  if (data && typeof data === 'object' && !Array.isArray(data)) {
    let arr: string[] = []
    for (let key in data) {
      arr = arr.concat(checkobjectType(key, data[key]))
    }
    return arr.join('&')
  } else {
    throw new Error('input must be an object');
  }

}

export default queryString