function createCard(template,onDelete, onLike, onZoomImage, ...data){
    const cardElement = template.querySelector(".places__item").cloneNode(true);
    cardElement.querySelector(".card__image").src = data[0];
    cardElement.querySelector(".card__title").textContent = data[1];
    cardElement.querySelector(".card__image").alt = data[2];
    cardElement.querySelector(".card__image").setAttribute("data-popup","popUpImage");
    cardElement.querySelector(".card__delete-button").addEventListener("click", onDelete);
    cardElement.querySelector(".card__like-button").addEventListener("click", onLike);
    cardElement.querySelector(".card__image").addEventListener("click", onZoomImage)
    return cardElement;
}

// @todo: Функция удаления карточки
function deleteCard(){
    this.closest(".places__item").remove();
}

//@todo: функция установки Like
function setLike(evt){
    evt.target.classList.toggle("card__like-button_is-active");
}

export {createCard,deleteCard, setLike}