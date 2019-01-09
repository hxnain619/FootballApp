const groupListByDate = (list, nameVariableDate) => {
  let listArr = [];
  for (let key in list) {
    listArr.push(list[key]);
  }
  const uniqueElements = (elem, index, self) =>
    self.findIndex(i => i[nameVariableDate] === elem[nameVariableDate]) ===
    index;

  const groupByDates = listArr
    .filter(uniqueElements)
    .map(ele => ele[nameVariableDate]);

  const groupByDateSorted = groupByDates.sort();

  let finalResult = [];
  groupByDateSorted.forEach(date =>
    finalResult.push({
      dateMatchs: date,
      matchs: listArr.filter(match => match[nameVariableDate] === date)
    })
  );

  return finalResult;
};

export { groupListByDate };
