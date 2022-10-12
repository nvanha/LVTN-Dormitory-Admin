const subtractMonths = (numOfMonths, date = new Date()) => {
  date.setMonth(date.getMonth() - numOfMonths);

  return date;
};

export default subtractMonths;
