// 두개의 카드 뒤집기 확인(첫번째 두번째)

const memoryWrap = document.querySelector(".memory__wrap"); // 메모리 전체 박스
const memoryWrapShow = document.querySelector(".memory__wrap.show"); // 메모리 전체 박스에 show가 붙었을 때
const memoryCard = memoryWrap.querySelectorAll(".cards li"); // 각각의 카드
const musicIco4 = document.querySelector(".icon4"); // 메모리 전체 박스를 보여줄 파일 아이콘
const memoryStartBtn = document.querySelector(".mStartBtn"); // 메모리 게임 스타트 버튼
const memoryTime = document.querySelector(".memory__info span"); // 메모리 게임 시간
console.log(memoryStartBtn);

// 파일 아이콘 클릭 시 메모리 박스 show 붙여주고 보여주기
musicIco4.addEventListener("click", () => {
    memoryWrap.classList.toggle("show");
});

let cardOne, cardTwo;
let disableDeck = false;
let matchedCard = 0; // 매치된 카드
let mTimeRemaining = 30, // 남은시간
    mCount = 0, // 정답 갯수
    mScore = 0; // 점수

let remainingTime = 120, // 남은시간
    memoryScore = 0, // 점수
    memoryCount = 0; // 정답 갯수

let startTime = 0;
let endTime = 0;

let sound = ["../assets/audio/MP_롤 지목 핑.mp3", "../assets/audio/MP_롤 미아 핑_ 적 사라짐.mp3", "../assets/audio/soundSuccess.mp3"];

let soundMatch = new Audio(sound[0]);
let soundUnMatch = new Audio(sound[1]);

// 시작 전 카드 클릭 안되게 하기
function lock() {
    memoryCard.forEach((e) => {
        e.style.userSelect = "none";
        e.style.pointerEvents = "none";
    });
}

function startMemory() {
    memoryTime.innerHTML = "두구두구두구! 과연 점수는!?";
    shuffledCard();
    cardUnLock();
}

// 카드 뒤집기
function flipCard(e) {
    let clickCard = e.target;
    // 클릭하면 flip 클래스 추가
    if (clickCard !== cardOne && !disableDeck) {
        clickCard.classList.add("flip");

        if (!cardOne) {
            return (cardOne = clickCard);
        }

        cardTwo = clickCard;
        disableDeck = true;

        // back에 있는 img 경로를 가져온다.
        let cardOneImg = cardOne.querySelector(".back img").src;
        let cardTwoImg = cardTwo.querySelector(".back img").src;

        matchCards(cardOneImg, cardTwoImg);
    }
}

// 카드 확인
function matchCards(img1, img2) {
    if (img1 === img2) {
        // 같을 경우
        matchedCard++;

        soundMatch.play();

        if (matchedCard === 8) {
            endTime = new Date();
            memoryScore = Math.floor(100 - (endTime - startTime) / 1000);

            if (memoryScore <= 100 && memoryScore >= 70) {
                memoryTime.innerHTML = memoryScore + "점! 넌 이겨라.";
            } else if (memoryScore <= 69 && memoryScore >= 50) {
                memoryTime.innerHTML = memoryScore + "점! 좀 치시네요.";
            } else {
                memoryTime.innerHTML = memoryScore + "점! 좀 많이 분발해야할지도 :/";
            }
            // alert(`(${100 - (endTime - startTime) / 1000}) 점 나왔습니다!!`);

            lock();
        }

        cardOne.removeEventListener("click", flipCard);
        cardTwo.removeEventListener("click", flipCard);

        cardOne = cardTwo = "";
        disableDeck = false;
    } else {
        // NO! (틀린 음악, 이미지가 좌우로 흔들린다.)
        setTimeout(() => {
            cardOne.classList.add("shakeX");
            cardTwo.classList.add("shakeX");
        }, 100);

        setTimeout(() => {
            cardOne.classList.remove("shakeX", "flip");
            cardTwo.classList.remove("shakeX", "flip");
            cardOne = cardTwo = "";
            disableDeck = false;
        }, 1000);

        soundUnMatch.play();
    }
}

// 카드 섞기
function shuffledCard() {
    cardOne = cardTwo = "";
    disableDeck = false;
    matchedCard = 0;

    let arr = [1, 2, 3, 4, 5, 6, 7, 8, 1, 2, 3, 4, 5, 6, 7, 8];
    let result = arr.sort(() => (Math.random() > 0.5 ? 1 : -1));

    memoryCard.forEach((card, index) => {
        card.classList.remove("flip");
        card.classList.add("stop");

        setTimeout(() => {
            memoryCard.forEach((e) => {
                e.style.userSelect = "none";
                e.style.pointerEvents = "none";
            });
            card.classList.add("flip");
        }, 200 * index);

        setTimeout(() => {
            memoryCard.forEach((e) => {
                e.style.userSelect = "unset";
                e.style.pointerEvents = "unset";
            });
            card.classList.remove("flip");
            card.classList.remove("stop");

            startTime = new Date();
        }, 4000);

        let imgTag = card.querySelector(".back img");
        imgTag.src = `../assets/img/memoryImg${arr[index]}.png`;
    });

    memoryStartBtn.addEventListener("click", shuffledCard);

    memoryCard.forEach((card) => {
        card.addEventListener("click", flipCard);
    });
}
// 카드 클릭 풀기
function cardUnLock() {
    memoryCard.forEach((e) => {
        e.style.userSelect = "unset";
        e.style.pointerEvents = "unset";
    });
}

memoryStartBtn.addEventListener("click", startMemory);
