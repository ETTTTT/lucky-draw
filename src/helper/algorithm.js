/**
 * 取范围内随机整数
 * @param {number} minNum
 * @param {number} maxNum
 */
export function randomNum(minNum = 1, maxNum) {
  return parseInt(Math.random() * (maxNum - minNum + 1) + minNum, 10);
}
const getHeroId = function(lolList) {
  let arr = [];
  lolList.map(item => {
    arr.push(item.key);
  });
  return arr;
};
/**
 * 单次抽奖
 * @param {number} total 总人数
 * @param {array} won 已中奖
 * @param {number} num 本次抽取人数
 */
export function luckydrawHandler(lolList, won = [], num) {
  const heroId = getHeroId(lolList);
  const wons = won;
  const res = [];
  for (let j = 0; j < num; j++) {
    const nodraws = heroId.filter(item => !wons.includes(item));
    const current = nodraws[randomNum(1, nodraws.length) - 1];
    res.push(current);
    wons.push(current);
  }
  return res;
}
