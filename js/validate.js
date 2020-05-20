//array of objects
const validationObject = {
  formSelector: '.popup__form',
  inputSelector: '.popup__field',
  submitButtonSelector: '.popup__save-btn',
  inactiveButtonClass: 'popup__save-btn_disabled',
  inputErrorClass: 'popup__field_error',
  errorClass: 'popup__span-error_active'
};


// Функция, которая добавляет класс с ошибкой
const showError = (form, formInput, errorMessage, {inputErrorClass, errorClass}) => {
  // Выбираем элемент ошибки на основе id
  const errorElement = form.querySelector(`#${formInput.id}-error`);
  //добавлыаем класс с ошибкой
  formInput.classList.add(inputErrorClass);
  //подставляем текст с ошибкой параметром errorMessage
  errorElement.textContent = errorMessage;
  errorElement.classList.add(errorClass);
};


// Функция, которая удаляет класс с ошибкой
const hideError = (form, formInput, {inputErrorClass, errorClass}) => {
  const errorElement = form.querySelector(`#${formInput.id}-error`);
  formInput.classList.remove(inputErrorClass);
  errorElement.classList.remove(errorClass);
  errorElement.textContent = '';
};


// Функция, которая проверяет валидность поля
const checkInputValidity = (form, formInput, {inputErrorClass, errorClass}) => {
  if (!formInput.validity.valid) {
    // Если поле не проходит валидацию, покажем ошибку
    showError(form, formInput, formInput.validationMessage, {inputErrorClass, errorClass});
  } else {
    // Если проходит, скроем
    hideError(form, formInput, {inputErrorClass, errorClass});
  }
};


// Функция принимает массив полей
const hasInvalidInput = (inputList) => {
   // проходим по этому массиву методом some
  return inputList.some((formInput) => {
     // Если поле не валидно, колбэк вернёт true
    // Обход массива прекратится и вся фунцкция
    // hasInvalidInput вернёт true
    return !formInput.validity.valid;
  })
};


// Функция принимает массив полей ввода
// и элемент кнопки, состояние которой нужно менять
const toggleButtonState = (inputList, buttonElement, {inactiveButtonClass}) => {
  
    // Если есть хотя бы один невалидный инпут
  if (hasInvalidInput(inputList)) {
      // сделай кнопку неактивной
    buttonElement.classList.add(inactiveButtonClass);
    buttonElement.setAttribute('disabled', 'true');
  } else {
      // иначе сделай кнопку активной
    buttonElement.classList.remove(inactiveButtonClass);
    buttonElement.removeAttribute('disabled');
  }
};

//функция установки слушателей
const setEventListeners = (form, {inputSelector,submitButtonSelector,...rest }) => {
  // Найдем все поля формы и сделаем из них массив методом Array.from
 const inputList = Array.from(form.querySelectorAll(inputSelector));
  // Найдем в текущей форме кнопку отправки
 const buttonElement = form.querySelector(submitButtonSelector);
 // Обойдем все элементы полученной коллекции
 inputList.forEach((formInput) => {
    // каждому полю добавим обработчик события input
   formInput.addEventListener('input', function () {
     // Вызовем toggleButtonState и передадим ей массив полей, кнопку и объект
     toggleButtonState(inputList, buttonElement, rest);
     // Внутри колбэка вызовем checkInputValidity,
     // передав ей форму, проверяемый элемент и объект
     checkInputValidity(form, formInput, rest);
   });
 });
};

//функция валидации
const enableValidation = ({formSelector,...rest}) => {
  // Найдем все формы и сделаем из них массив методом Array.from
  const formList = Array.from(document.querySelectorAll(formSelector));
  //Обойдем весь полученный массив и передаем ему обработчик с параметром form
  formList.forEach((form) => {
    //устанавливаем слушатели на форму и объекты
    setEventListeners(form, rest);
  });
};


//вызываем функцию валидации всех объектов
enableValidation(validationObject);