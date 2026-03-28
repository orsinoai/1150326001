const runner1 = document.getElementById('runner1');
const runner2 = document.getElementById('runner2');
const message = document.getElementById('message');
const boostBtn = document.getElementById('boostBtn');
const resetBtn = document.getElementById('resetBtn');
const progress1El = document.getElementById('progress1');
const progress2El = document.getElementById('progress2');

const finishPosition = 720;
let pos1 = 0;
let pos2 = 0;
let intervalId = null;
let active = false;

function updatePositions() {
  runner1.style.transform = `translateX(${pos1}px)`;
  runner2.style.transform = `translateX(${pos2}px)`;
  progress1El.textContent = `${Math.min(100, Math.floor((pos1 / finishPosition) * 100))}%`;
  progress2El.textContent = `${Math.min(100, Math.floor((pos2 / finishPosition) * 100))}%`;
}

function endRace(winner) {
  active = false;
  clearInterval(intervalId);
  intervalId = null;
  message.textContent = winner === 1 ? '媽媽衝過終點了！祝你母親節快樂！' : '孩子先抵達終點，媽媽快追上！';
  boostBtn.disabled = true;
}

function startRace() {
  if (active) return;
  active = true;
  message.textContent = '比賽開始！繼續按愛心加速吧！';
  boostBtn.disabled = false;

  intervalId = setInterval(() => {
    const natural1 = Math.random() * 3 + 1;
    const natural2 = Math.random() * 3 + 1;
    pos1 += natural1;
    pos2 += natural2;

    if (pos1 >= finishPosition || pos2 >= finishPosition) {
      if (pos1 >= finishPosition && pos1 >= pos2) {
        pos1 = finishPosition;
        pos2 = Math.min(pos2, finishPosition);
        updatePositions();
        endRace(1);
      } else {
        pos2 = finishPosition;
        pos1 = Math.min(pos1, finishPosition);
        updatePositions();
        endRace(2);
      }
      return;
    }

    updatePositions();
  }, 80);
}

function boost() {
  if (!active) {
    startRace();
  }

  const boostValue = Math.random() * 14 + 12;
  const otherValue = Math.random() * 5 + 3;
  pos1 += boostValue;
  pos2 += otherValue;
  
  if (Math.random() < 0.5) {
    message.textContent = '媽媽獲得愛心加速，步伐更輕盈！';
  } else {
    message.textContent = '孩子也被鼓舞了，兩邊都在努力前進！';
  }
  updatePositions();

  if (pos1 >= finishPosition || pos2 >= finishPosition) {
    if (pos1 >= pos2) {
      pos1 = finishPosition;
      endRace(1);
    } else {
      pos2 = finishPosition;
      endRace(2);
    }
  }
}

function resetGame() {
  clearInterval(intervalId);
  intervalId = null;
  active = false;
  pos1 = 0;
  pos2 = 0;
  runner1.style.transform = 'translateX(0)';
  runner2.style.transform = 'translateX(0)';
  updatePositions();
  message.textContent = '已重新開始，準備好再次出發！';
  boostBtn.disabled = false;
}

boostBtn.addEventListener('click', boost);
resetBtn.addEventListener('click', resetGame);

resetGame();
