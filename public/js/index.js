import { transition } from "./utilities.js";
import { HOST } from "./constants.js";

const Site = {
    event: {
        display: document.querySelector('[data-event-display]'),
        noEventDisplay: document.querySelector('[data-no-event-display]'),
        dates: [...document.querySelectorAll('[data-event-date]')],
        titles: [...document.querySelectorAll('[data-event-title]')],
        texts: [...document.querySelectorAll('[data-event-text]')],
        pricing: {
            spectator: [...document.querySelectorAll('[data-pricing-spectator]')],
            rider: [...document.querySelectorAll('[data-pricing-rider]')]
        }
    }
};



function setEventData(eventData){

    Site.event.dates.forEach( dateElement => {
        dateElement.innerText = eventData.date || 'Date Error'
    });
    Site.event.titles.forEach( titleElement => {
        titleElement.innerText = eventData.title || 'Title Error'
    });
    Site.event.texts.forEach( textElement => {
        textElement.innerText = eventData.text || 'Text Error'
    });
    Site.event.pricing.spectator.forEach( pricingElement => {
        if(pricingElement.innerText !== eventData.pricing.spectator){
            pricingElement.innerText = eventData.pricing.spectator;
        }    
    });
    Site.event.pricing.rider.forEach( pricingElement => {
        if(pricingElement.innerText !== eventData.pricing.rider){
            pricingElement.innerText = eventData.pricing.rider;
        }    
    });

};
async function getCurrentEvent(){

    try{

        const apiResponse = await fetch(`${HOST}/api/current-event`);

        if(!apiResponse.ok) throw new Error('Fetch Failed')

        const eventData = await apiResponse.json();

        setEventData(eventData);

        transition('add',Site.event.display,'insert','show',1000);

    }catch(error){

        transition('add',Site.event.noEventDisplay,'insert','show',500);
        console.warn('FETCH_ERROR',error);
    }
};

function intializeSite(){

    getCurrentEvent();
};

intializeSite();