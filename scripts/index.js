// @todo: Темплейт карточки
const cardTemplate = document.querySelector("#card-template").content;


// @todo: DOM узлы

const cardBox = document.querySelector(".places");
const cardCurrent = cardBox.querySelector(".places__list");


// @todo: Функция заполнения карточками
function fillFunc(){
    initialCards.forEach(item=>{
        const cardElement = cardTemplate.querySelector(".places__item").cloneNode(true);
        cardElement.querySelector(".card__image").src = item.link;
        cardElement.querySelector(".card__title").textContent = item.name;
        cardElement.querySelector(".card__delete-button").addEventListener("click", deleteCard);
        cardCurrent.append(cardElement);
    }); 
}

fillFunc();

// @todo: Функция удаления карточки
function deleteCard(){
   this.parentElement.remove();
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