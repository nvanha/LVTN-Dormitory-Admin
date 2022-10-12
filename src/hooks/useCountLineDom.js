const useCountLineDom = (ref) => {
  const divHeight = ref.current.offsetHeight;
  const lineHeight = parseInt(ref.current.style.lineHeight);
  const lines = divHeight / lineHeight;
  return lines;
};

export default useCountLineDom;
