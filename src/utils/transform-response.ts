import { mapKeys } from 'lodash';

export const transformId = (obj: any) => {
  if (typeof obj === 'object' && obj !== null) {
    if (obj?.constructor === Array) {
      obj = obj.map((o) => transformId(o));
    } else {
      obj = mapKeys(obj, (value, key) => (key === 'id' ? '_id' : key));

      for (const key in obj) {
        obj[key] = transformId(obj[key]);
      }
    }
  }

  return obj;
};
