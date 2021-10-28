function createElement(tag, className) {
    const tagHtml = document.createElement(tag);
    if(className) {
        tagHtml.classList.add(className);
    }

    return tagHtml;

}

export default createElement;