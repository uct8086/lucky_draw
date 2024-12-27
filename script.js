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
        cell.classList.add('cell', 'hidden');
        cell.dataset.index = i;
        cell.innerHTML = i;
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
        spinning = true;

        // 显示起始格子
        cells[sequence[currentIndex]].classList.remove('hidden');

        interval = setInterval(() => {
            // 隐藏当前格子并显示下一个格子
            cells[sequence[currentIndex]].classList.add('hidden');
            currentIndex = (currentIndex + 1) % sequence.length;
            cells[sequence[currentIndex]].classList.remove('hidden');
        }, 40); // 转动间隔时间
    }

    // 停止转动逻辑
    function stopSpinning() {
        clearInterval(interval);
        spinning = false;

        // 显示最终结果（当前显示的格子）
        const winningIndex = cells.findIndex(cell => !cell.classList.contains('hidden'));
        alert(`你抽到了第 ${winningIndex + 1} 格！`);
    }

    // 重置游戏状态
    function resetGame() {
        // 重置所有格子为隐藏状态
        cells.forEach(cell => cell.classList.add('hidden'));
        currentIndex = 0;
    }
   // 监听点击和触摸事件，允许在页面任意位置触发
    document.addEventListener('keydown', handleInteraction, { passive: false });
    document.addEventListener('touchend', handleInteraction, { passive: false });

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