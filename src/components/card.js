function createCard(template,onDelete, onLike, onZoomImage, ...data){
    
    const cardElement = template.querySelector(".places__item").cloneNode(true);
    const cardImage = cardElement.querySelector(".card__image");
    cardImage.src = data[0];
    cardElement.querySelector(".card__title").textContent = data[1];
    cardImage.alt = data[2];
    cardImage.setAttribute("data-popup","popUpImage");
    cardElement.querySelector(".card__delete-button").addEventListener("click", () => onDelete(cardElement));
    cardElement.querySelector(".card__like-button").addEventListener("click", onLike);
    cardImage.addEventListener("click", ()=> onZoomImage(cardElement));
    return cardElement;
}

// @todo: Функция удаления карточки
function deleteCard(card){
    card.remove();
}

//@todo: функция установки Like
function setLike(evt){
    evt.target.classList.toggle("card__like-button_is-active");
}

export {createCard,deleteCard, setLike}