export const getvalueFromState = (path: string, state: Object): any => {
  let finalValue = null;
  let currentState = state;
  const splittedPath = path.split('.');

  for(let i = 0; i < splittedPath.length; i++) {
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