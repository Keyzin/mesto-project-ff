
const validationConfig = {
    formSelector: '.popup__form',
    inputSelector: '.popup__input',
    submitButtonSelector: '.popup__button',
    inactiveButtonClass: 'popup__button_disabled',
    inputErrorClass: 'popup__input_type_error',
    errorClass: 'popup__error_active'
  }

function enableValidation(validationConfig){
    const formList = Array.from(document.querySelectorAll(validationConfig.formSelector));
    formList.forEach((formElement)=>{formElement.addEventListener("submit", (e)=>{e.preventDefault();});
    setEventListeners(formElement, validationConfig.inputSelector, validationConfig.submitButtonSelector);});
  }

function showInputError  (formElement, inputElement, inputErrorClass, errorClass, errorMessage){
    const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
    inputElement.classList.add(inputErrorClass);
    errorElement.textContent = errorMessage;
    errorElement.classList.add(errorClass);
    
};

function hideInputError  (formElement,inputElement, inputErrorClass, errorClass){
    const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
    inputElement.classList.remove(inputErrorClass);
    errorElement.classList.remove(errorClass);
    errorElement.textContent = '';      
  };


  function checkInputValidity (formElement, inputElement, submitButtonSelector, inactiveButtonClass)  {
    if (!inputElement.validity.valid) {
      showInputError(formElement, inputElement, validationConfig.inputErrorClass, validationConfig.errorClass, inputElement.validationMessage);
    } else {
      hideInputError(formElement, inputElement, validationConfig.inputErrorClass, validationConfig.errorClass);
    }
    inputElement.setCustomValidity("");
    if (inputElement.validity.patternMismatch) {
        inputElement.setCustomValidity(inputElement.dataset.errorMessage);
    }
    if (inputElement.validity.valueMissing) {
    inputElement.setCustomValidity("Вы пропустили это поле")
    } 
    if (!inputElement.validity.valid) {
        showInputError(formElement, inputElement, validationConfig.inputErrorClass, validationConfig.errorClass, inputElement.validationMessage);
        formElement.querySelector(submitButtonSelector).disabled = true;
        formElement.querySelector(submitButtonSelector).classList.add(inactiveButtonClass);
    } else {
        hideInputError(formElement, inputElement, validationConfig.inputErrorClass, validationConfig.errorClass);
        formElement.querySelector(submitButtonSelector).disabled = false;
        formElement.querySelector(submitButtonSelector).classList.remove(inactiveButtonClass);
    }
  };   
  
  function setEventListeners  (formElement, inputSelector, submitButtonSelector) {
    const inputList = Array.from(formElement.querySelectorAll(inputSelector));
    const btnElement = formElement.querySelector(submitButtonSelector);
    toggleButtonState(inputList, btnElement, validationConfig.inactiveButtonClass);
    inputList.forEach((inputElement) => {
      inputElement.addEventListener('input', function () {
        checkInputValidity(formElement, inputElement, validationConfig.submitButtonSelector, validationConfig.inactiveButtonClass);
        toggleButtonState(inputList, btnElement, validationConfig.inactiveButtonClass);
      });
    });
  };


  function clearValidation(profileForm, validationConfig){
    const inputList = Array.from(
      profileForm.querySelectorAll(validationConfig.inputSelector)
    );
    const btnElement = profileForm.querySelector(
      validationConfig.submitButtonSelector);
      toggleButtonState(inputList, btnElement, validationConfig.inactiveButtonClass);
      inputList.forEach((inputElement) => {
        hideInputError(profileForm, inputElement, validationConfig.inputErrorClass, validationConfig.errorClass);
        inputElement.setCustomValidity("");
      });
  }


  function hasInvalidInput(inputList){
   return inputList.some((inputElement)=>!inputElement.validity.valid);
 }

 function toggleButtonState(inputList,buttonElement, inactiveButtonClass){
  if(hasInvalidInput(inputList)){
    buttonElement.classList.add(inactiveButtonClass);
  }
  else{
    buttonElement.classList.remove(inactiveButtonClass);
  }

}


export {enableValidation, clearValidation, validationConfig}