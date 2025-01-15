
// 中奖金额根据概率随机生成
function getRandomAmount() {
    const amounts = [5, 10, 20, 50, 100];
    const probabilities = [0.1, 0.15, 0.2, 0.25, 0.30];
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

window.onload = function() {
    // 保证一屏展示完
    const rect = document.getElementById('game-board').getBoundingClientRect();
    document.querySelector('.zcm').style.height = `${window.innerHeight - rect.height}px`; 
};

document.addEventListener('DOMContentLoaded', function () {
    const gameBoard = document.getElementById('game-board');
    const cells = [];
    let spinning = false;
    let interval;
    let currentIndex = 0;

    // 创建25个格子
    const gridSize = 5; // 可以更改为其他值,如6表示36宫格
    const totalCells = gridSize * gridSize;
    for (let i = 0; i < totalCells; i++) {
        const cell = document.createElement('div');
        cell.classList.add('cell');
        if (!spinning && i === 12) {
            cell.classList.add('glowing');
        } else {
            cell.classList.add('hidden');
        }
        cell.dataset.index = i;
        const img = document.createElement('img');
        img.src = "./bg.png";
        img.classList.add("bg-img");
        cell.appendChild(img);
        const mask = document.createElement('div');
        mask.classList.add('mask');
        mask.dataset.index = i;
        cell.appendChild(mask);
        gameBoard.appendChild(cell);
        cells.push(cell);
    }

    // 定义完整的转动路径
    const sequence = [
        12, 13, 18, 17, 16, 11, 6, 7, 8, 9, 14, 19, 24, 23, 22
        , 21, 20, 15, 10, 5, 0, 1, 2, 3, 4, 9, 14, 19, 24, 23, 22, 21, 20, 15,
        10, 5, 6, 7, 8, 13, 18, 17, 16, 11, 12
    ];

    // 开始转动逻辑
    function startSpinning() {
        const dom = document.querySelector('.popup-box');
        if (Array.from(dom.classList).includes('active')) {
            dom.classList.remove('active');
            cells[sequence[currentIndex]].classList.remove('hidden');
            cells[sequence[currentIndex]].classList.add('glowing');
            return;
        }
        spinning = true;

        // 显示起始格子
        cells[sequence[currentIndex]].classList.remove('hidden');
        cells[sequence[currentIndex]].classList.remove('glowing');
        document.querySelector('.popup-box').classList.remove('active');

        interval = setInterval(() => {
            // 隐藏当前格子并显示下一个格子
            cells[sequence[currentIndex]].classList.add('hidden');
            currentIndex = (currentIndex + 1) % sequence.length;
            cells[sequence[currentIndex]].classList.remove('hidden');
        }, 100); // 转动间隔时间
    }

    // 停止转动逻辑
    function stopSpinning() {
        clearInterval(interval);
        spinning = false;

        // 显示最终结果（当前显示的格子）
        // const winningIndex = cells.findIndex(cell => !cell.classList.contains('hidden'));
        setTimeout(() => {
            const dom = document.querySelector('.popup-box');
            dom.innerHTML = `恭喜，抽中${getRandomAmount()}元`
            dom.classList.toggle('active');
        }, 1000);
        // alert(`你抽到了第 ${winningIndex + 1} 格！`);
    }

    // 重置游戏状态
    function resetGame() {
        // 重置所有格子为隐藏状态
        cells.forEach((cell, i) => {
            if (i === 12) {
                cell.classList.add('glowing')
            } else {
                cell.classList.add('hidden')
            }
    });
        currentIndex = 0;
    }
   // 监听点击和触摸事件，允许在页面任意位置触发
    document.querySelector('#game-board').addEventListener('keydown', handleInteraction, { passive: false });
    document.querySelector('#game-board').addEventListener('touchend', handleInteraction, { passive: false });

    function handleInteraction(event) {
        console.log(event);
        if (!spinning) {
            resetGame();
            startSpinning();  // 模拟点击“开始”按钮
        } else {
            stopSpinning(); // 模拟点击“停止”按钮
        }
    }
});
