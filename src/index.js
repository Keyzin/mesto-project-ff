import "./pages/index.css";
import {initialCards} from "./components/cards.js";
import {createCard,deleteCard,setLike} from "./components/card.js";
import { addPopUp} from "./components/modal.js";


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


//функция заполнение карточками
function fillCards(render){
    cardCurrent.prepend(render);
}

initialCards.forEach(item=>{
    fillCards(createCard(cardTemplate,deleteCard, setLike, addPopUp, item.link, item.name, item.alt));
}); 

//@todo: Функция обработки формы
function handleFormSubmit(e){
    e.preventDefault();
    if(e.target.closest(".popup").id === "popUpEdit")
    {   
        profileName.textContent = formEdit.elements.name.value;
        profileDesc.textContent = formEdit.elements.description.value;
    }
    if(e.target.closest(".popup").id === "popUpAdd")
    {
        fillCards(createCard(cardTemplate,deleteCard,setLike, addPopUp, formAdd.elements.link.value, formAdd.elements["place-name"].value, "Описание фото"));
        formAdd.reset();
    }
   
}

//@todo: "Вешаем" слушатели событий
editBtn.addEventListener("click", addPopUp);
addButton.addEventListener("click", addPopUp);
formEdit.addEventListener("submit",handleFormSubmit);
formAdd.addEventListener("submit",handleFormSubmit);
