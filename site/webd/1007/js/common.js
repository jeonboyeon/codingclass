//탭 메뉴
const tabBtn = document.querySelectorAll(".modal__box .tabs > div");
const tabCont = document.querySelectorAll(".modal__box .cont > div");



tabBtn.forEach((element, index) => {
    //버튼을 클릭함
    element.addEventListener("click", (event) => {
        //클릭시 초기화면으로 돌아가는 이벤트를 막아줍니다.
        event.preventDefault();

        //클래스 active를 모두 제거함
        tabBtn.forEach(li => {
            li.classList.remove("active");
        });

        //내가 클릭한 버튼에 active를 추가함
        element.classList.add("active");

        //버튼을 클릭하면 모든 자식 박스 숨김
        tabCont.forEach(div => {
            div.style.display = "none";
        });

        //[i]클릭한 버튼과 관련된 [i]박스를 보이게 함
        tabCont[index].style.display = "block";
    });
});

// 모달
const modalBtn = document.querySelector(".modal__btn");
const modalClose = document.querySelector(".modal__close");
const modalCont = document.querySelector(".modal__cont");

modalBtn.addEventListener("click", () => {
    modalCont.classList.add("show")
    modalClose.classList.add("show")
    modalCont.classList.remove("hide")
    modalClose.classList.remove("hide")
});

modalClose.addEventListener("click", () => {
    modalCont.classList.add("hide")
    modalClose.classList.add("hide")
});