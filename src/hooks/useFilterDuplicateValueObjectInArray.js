const useFilterDuplicateValueObjectInArray = (array) => {
  const unique = (value, index, self) => self.indexOf(value) === index;

  const uniqueAges = array?.map((item) => JSON.stringify(item))?.filter(unique);

  return uniqueAges?.map((item) => JSON.parse(item));
};

export default useFilterDuplicateValueObjectInArray;
