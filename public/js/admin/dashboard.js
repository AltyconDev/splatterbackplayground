import { initializePageNotification, pageNotify } from "../canopy/page_notification.js";
import { HOST } from "../constants.js";
import { cGraph } from "../graph/graph.js";
import { initializeTabConnections } from "../tabs.js";
import { createRandomDate, fixCanvas, getElements, getTodaysDate, randomNumberInRange, sortDates, transition } from "../utilities.js";
import { DPI } from "../constants.js";


async function postCreateEventData(submitEvent){
    submitEvent.preventDefault();

    const form = submitEvent.target;
    if(!form) return;

    const formData = new FormData(form);
    const eventData = {
        eventDate: formData.get('event-date').trim(),
        eventTime: formData.get('event-time').trim(),
        eventTitle: formData.get('event-title').trim(),
        eventDetails: formData.get('event-details').trim(),
        agreement: formData.get('form-agreement').trim()
    }
    try{

        const response = await fetch(`${HOST}/api/create-event`,{
            method: 'POST',
            body: JSON.stringify(eventData),
            headers: {
                'Content-Type':'application/json'
            }
        });

        const data = await response.json();

        console.log('data: ', data);

    }catch(error){

        console.error(error);
    }
};

async function postUpdateEventData(submitEvent){
    submitEvent.preventDefault();

    const form = submitEvent.target;
    if(!form) return;

    const formData = new FormData(form);

    const eventData = {
        eventDate: formData.get('event-date').trim(),
        eventTime: formData.get('event-time').trim(),
        eventTitle: formData.get('event-title').trim(),
        eventDetails: formData.get('event-details').trim(),
        agreement: formData.get('form-agreement').trim()
    };

    try{

        const response = await fetch(`${HOST}/api/update-event`,{
            method: 'POST',
            body: JSON.stringify(eventData),
            headers: {
                'Content-Type':'application/json'
            }
        });

        const data = await response.json();

        console.log('data: ', data);

    }catch(error){

        console.error(error);
    }
};

async function postUpdatePricingData(submitEvent){
    submitEvent.preventDefault();

    const form = submitEvent.target;
    if(!form) return;

    const formData = new FormData(form);
    const pricingData = {
        spectatorPrice: formData.get('spectator-price').trim(),
        riderPrice: formData.get('rider-price').trim()
    };
    try{

        const response = await fetch(`${HOST}/api/update-pricing`,{
            method: 'POST',
            body: JSON.stringify(pricingData),
            headers: {
                'Content-Type':'application/json'
            }
        });

        const data = await response.json();

        console.log('data: ', data);

    }catch(error){

        console.error(error);
    }
};

async function fetchEventDataById(eventId){

    try{

        const response = await fetch(`/events/${eventId}`);

        const eventData = await response.json();

        console.log('event data', eventData);

    }catch(error){

        console.error(error);
    }
};
function initiateAdminDashboard(){

    initializeTabConnections();

    initializePageNotification();

    // set event date to current date
    const today = getTodaysDate('yyyy-mm-dd').split('-');
    const year = today[0];
    const month = today[1];
    const day = today[2];

    document.querySelectorAll('[name="year"]').forEach( yearInput => {
        yearInput.value = year;
    })
    document.querySelectorAll('[name="month"]').forEach( monthInput => {
        monthInput.value = month;
    })
    document.querySelectorAll('[name="day"]').forEach( dayInput => {
        dayInput.value = day;
    })
    // Update event section
    const eventSelectionPopup = document.querySelector('[data-event-selection-popup]');

    document.querySelectorAll('.event-selection-list button').forEach( button => {
        button.addEventListener('click', clickEvent => {
            clickEvent.preventDefault();

            const eventId = button.dataset.eventId;
            console.log(eventId);

            // get event data using eventId

            // add event data to event selection pop element
            transition('remove',eventSelectionPopup,'show','insert',500);
        })
    })
    document.querySelector('[data-select-event-btn]').addEventListener('click', (clickEvent)=>{
        transition('add',eventSelectionPopup,'insert','show');
    });

    const [ formAgreementElementsError, formAgreementElements ] = getElements('[name="form-agreement"]');
    if(formAgreementElementsError) console.warn(formAgreementElementsError.message);
    if(formAgreementElements){
        formAgreementElements.forEach( checkbox => {
            checkbox.addEventListener('click', _ => {
                if(!checkbox.checked) return;

                const form = checkbox.closest('form');
                const inputs = [...form.querySelectorAll('[name]')];

                const noValue = inputs.find( input => !input.value);
                if(noValue){
                    checkbox.checked = !checkbox.checked
                    pageNotify('Incomplete form','Please include all information');
                    return;
                }
                form.querySelector('button[type="submit"]').classList.add('active');
            })
        })
    }
    

    // const createEventForm = document.querySelector('[data-create-event-form]');
    // const updateEventForm = document.querySelector('[data-update-event-form]');
    // const updatePricingForm = document.querySelector('[data-update-pricing-form]');

    // createEventForm.addEventListener('submit', postCreateEventData);
    // updateEventForm.addEventListener('submit', postUpdateEventData);
    // updatePricingForm.addEventListener('submit', postUpdatePricingData);

    function createRandomAxisData(n = 100){
        const data = [];
        for(let i = 0; i < n; i++){
            data.push({
                id: i,
                date: createRandomDate('yyyy-mm-dd'),
                visitors: randomNumberInRange(1,100,true)
            })
        }
        return data;
    };
    
    function convertDataForCGraph(options,data){
        if(!options.xValue) return;

        return data.map( datum =>{

            return { xValue: datum[options.xValue], yValue: datum[options.yValue]}
        })
    }

    const canvas = document.querySelector('[data-graph-canvas]');
    fixCanvas(canvas,DPI);

    const activityData = createRandomAxisData(10);
    const sortedActivityData = sortDates(activityData);
    const converted = convertDataForCGraph({ xValue: 'date', yValue: 'visitors' }, sortedActivityData);
    console.log('con', converted)
    const activityGraph = new cGraph(canvas,sortedActivityData);
    activityGraph.setAxisTitles('Date','Visitors');
    activityGraph.render();

};
initiateAdminDashboard();