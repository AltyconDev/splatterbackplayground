import { transition } from "./utilities.js";


function deactiveTabs(controls){
    controls.forEach( control => {
        if(control.classList.contains('active')){
            control.classList.remove('active')
        }
    })
};

function deactivateTabConnections(connections){
    connections.forEach( connection => {
        if(connection.classList.contains('show') || 
            connection.classList.contains('insert')){
            connection.classList.remove('show','insert');
        }
    })
};

export function initializeTabConnections(){

    document.addEventListener('click', (clickEvent)=>{

        const target = clickEvent.target;
        const tabId = target.dataset.tabId;

        if(!tabId) return;

        const connection = document.querySelector(`[data-tab-connection="${tabId}"]`);

        if(!connection) return;

        const controlsContainer = target.parentElement;
        const controls = [...controlsContainer.children];

        const connectionsContainer = connection.parentElement;
        const connections = [...connectionsContainer.children];

        deactiveTabs(controls);

        deactivateTabConnections(connections);

        transition('add', connection,'insert','show',100, ()=>{
            target.classList.add('active');
        });
        
    })
};