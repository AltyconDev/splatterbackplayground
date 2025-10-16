
export function enableLoadingDisplay(message){

    const loaderDisplay = document.querySelector('[data-page-loader]');
    const loaderDisplayMessage = loaderDisplay.querySelector('[data-page-loader-message]');

    loaderDisplayMessage.innerText = message || 'Loading...';

    loaderDisplay.classList.add('loading');
};
export function disableLoadingDisplay(){

    const loaderDisplay = document.querySelector('[data-page-loader]');
    const loaderDisplayMessage = loaderDisplay.querySelector('[data-page-loader-message]');

    loaderDisplayMessage.innerText = '';

    loaderDisplay.classList.remove('loading');
}