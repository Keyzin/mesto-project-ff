import "./pages/index.css";
import {initialCards} from "./components/cards.js";
import {createCard,deleteCard,setLike} from "./components/card.js";
import { addPopUp,removePopup,handleFormClickOutside} from "./components/modal.js";


// @todo: Темплейт карточки
export const cardTemplate = document.querySelector("#card-template").content;


// @todo: DOM узлы
const cardBox = document.querySelector(".places");
const cardCurrent = cardBox.querySelector(".places__list");
const editBtn = document.querySelector(".profile__edit-button");
const addButton = document.querySelector(".profile__add-button");
const profileInfo = document.querySelector(".profile__info");
const profileName = profileInfo.querySelector(".profile__title");
const profileDesc = profileInfo.querySelector(".profile__description");
const formEdit = document.forms["edit-profile"];
const formAdd = document.forms["new-place"];
const popUpClose = document.querySelectorAll(".popup__close");
const popUp = document.querySelectorAll(".popup");
const popUpEdit = document.querySelector(".popup_type_edit");
const popUpAdd = document.querySelector(".popup_type_new-card");
const popUpImage = document.querySelector(".popup_type_image");
const popUpImageContent = popUpImage.querySelector(".popup__image");
const popUpImageCaption = popUpImage.querySelector(".popup__caption");

//функция заполнение карточками
function fillCards(card){
    cardCurrent.prepend(card);
}

initialCards.forEach(item=>{
    fillCards(createCard(cardTemplate,deleteCard, setLike, onOpenImagePopUp, item.link, item.name, item.alt));
}); 

//@todo: Функция обработки формы редактирования
function handleFormSubmitEdit(e){
    e.preventDefault();
    profileName.textContent = formEdit.elements.name.value;
    profileDesc.textContent = formEdit.elements.description.value;
    removePopup(popUpEdit);
}

//@todo: Функция обработки формы добавления карточки
function handleFormSubmitAdd(e){
    e.preventDefault();
    fillCards(createCard(cardTemplate,deleteCard,setLike, onOpenImagePopUp, formAdd.elements.link.value, formAdd.elements["place-name"].value, formAdd.elements["place-name"].value));
    removePopup(popUpAdd);
    formAdd.reset();
}

function onOpenImagePopUp(cardData){
    const newCard = cardData.closest(".card"),
    cardImage = newCard.querySelector(".card__image"),
    cardTitle = newCard.querySelector(".card__title");
    popUpImageContent.src = cardImage.src;
    popUpImageContent.alt = cardImage.alt;
    popUpImageCaption.textContent = cardTitle.closest(".places__item").querySelector(".card__title").textContent;
    addPopUp(popUpImage);
}

//@todo: "Вешаем" слушатели событий
editBtn.addEventListener("click", ()=>{
    addPopUp(popUpEdit);
    formEdit.elements.name.value = profileName.textContent;
    formEdit.elements.description.value = profileDesc.textContent;
});
addButton.addEventListener("click", ()=>{
    addPopUp(popUpAdd);
});
formEdit.addEventListener("submit",handleFormSubmitEdit);
formAdd.addEventListener("submit",handleFormSubmitAdd);
popUpClose.forEach((e)=>{e.addEventListener("click",(e)=>{
    removePopup(e.target.closest(".popup"));
})});
popUp.forEach((e)=>e.addEventListener("click", handleFormClickOutside));