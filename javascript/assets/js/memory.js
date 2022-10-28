// 두개의 카드 뒤집기 확인(첫번째 두번째)

const memoryWrap = document.querySelector(".memory__wrap");
const memoryWrapShow = document.querySelector(".memory__wrap.show");
const memoryCard = memoryWrap.querySelectorAll(".cards li");
const musicIco4 = document.querySelector(".icon4");
const memoryCardShuffle = document.querySelector(".card__shuffle");

$(".memory__wrap").draggable();

memoryCard.forEach((e) => {
    e.style.userSelect = "none";
    e.style.pointerEvents = "none";
});

let cardOne, cardTwo;
let disableDeck = false;
let matchedCard = 0; // 매치된 카드

let sound = ["../assets/audio/MP_롤 지목 핑.mp3", "../assets/audio/MP_롤 미아 핑_ 적 사라짐.mp3", "../assets/audio/soundSuccess.mp3"];

let soundMatch = new Audio(sound[0]);
let soundUnMatch = new Audio(sound[1]);
// let soundSuccess = new Audio(sound[2]);

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

        setInterval(() => {
            cardOne.classList.add("clickNone");
            cardTwo.classList.add("clickNone");
        }, 1000);

        if (matchedCard === 8) {
            alert("게임이 끝났도다!!!!!!!!");
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
            card.classList.add("flip");
        }, 200 * index);

        setTimeout(() => {
            card.classList.remove("flip");
            card.classList.remove("stop");
        }, 4000);

        let imgTag = card.querySelector(".back img");
        imgTag.src = `../assets/img/memoryImg${arr[index]}.png`;
    });
}

musicIco4.addEventListener("click", () => {
    memoryWrap.classList.toggle("show");
});

memoryCardShuffle.addEventListener("click", () => {
    shuffledCard();
    memoryCardShuffle.classList.add("stop");

    setTimeout(() => {
        memoryCardShuffle.classList.remove("stop");
    }, 4200);
});

// 카드 클릭
memoryCard.forEach((card) => {
    card.addEventListener("click", flipCard);
});
