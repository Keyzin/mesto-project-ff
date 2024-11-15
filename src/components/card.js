
import {deleteMyCard, likeCard, delLikeCard} from "./api";

function createCard(template,onDelete, onLike, onZoomImage, data, userId){
    const cardElement = template.querySelector(".places__item").cloneNode(true);
    const likeCounter = cardElement.querySelector(".card__like-count");
    const likeBtn = cardElement.querySelector(".card__like-button");
    const cardImage = cardElement.querySelector(".card__image");
    cardImage.src = data.link;
    cardElement.querySelector(".card__title").textContent = data.name;
    cardImage.alt = data.name;
    cardImage.setAttribute("data-popup","popUpImage");
    likeCounter.textContent = data.likes.length;
    likeBtn.addEventListener("click", (e) => onLike(e,data, likeCounter));
    cardImage.addEventListener("click", ()=> onZoomImage(cardElement));

    if(data.owner._id === userId){
        cardElement.querySelector(".card__delete-button").classList.add("card__delete-button_is-active");
        cardElement.querySelector(".card__delete-button").addEventListener("click", () => onDelete(data._id, cardElement));
    }

   likeBtn.classList.toggle("card__like-button_is-active", data.likes.some(like=>like._id == userId))

    return cardElement;
}

// @todo: Функция удаления карточки
function deleteCard(cardId, card){
    deleteMyCard(cardId).
    then(()=>{
        card.remove();
    }).catch(error=>{
        console.log(error);
    })
}

//@todo: функция установки Like
function setLike(evt, data, likeCounter){
    const like = evt.target.classList.contains("card__like-button_is-active") ?
    delLikeCard:
    likeCard;
    like(data._id).
    then(res=>{
        evt.target.classList.toggle("card__like-button_is-active");
        likeCounter.textContent = res.likes.length
    }).
    catch(err=>{
        console.log(err);
    })
   
     
}

export {createCard,deleteCard, setLike}


       
        
        