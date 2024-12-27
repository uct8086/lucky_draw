function getRandomAmount() {
    const amounts = [5, 10, 20, 50, 100];
    const probabilities = [0.1, 0.1, 0.1, 0.25, 0.45];
    const random = Math.random();
    let cumulativeProbability = 0;
  
    for (let i = 0; i < probabilities.length; i++) {
      cumulativeProbability += probabilities[i];
      if (random < cumulativeProbability) {
        return amounts[i];
      }
    }
  
    return amounts[amounts.length - 1]; // 默认返回最后一个面值
  }
  
  // 测试并统计结果
  const testCount = 10000;
  const results = { 5: 0, 10: 0, 20: 0, 50: 0, 100: 0 };
  
  for (let i = 0; i < testCount; i++) {
    const amount = getRandomAmount();
    results[amount]++;
  }
  
  console.log("统计结果：");
  console.log(`5元: ${results[5]} 次, 概率: ${(results[5] / testCount * 100).toFixed(2)}%`);
  console.log(`10元: ${results[10]} 次, 概率: ${(results[10] / testCount * 100).toFixed(2)}%`);
  console.log(`20元: ${results[20]} 次, 概率: ${(results[20] / testCount * 100).toFixed(2)}%`);
  console.log(`50元: ${results[50]} 次, 概率: ${(results[50] / testCount * 100).toFixed(2)}%`);
  console.log(`100元: ${results[100]} 次, 概率: ${(results[100] / testCount * 100).toFixed(2)}%`);