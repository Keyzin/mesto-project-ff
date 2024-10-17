//@todo: Переменные
const ESC_CODE = 27;


const popUpClose = document.querySelectorAll(".popup__close")
const popUp = document.querySelectorAll(".popup");


//@todo: Универсальная функция открытия PopUp через data-атрибут
function addPopUp(e){
    document.getElementById(e.target.dataset.popup).classList.add("popup_is-opened");
    document.addEventListener("keydown",removePopup);
    popUpClose.forEach((e)=>{e.addEventListener("click",removePopup);})
    popUp.forEach((e)=>e.addEventListener("click", removePopup));
    handleFormFill(e);
}

//@todo: Функция удаления PopUp
function removePopup(e){

    //проверяем все ли поля заполнены
    const isCheckFields = Array.from(e.target.parentElement.querySelectorAll("input")).every((e)=>e.value.length>0);
    
    if(e.target.classList.contains("popup__close") || e.target.type === "submit" && isCheckFields || e.target.classList.contains("popup_is-opened") || e.keyCode === ESC_CODE)     
    {
           
             document.querySelector(".popup_is-opened").classList.remove("popup_is-opened");
             document.removeEventListener("keydown",removePopup);
             popUpClose.forEach((e)=>{e.removeEventListener("click",removePopup);})
             popUp.forEach((e)=>e.removeEventListener("click", removePopup));
    }
          
}
    
//@todo: Функция заполнения данными
function handleFormFill(evt){
    if(evt.target.dataset.popup === "popUpEdit")
        {   
            const profileName = document.querySelector(".profile__title");
            const profileDesc = document.querySelector(".profile__description");
            const formEdit = document.forms["edit-profile"];
            formEdit.elements.name.value = profileName.textContent;
            formEdit.elements.description.value = profileDesc.textContent;
            
        }
    if(evt.target.dataset.popup === "popUpImage")
        {
            const popUpImage = document.querySelector(".popup_type_image");
            const popUpImageContent = popUpImage.querySelector(".popup__image");
            const popUpImageCaption = popUpImage.querySelector(".popup__caption");
            popUpImageContent.src = evt.target.src
            popUpImageCaption.textContent = evt.target.closest(".places__item").querySelector(".card__title").textContent;
        }
     
 
}

export {addPopUp}