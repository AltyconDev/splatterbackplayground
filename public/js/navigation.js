import { getElement, transition } from "./utilities.js";


export function initializePrimaryNavigation(){

    const [ primaryNavigationMenuButtonError, primaryNavigationMenuButton] = getElement('[data-primary-navigation-menu-button]');
    if(primaryNavigationMenuButtonError){ console.error(primaryNavigationMenuButtonError); return; };

    const [ primaryNavigationMenuError, primaryNavigationMenu ] = getElement('[data-primary-navigation-menu]');
    if(primaryNavigationMenuError){ console.error(primaryNavigationMenuError); return; };

    primaryNavigationMenuButton.addEventListener('click', (clickEvent)=>{
        clickEvent.preventDefault();
        
        if(!primaryNavigationMenu.classList.contains('insert') || 
            !primaryNavigationMenu.classList.contains('show')){
            
            primaryNavigationMenuButton.classList.add('active');
            transition('add', primaryNavigationMenu,'insert','show');

        }else{
            primaryNavigationMenuButton.classList.remove('active');
            transition('remove', primaryNavigationMenu,'show','insert');
        }
    })
};