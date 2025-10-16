import { getElement, transition } from "../utilities.js";


export function initializeImageViewer(){

    const [ imageViewerError, imageViewer ] = getElement('[data-image-viewer]');
    if(imageViewerError){ console.error(imageViewerError); return; };
    
    const [ imageViewerImageError, imageViewerImage ] = getElement('[data-image-viewer] > img');
    if(imageViewerImageError){ console.error(imageViewerImageError); return; };
    
    imageViewer.addEventListener('click', (clickEvent)=>{
    
        if(clickEvent.target.nodeName !== 'IMG'){

            transition('remove',imageViewer,'show','insert',500, ()=>{

                imageViewerImage.src = "";
            });
        }
    });

    document.addEventListener('click', (clickEvent)=>{

        const target = clickEvent.target;
        
        if(target.nodeName === 'IMG' && target.classList.contains('viewable')){
            imageViewerImage.src = target.src;
            transition('add',imageViewer,'insert','show');
        }
    });
};