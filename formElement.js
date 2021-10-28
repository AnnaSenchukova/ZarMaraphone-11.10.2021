export const formFightHtml = document.querySelector('.control');

function disabledFormElement() {
    for (let formElement of formFightHtml) {
        if(formElement.type === 'radio' || formElement.type === 'submit') {
            formElement.disabled = true;
        }
    }
}

export default disabledFormElement;