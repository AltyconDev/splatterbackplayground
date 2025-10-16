import { transition } from "../utilities.js";

const pageNotification = {
    element: undefined,
    title: undefined,
    message: undefined,
    closeButton: undefined
}
function pageNotify(title,message){

    if(pageNotification.element === undefined){
        console.warn('page notification element does not exist on page');
        return;
    }

    pageNotification.title.innerText = title;
    pageNotification.message.innerText = message;

    transition('add',pageNotification.element,'insert','show');
};

function initializePageNotification(){

    pageNotification.element = document.querySelector('[data-page-notification]');
    pageNotification.closeButton = pageNotification.element.querySelector('[data-page-notification-close-button]');
    pageNotification.title = pageNotification.element.querySelector('[data-page-notification-title]');
    pageNotification.message = pageNotification.element.querySelector('[data-page-notification-message]');

    pageNotification.closeButton.addEventListener('click', (clickEvent)=>{

        clickEvent.preventDefault();

        if(pageNotification.element.classList.contains('show') ||
            pageNotification.element.classList.contains('insert')){
                transition('remove',pageNotification.element,'show','insert',500)
            }
    })
};

export { initializePageNotification, pageNotify }