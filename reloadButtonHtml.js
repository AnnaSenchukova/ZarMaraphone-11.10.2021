import {arenasHtmlBlock} from "./main.js";
import createElement from "./createElement.js";

function renderReloadButton(){
    function createReloadButton() {
        const reloadButtonWrapperHtml = createElement('div', 'reload-wrap');
        const reloadButtonHtml = createElement('button', 'button');

        reloadButtonHtml.innerText = 'Restart';

        reloadButtonWrapperHtml.appendChild(reloadButtonHtml);

        return reloadButtonWrapperHtml;
    }

    arenasHtmlBlock.appendChild(createReloadButton());
    const reloadButton = document.querySelector('.reload-wrap .button');
    console.log(reloadButton);

    reloadButton.addEventListener('click', function () {
        console.log('click ReloadButton');
        window.location.reload();
    });
}

export default renderReloadButton;