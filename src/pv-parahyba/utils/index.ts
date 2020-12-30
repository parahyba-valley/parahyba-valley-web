import IPVObject from '../interfaces/pv-object.interface';

export const getValueFromState = (path: string, state: Object): any => {
  let finalValue = null;
  let currentState = state;
  const splittedPath = path.split('.');

  for (let i = 0; i < splittedPath.length; i += 1) {
    // @ts-expect-error
    currentState = currentState[splittedPath[i]];

    if (currentState !== undefined) {
      finalValue = currentState;
    } else {
      finalValue = undefined;
      break;
    }
  }

  return finalValue;
};

export const compareObjects = (item1: IPVObject, item2: IPVObject): boolean => {
  let hasDiff = false;
  Object.keys(item1).forEach((key) => {
    if (!isEqual(item1[key], item2[key])) {
      hasDiff = true;
    }
  });

  return !hasDiff;
};

export const isEqual = (item1: any, item2: any): boolean => {
  const type1 = typeof (item1);
  const type2 = typeof (item2);

  if (type1 !== type2) return false;

  if (type1 !== 'object') return item1 === item2;

  if (!Array.isArray(item1) && !Array.isArray(item2)) return compareObjects(item1, item2);

  const length1 = item1.length;
  const length2 = item2.length;

  if (length1 !== length2) return false;
  if (length1 === 0) return true;

  let equals = true;

  for (let i = 0; i < item1.length; i += 1) {
    const value1 = item1[i];

    if (typeof (value1) !== 'object' && item2.indexOf(value1) < 0) {
      equals = false;
      break;
    }

    for (let w = 0; w < item2.length; w += 1) {
      const value2 = item2[w];

      if (!isEqual(value1, value2)) {
        equals = false;
        break;
      }
    }
  }
  return equals;
};
