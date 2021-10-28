import {formFightHtml} from './variables.js';

function disabledFormElement() {
    for (let formElement of formFightHtml) {
        if(formElement.type === 'radio' || formElement.type === 'submit') {
            formElement.disabled = true;
        }
    }
}

export default disabledFormElement;