const useSpinalCase = (str) => {
  const lowercase = str.trim();
  const regEx = /\W+|(?=[A-Z])|_/g;

  let result = lowercase.split(regEx).join(' ');
  if (lowercase.includes('ID')) {
    result = result.slice(0, result.length - 2)
      + result.slice(result.length - 1, result.length);
  }

  result = result.charAt(0).toUpperCase() + result.slice(1);

  return result;
};

export default useSpinalCase;
