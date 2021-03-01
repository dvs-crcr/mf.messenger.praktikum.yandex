import { mergeObjects} from './mergeObjects.js'

type Indexed<T = unknown> = {
  [key in string]: T;
};

export function setObject(object: Indexed | unknown, path: string, value: unknown): Indexed | unknown {
  const createObjectByPath = (path: string, value: unknown) => {
    return path.split('.').reduceRight((newObject: Indexed | unknown, key: string) => {
      return {[key]: newObject};
    }, value);
  };

	if (typeof path !== 'string') {
    throw new Error('path must be string');
  }
  if (typeof object !== 'object' || object === null) {
    return object;
  }

  return mergeObjects((object as Indexed<unknown>), (createObjectByPath(path, value) as Indexed<unknown>));
}