//@todo: Переменные
const ESC_CODE = 27;


//@todo: Функция открытия PopUp
function addPopUp(elm){
    elm.classList.add("popup_is-opened");
    document.addEventListener("keydown",handleFormKeyDown);
}

//@todo: Функция удаления PopUp
function removePopup(elm){
    elm.classList.remove("popup_is-opened");
    document.removeEventListener("keydown",handleFormKeyDown);
}

//@todo: Функция закрытия PopUp через ESC
function handleFormKeyDown(e){
    if(e.keyCode === ESC_CODE)
    {
        removePopup(document.querySelector(".popup_is-opened"));
    }
}

//@todo: Функция закрытия PopUp нажатие вне PopUp
function handleFormClickOutside(e){
    if(e.target.classList.contains("popup_is-opened"))
    {
        removePopup(e.target)
    }
}

export {addPopUp,removePopup,handleFormClickOutside}