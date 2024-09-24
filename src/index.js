module.exports = function check(str, bracketsConfig) {
  const stack = [];

  for (let i = 0; i < str.length; i++) {
    const lastItem = stack[stack.length - 1];
    const currentItem = str[i];
    let configTypeIndex = 0;
    bracketsConfig.forEach((item, index) =>
      item.indexOf(currentItem) !== -1 ? (configTypeIndex = index) : null
    );

    const openBracket = bracketsConfig[configTypeIndex][0];
    const closeBracket = bracketsConfig[configTypeIndex][1];
    const isEqualBrackets = openBracket === closeBracket;
    if (stack.length > 0) {
      if (isEqualBrackets) {
        if (lastItem === currentItem) {
          stack.pop();
        } else {
          stack.push(currentItem);
        }
      } else {
        if (currentItem === openBracket) {
          stack.push(currentItem);
        }
        if (currentItem === closeBracket && lastItem === openBracket) {
          stack.pop();
        }
      }
    } else {
      if (closeBracket === currentItem && !isEqualBrackets) {
        return false;
      } else {
        stack.push(currentItem);
      }
    }
  }

  return stack.length === 0;
};
