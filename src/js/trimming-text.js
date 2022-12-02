export const textTrim = (str, lastSymbolNumber) => {
  array = str.split('');
  array.length > lastSymbolNumber
    ? array.splice(lastSymbolNumber, array.length - lastSymbolNumber, '...')
    : array;
  return array.join('');
};
