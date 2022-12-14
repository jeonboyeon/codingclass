const tetrisWrap = document.querySelector(".tetris__wrap");
const playground = tetrisWrap.querySelector(".playground > ul");
const tetrisStartBtn = tetrisWrap.querySelector(".tetris__start");
const tetrisReStartBtn = tetrisWrap.querySelector(".tetris__restart");
const tetrisScores = tetrisWrap.querySelector(".tetris_score");
const tetrisScores2 = tetrisWrap.querySelector(".tetris_score2");
const tetrisClose = tetrisWrap.querySelector(".tetris__close");
const tetrisIco = document.querySelector(".icon5");
const tetrisAudio = document.querySelector("#tetrisAudio");
const tetrisClear = document.querySelector("#tetrisClear");
const tetrisOut = document.querySelector("#tetrisOut");

// 토탈 스코어
const totalScore = document.querySelector(".total__score");
// 다시 시작 버튼
const tetrisRestartBtn = document.querySelector(".tetris__restart");

tetrisIco.addEventListener("click", () => {
    tetrisWrap.classList.add("show");
});
tetrisClose.addEventListener("click", () => {
    tetrisWrap.classList.remove("show");
    tetrisOver();
});

// variables
let rows = 20;
let cols = 15;
let tetrisScore = 0;
let duration = 500;
let downInterval;
let tempMovingItem;
// 블록 정보
const movingItem = {
    type: "Imino",
    direction: 0, //블록 모양
    top: 0,
    left: 6,
};
// 블록 좌표값
const blocks = {
    Tmino: [
        [
            [2, 1],
            [0, 1],
            [1, 0],
            [1, 1],
        ],
        [
            [1, 2],
            [0, 1],
            [1, 0],
            [1, 1],
        ],
        [
            [1, 2],
            [0, 1],
            [2, 1],
            [1, 1],
        ],
        [
            [2, 1],
            [1, 2],
            [1, 0],
            [1, 1],
        ],
    ],
    Imino: [
        [
            [0, 0],
            [0, 1],
            [0, 2],
            [0, 3],
        ],
        [
            [0, 0],
            [1, 0],
            [2, 0],
            [3, 0],
        ],
        [
            [0, 0],
            [0, 1],
            [0, 2],
            [0, 3],
        ],
        [
            [0, 0],
            [1, 0],
            [2, 0],
            [3, 0],
        ],
    ],
    Omino: [
        [
            [0, 0],
            [0, 1],
            [1, 0],
            [1, 1],
        ],
        [
            [0, 0],
            [0, 1],
            [1, 0],
            [1, 1],
        ],
        [
            [0, 0],
            [0, 1],
            [1, 0],
            [1, 1],
        ],
        [
            [0, 0],
            [0, 1],
            [1, 0],
            [1, 1],
        ],
    ],
    Zmino: [
        [
            [0, 0],
            [1, 0],
            [1, 1],
            [2, 1],
        ],
        [
            [1, 0],
            [0, 1],
            [1, 1],
            [0, 2],
        ],
        [
            [0, 0],
            [1, 0],
            [1, 1],
            [2, 1],
        ],
        [
            [1, 0],
            [0, 1],
            [1, 1],
            [0, 2],
        ],
    ],
    Smino: [
        [
            [1, 0],
            [2, 0],
            [0, 1],
            [1, 1],
        ],
        [
            [0, 0],
            [0, 1],
            [1, 1],
            [1, 2],
        ],
        [
            [1, 0],
            [2, 0],
            [0, 1],
            [1, 1],
        ],
        [
            [0, 0],
            [0, 1],
            [1, 1],
            [1, 2],
        ],
    ],
    Jmino: [
        [
            [0, 2],
            [1, 0],
            [1, 1],
            [1, 2],
        ],
        [
            [0, 0],
            [0, 1],
            [1, 1],
            [2, 1],
        ],
        [
            [0, 0],
            [1, 0],
            [0, 1],
            [0, 2],
        ],
        [
            [0, 0],
            [1, 0],
            [2, 0],
            [2, 1],
        ],
    ],
    Lmino: [
        [
            [0, 0],
            [0, 1],
            [0, 2],
            [1, 2],
        ],
        [
            [0, 0],
            [1, 0],
            [2, 0],
            [0, 1],
        ],
        [
            [0, 0],
            [1, 0],
            [1, 1],
            [1, 2],
        ],
        [
            [0, 1],
            [1, 1],
            [2, 0],
            [2, 1],
        ],
    ],
};
// 시작하기
function init() {
    tempMovingItem = { ...movingItem };

    for (let i = 0; i < rows; i++) {
        prependNewLine(); //블록 라인 만들기
    }
    // renderBlocks(); //블록 출력하기
    // moveBlock();
}

// 블록 만들기
function prependNewLine() {
    const li = document.createElement("li");
    const ul = document.createElement("ul");
    for (let j = 0; j < cols; j++) {
        const matrix = document.createElement("li");
        ul.prepend(matrix);
    }
    li.prepend(ul);
    playground.prepend(li);
}

// 블록 출력하기
function renderBlocks(moveType = "") {
    const { type, direction, top, left } = tempMovingItem;
    const movingBlocks = document.querySelectorAll(".moving");
    movingBlocks.forEach((moving) => {
        moving.classList.remove(type, "moving");
    });
    blocks[type][direction].some((block) => {
        const x = block[0] + left; //2 0 1 1
        const y = block[1] + top; //1 1 0 1
        const target = playground.childNodes[y] ? playground.childNodes[y].childNodes[0].childNodes[x] : null;
        const isAvailable = checkEmpty(target);
        if (isAvailable) {
            target.classList.add(type, "moving");
        } else {
            tempMovingItem = { ...movingItem };
            if (moveType === "retry") {
                clearInterval(downInterval);
                tetrisOver();

                return;
            }
            setTimeout(() => {
                renderBlocks("retry");
                if (moveType === "top") {
                    seizeBlock();
                }
            }, 0);
            return true;
        }
        // console.log({ playground })
    });
    movingItem.left = left;
    movingItem.top = top;
    movingItem.direction = direction;
}

//블록 감지하기
function seizeBlock() {
    const movingBlocks = document.querySelectorAll(".moving");
    movingBlocks.forEach((moving) => {
        moving.classList.remove("moving");
        moving.classList.add("seized");
    });
    checkMatch();
}

//한 줄 제거하기
function checkMatch() {
    const childNodes = playground.childNodes;
    childNodes.forEach((child) => {
        let matched = true;
        child.children[0].childNodes.forEach((li) => {
            if (!li.classList.contains("seized")) {
                matched = false;
            }
        });

        if (matched) {
            child.remove();
            prependNewLine();
            tetrisScore += 10;
            tetrisClear.play();

            tetrisScores.innerHTML = tetrisScore;
            tetrisScores2.innerHTML = tetrisScore;
            duration -= 30;
        }
    });

    generateNewBlock();

    console.log(tetrisScore);
}

//새로운 블록 만들기
function generateNewBlock() {
    clearInterval(downInterval);

    downInterval = setInterval(() => {
        moveBlock("top", 1);
    }, duration);

    const blockArray = Object.entries(blocks);
    const randomIndex = Math.floor(Math.random() * blockArray.length);
    movingItem.type = blockArray[randomIndex][0];

    movingItem.top = 0;
    movingItem.left = 6;
    movingItem.direction = 0;
    tempMovingItem = { ...movingItem };

    renderBlocks();
}

// 빈칸 감지
function checkEmpty(target) {
    if (!target || target.classList.contains("seized")) {
        return false;
    }
    return true;
}
// 블록 움직이기
function moveBlock(moveType, amount) {
    tempMovingItem[moveType] += amount;
    renderBlocks(moveType);
}

//모양 바꾸기
function changeDirection() {
    const direction = tempMovingItem.direction;
    direction === 3 ? (tempMovingItem.direction = 0) : (tempMovingItem.direction += 1);

    renderBlocks();
}

//빨리 내리기
function dropBlock() {
    clearInterval(downInterval);

    downInterval = setInterval(() => {
        moveBlock("top", 1);
    }, 10);
}

// 이벤트
document.addEventListener("keydown", (e) => {
    switch (e.keyCode) {
        case 39:
            moveBlock("left", 1);
            break;

        case 37:
            moveBlock("left", -1);
            break;

        case 40:
            moveBlock("top", 1);
            break;

        case 38:
            changeDirection();
            break;

        case 32:
            dropBlock();
            break;

        default:
            break;
    }
});

// 시작 버튼 누르기
tetrisStartBtn.addEventListener("click", () => {
    generateNewBlock(); //블록 만들기
    tetrisScore = 0;
    tetrisAudio.play();
});

function tetrisOver() {
    totalScore.style.display = "block";
    tetrisAudio.pause();
    tetrisAudio.currentTime = 0;
    tetrisOut.play();
}

// 테트리스 다시 시작
tetrisRestartBtn.addEventListener("click", () => {
    tetrisRestart();
});

function tetrisRestart() {
    totalScore.style.display = "none";
    generateNewBlock(); //블록 만들기
    duration = 500;
    tetrisScores.innerHTML = 0;
    tetrisScores2.innerHTML = 0;
    const tetrisMinos = playground.querySelectorAll("li > ul > li");
    tetrisMinos.forEach((minos) => {
        minos.className = "";
    });
    tetrisAudio.play();
}

init();
