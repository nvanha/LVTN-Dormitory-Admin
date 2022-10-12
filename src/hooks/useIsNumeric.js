/* eslint-disable no-restricted-globals */

/**
 * console..log(useIsNumeric(123)); // true
 * console..log(useIsNumeric(123aa)); // false
 * console..log(useIsNumeric(abc)); // false
 */

const useIsNumeric = (num) => !isNaN(num);

export default useIsNumeric;
