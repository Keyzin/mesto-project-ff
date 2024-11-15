function enableValidation(validationConfig){
    const formList = Array.from(document.querySelectorAll(validationConfig.formSelector));
    formList.forEach((formElement)=>{formElement.addEventListener("submit", (e)=>{e.preventDefault();});
    setEventListeners(formElement, validationConfig);});
  }

function showInputError  (formElement, inputElement, validationConfig, errorMessage){
    const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
    inputElement.classList.add(validationConfig.inputErrorClass);
    errorElement.textContent = errorMessage;
    errorElement.classList.add(validationConfig.errorClass);
    
};

function hideInputError  (formElement,inputElement, validationConfig){
    const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
    inputElement.classList.remove(validationConfig.inputErrorClass);
    errorElement.classList.remove(validationConfig.errorClass);
    errorElement.textContent = '';      
  };

  function checkInputValidity (formElement, inputElement,validationConfig)  {
    if (inputElement.validity.patternMismatch) {
        inputElement.setCustomValidity(inputElement.dataset.errorMessage);
    }
    else{
      inputElement.setCustomValidity("");
    }
    if (!inputElement.validity.valid) {
        showInputError(formElement, inputElement, validationConfig, inputElement.validationMessage);

    } else {
        hideInputError(formElement, inputElement, validationConfig);
    }
  };   
  
  function setEventListeners  (formElement, validationConfig) {
    const inputList = Array.from(formElement.querySelectorAll(validationConfig.inputSelector));
    const btnElement = formElement.querySelector(validationConfig.submitButtonSelector);
    toggleButtonState(inputList, btnElement, validationConfig);
    inputList.forEach((inputElement) => {
      inputElement.addEventListener('input', function () {
        checkInputValidity(formElement, inputElement,validationConfig);
        toggleButtonState(inputList, btnElement, validationConfig);
      });
    });
  };

  function clearValidation(profileForm, validationConfig){
    const inputList = Array.from(
      profileForm.querySelectorAll(validationConfig.inputSelector)
    );
    const btnElement = profileForm.querySelector(
      validationConfig.submitButtonSelector);
      toggleButtonState(inputList, btnElement, validationConfig);
      inputList.forEach((inputElement) => {
        hideInputError(profileForm, inputElement, validationConfig);
        inputElement.setCustomValidity("");
      });
  }

  function hasInvalidInput(inputList){
   return inputList.some((inputElement)=>!inputElement.validity.valid);
 }

 function toggleButtonState(inputList,buttonElement, validationConfig){
  if(hasInvalidInput(inputList)){
    buttonElement.classList.add(validationConfig.inactiveButtonClass);
    buttonElement.disabled = true;
  }
  else{
    buttonElement.classList.remove(validationConfig.inactiveButtonClass);
    buttonElement.disabled = false;
  }

}

export {enableValidation, clearValidation}