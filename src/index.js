 import "./pages/index.css";
 import {initialCards} from "./scripts/cards.js";

// @todo: Темплейт карточки
const cardTemplate = document.querySelector("#card-template").content;


// @todo: DOM узлы

const cardBox = document.querySelector(".places");
const cardCurrent = cardBox.querySelector(".places__list");


//@todo: Функция создания карточки
function createCard(onDelete, ...data){
    const cardElement = cardTemplate.querySelector(".places__item").cloneNode(true);
    cardElement.querySelector(".card__image").src = data[0];
    cardElement.querySelector(".card__title").textContent = data[1];
    cardElement.querySelector(".card__image").alt = data[2];
    cardElement.querySelector(".card__delete-button").addEventListener("click", onDelete);
    return cardElement;
}

//функция заполения карточками
function fillCards(render){
    cardCurrent.append(render);
}

initialCards.forEach(item=>{
    fillCards(createCard(deleteCard,item.link, item.name, item.alt));
}); 

// @todo: Функция удаления карточки
function deleteCard(){
    this.closest(".places__item").remove();
}



// const addButton = document.querySelector(".profile__add-button");
// const popUpImage = document.querySelector(".popup_type_image");
// const popUpEdit = document.querySelector(".popup_type_edit");
// const popUpNew = document.querySelector(".popup_type_new-card");
// const popUpClose = document.querySelectorAll(".popup__close")

// //функция закрытия PopUp
// function closePopUp(){
//     popUpClose.forEach((close)=> close.addEventListener("click",()=> {

//         close.parentElement.parentElement.classList.remove("popup_is-opened");

//     }))
// }

// closePopUp();

// addButton.addEventListener("click", () => {
//     popUpNew.classList.add("popup_is-opened");
// });