import "./pages/index.css";

import {createCard,deleteCard,setLike} from "./components/card.js";
import { addPopUp,removePopup,handleFormClickOutside} from "./components/modal.js";
import {clearValidation, enableValidation, validationConfig} from "./components/validation.js";
import { getInitialCards, getUsersData, editProfileData, addNewCard,updatePhoto} from "./components/api.js";

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
const profileImage = document.querySelector(".profile__image");
const formEdit = document.forms["edit-profile"];
const formAdd = document.forms["new-place"];
const formPhoto = document.forms["new-photo"];
const popUpClose = document.querySelectorAll(".popup__close");
const popUp = document.querySelectorAll(".popup");
const popUpEdit = document.querySelector(".popup_type_edit");
const popUpAdd = document.querySelector(".popup_type_new-card");
const popUpPhoto = document.querySelector(".popup_type_new-photo");
const popUpImage = document.querySelector(".popup_type_image");
const popUpImageContent = popUpImage.querySelector(".popup__image");
const popUpImageCaption = popUpImage.querySelector(".popup__caption");


//функция заполнение карточками
function fillCards(card){
    cardCurrent.prepend(card);
}


function waitForLoading(isLoading, btn){
    btn.textContent = isLoading ? "Сохранение..." : "Сохранить"
}
 
//@todo: Функция обработки формы редактирования
function handleFormSubmitEdit(e){
    e.preventDefault();
    waitForLoading(true, popUpEdit.querySelector(".popup__button"));
    editProfileData(formEdit.elements.name.value,formEdit.elements.description.value).
    then(res=>{
        setProfileData(res.name,res.about, res.avatar);
    }).catch((error)=>{
        console.log(error);
    }).finally(()=>{
        waitForLoading(false, popUpEdit.querySelector(".popup__button"));
        removePopup(popUpEdit);
    })
  
    
}

//@todo: Функция обработки формы добавления карточки
function handleFormSubmitAdd(e){
    e.preventDefault();
    waitForLoading(true, formAdd.querySelector(".popup__button"));
    addNewCard(formAdd.elements["place-name"].value,formAdd.elements.link.value).
    then((data)=>{
        fillCards(createCard(cardTemplate,deleteCard,setLike, onOpenImagePopUp, data, userId));
    }).catch((error)=>{
        console.log(error)
    }).finally(()=>{
        waitForLoading(false, formAdd.querySelector(".popup__button"));
        removePopup(popUpAdd);
        formAdd.reset();
    })
    
   
}

function handleFormSubmitAddPhoto(e){
    e.preventDefault();
    waitForLoading(true, formPhoto.querySelector(".popup__button"));
    updatePhoto(formPhoto.elements["place-name"].value).
    then(res=>{
        setProfileData(res.name,res.about, res.avatar)
    }).catch(error=>{
        console.log(error);
    }).finally(()=>{
        removePopup(popUpPhoto);
        waitForLoading(false, formPhoto.querySelector(".popup__button"));
    });
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

enableValidation(validationConfig);

//@todo: "Вешаем" слушатели событий
editBtn.addEventListener("click", ()=>{
    addPopUp(popUpEdit);
    formEdit.elements.name.value = profileName.textContent;
    formEdit.elements.description.value = profileDesc.textContent;
    clearValidation(formEdit,validationConfig);
});
addButton.addEventListener("click", ()=>{
    addPopUp(popUpAdd);
    clearValidation(formAdd,validationConfig);
});

profileImage.addEventListener("click", ()=>{
    addPopUp(popUpPhoto);
    formPhoto.reset();
})

formEdit.addEventListener("submit",handleFormSubmitEdit);
formAdd.addEventListener("submit",handleFormSubmitAdd);
formPhoto.addEventListener("submit",handleFormSubmitAddPhoto)
popUpClose.forEach((e)=>{e.addEventListener("click",(e)=>{
    removePopup(e.target.closest(".popup"));
})});
popUp.forEach((e)=>e.addEventListener("click", handleFormClickOutside));



const setProfileData = (name,about, avatar) => {
    profileName.textContent = name;
    profileDesc.textContent = about;
    profileImage.style.backgroundImage = `url(${avatar})`;
}

 getUsersData().
  then(({name, about, avatar})=>{
      setProfileData(name, about, avatar)
  })
  
  let userId;
 
  Promise.all([getUsersData(), getInitialCards()]).
  then(([{name, about,avatar, ["_id"]:currentUserId}, cardsData]) =>{
    setProfileData(name, about, avatar)
    cardsData.forEach(data => fillCards(createCard(cardTemplate,deleteCard, setLike, onOpenImagePopUp, data, currentUserId)))
    userId = currentUserId;
  });
  