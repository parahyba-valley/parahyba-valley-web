export const getValueFromScope = (path: string, scope: Object): any => {
  let finalValue = null;
  let currentScope = scope;
  const splittedPath = path.split('.');

  for(let i = 0; i < splittedPath.length; i++) {
    // @ts-expect-error
    currentScope = currentScope[splittedPath[i]];

    if (currentScope !== undefined) {
      finalValue = currentScope;
    } else {
      finalValue = undefined;
      break;
    }
  }

  return finalValue;
};