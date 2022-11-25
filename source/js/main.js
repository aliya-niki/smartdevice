import {iosVhFix} from './utils/ios-vh-fix';
import {initModals} from './modules/modals/init-modals';

const PHONE_NUMBER_LENGTH = 11;

// ---------------------------------

window.addEventListener('DOMContentLoaded', () => {
  // Скрывает кнопку открытия модалки при выключенном JS
  const modalOpenButton = document.querySelector('[data-open-modal]');
  if (modalOpenButton) {
    modalOpenButton.classList.remove('is-hidden');
  }

  // Accordion
  const accordionHeaders = document.querySelectorAll('[data-accordion-header]');

  for (let element of accordionHeaders) {
    element.classList.remove('is-open');
    element.querySelector('span').style.display = 'flex';

    element.addEventListener('click', function (evt) {
      const accordion = evt.target.closest('[data-accordion-header]');
      if (!accordion.classList.contains('is-open')) {
        accordionHeaders.forEach((item) => item.classList.remove('is-open'));
      }
      accordion.classList.toggle('is-open');
    });
  }

  // Phone input mask
  const phoneInputs = document.querySelectorAll('[data-phone-input]');

  const prefixNumber = (str) => {
    if (str === '7') {
      return '7 (';
    }
    if (str === '8') {
      return '7 (';
    }
    return '7 (' + str;
  };

  for (let input of phoneInputs) {
    input.addEventListener('input', () => {
      const value = input.value.replace(/\D+/g, '');
      const numberLength = PHONE_NUMBER_LENGTH;

      let result = '+';

      for (let i = 0; i < value.length && i < numberLength; i++) {
        switch (i) {
          case 0:
            result += prefixNumber(value[i]);
            continue;
          case 4:
            result += ') ';
            break;
          case 7:
            result += '-';
            break;
          case 9:
            result += '-';
            break;
          default:
            break;
        }
        result += value[i];
      }

      input.value = result;
    });
  }

  // Form validation
  const consentInputs = document.querySelectorAll('[data-consent-input]');
  for (let input of consentInputs) {
    input.addEventListener('blur', () => {
      let validityMessage = '';

      if (!input.checked) {
        validityMessage = 'Для отправки формы необходимо подтвердить свое согласие. ';
      }
      input.setCustomValidity(validityMessage);
      input.reportValidity();
    });
  }

  const forms = document.querySelectorAll('form');
  for (let form of forms) {
    const consent = form.querySelector('[data-consent-input]');
    const name = form.querySelector('[data-name-input]');
    const phone = form.querySelector('[data-phone-input]');
    form.addEventListener('submit', function (evt) {
      if (!name.value || !phone.value || !consent.checked) {
        evt.preventDefault();
      }
    });
  }

  // Collapse/Expand text element
  const buttonToCollapse = document.querySelector('[data-button-to-collapse]');
  const textCollapsible = document.querySelector('[data-text-collapsible]');
  buttonToCollapse.classList.remove('is-hidden');
  textCollapsible.classList.add('is-hidden');
  buttonToCollapse.addEventListener('click', () => {
    if (textCollapsible.classList.contains('is-hidden')) {
      textCollapsible.classList.remove('is-hidden');
      buttonToCollapse.textContent = 'Скрыть';
      return;
    }
    textCollapsible.classList.add('is-hidden');
    buttonToCollapse.textContent = 'Показать';
  });


  // Utils
  // ---------------------------------

  iosVhFix();

  // Modules
  // ---------------------------------

  // все скрипты должны быть в обработчике 'DOMContentLoaded', но не все в 'load'
  // в load следует добавить скрипты, не участвующие в работе первого экрана
  window.addEventListener('load', () => {
    initModals();
  });
});

// ---------------------------------

// ❗❗❗ обязательно установите плагины eslint, stylelint, editorconfig в редактор кода.

// привязывайте js не на классы, а на дата атрибуты (data-validate)

// вместо модификаторов .block--active используем утилитарные классы
// .is-active || .is-open || .is-invalid и прочие (обязателен нейминг в два слова)
// .select.select--opened ❌ ---> [data-select].is-open ✅

// выносим все в дата атрибуты
// url до иконок пинов карты, настройки автопрокрутки слайдера, url к json и т.д.

// для адаптивного JS используется matchMedia и addListener
// const breakpoint = window.matchMedia(`(min-width:1024px)`);
// const breakpointChecker = () => {
//   if (breakpoint.matches) {
//   } else {
//   }
// };
// breakpoint.addListener(breakpointChecker);
// breakpointChecker();

// используйте .closest(el)
