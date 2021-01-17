import HTMLElement from '../interfaces/pv-html-element.interface';
import IPVObject from '../interfaces/pv-object.interface';
import directives from '~/pv-parahyba/directives';

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

  for (let i = 0; i < item1.length; i += 1) {
    const value1 = item1[i];
    const value2 = item2[i];

    if ((typeof (value1) !== 'object' && item2.indexOf(value1) < 0) || !isEqual(value1, value2)) {
      return false;
    }
  }

  return true;
};

export const elementWasCompiledByHimself = (element: HTMLElement): Boolean => (
  Boolean(element.pv && element.pv.compiled)
);

export const elementHasDirective = (element: HTMLElement): boolean => {
  let hasDirectiveAttribute = false;

  Array.from(element.attributes).forEach((attribute) => {
    if (directives[attribute.localName]) {
      hasDirectiveAttribute = true;
    }
  });

  return hasDirectiveAttribute;
};
