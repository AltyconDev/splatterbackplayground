class MissingElementError extends Error{
    constructor(message){
        super(message);
        this.name = 'MissingElementError';
        this.message = `${this.name}: ${message}`;
    }
};
class MissingElementsError extends Error{
    constructor(message){
        super(message);
        this.name = 'MissingElementsError';
        this.message = `${this.name}: ${message}`;
    }
};
function randomNumberInRange(min,max,bool){

    if(bool === true) return Math.floor(Math.random() * (max - min) + min);

    return Math.random() * (max - min) + min;
};
function scale(n,inMin,inMax,outMin,outMax){
    return (n - inMin) * (outMax - outMin) / (inMax - inMin) + outMin
};
function addLeftZeroToNumber(num){
        if(typeof num === 'string'){

            if(num.split('')[0] === '0') return num;

            num = Number(num);
        }

        if(num < 10) return `0${num}`
        else return `${num}`;
};
function getTodaysDate(type){

    const period = new Date();
    const year = period.getFullYear();
    const month = period.getMonth() + 1;
    const date = period.getDate();

    const zeroPaddedLeftMonth = addLeftZeroToNumber(month);
    const zeroPaddedLeftDay = addLeftZeroToNumber(date);

    switch(type){

        case 'mm-dd-yyyy':

            return `${zeroPaddedLeftMonth}-${zeroPaddedLeftDay}-${year}`;

        case 'yyyy-mm-dd':

            return `${year}-${zeroPaddedLeftMonth}-${zeroPaddedLeftDay}`;

        case 'dd-mm-yyyy':

            return `${zeroPaddedLeftDay}-${zeroPaddedLeftMonth}-${year}`;

        default:
            
            return `${year}-${zeroPaddedLeftMonth}-${zeroPaddedLeftDay}`;
    }
};
// function capatalizeWord(word){
//     return word.charAt(0).toUpperCase() + word.slice(1);
// };

function createHtmlElement(tagName, attributes = {}, content, listeners){
    const element = document.createElement(tagName);
 
    for(const [key, value] of Object.entries(attributes)){
        if(key === 'class'){
            element.classList.add(...value.split(' '));
        }else if((Object.getOwnPropertyDescriptor(element, key)?.writable)){
            element[key] = value;
        }else{
            element.setAttribute(key, value);
        }
    }
    if(content){
        if(Array.isArray(content)){
            content.forEach(item => {
                if(item instanceof Node){
                    element.appendChild(item);
                }else{
                    element.appendChild(document.createTextNode(item));
                }
            });
        }else if(content instanceof Node){
            element.appendChild(content);
        }else{
            element.textContent = content;
        }
    }
    if(listeners){
        if(Array.isArray(listeners)){
            listeners.forEach( listener => {
                element.addEventListener(listener.type, listener.listen);
            });
        }
        if(isObject(listeners)){
            element.addEventListener(listeners.type, listeners.listen);
        }
        
    }

    return element;
};

function getElement(selector,callback){

    const element = document.querySelector(selector);

    if(callback){ callback(element); return; };

    if(!element) return [new MissingElementError(selector),null];

    if(element) return [null,element];
};
function getElements(selector,callback){

    const elements = [...document.querySelectorAll(selector)];

    if(callback){ callback(elements); return; };

    if(!elements.length === 0) return [new MissingElementsError(selector),null];

    if(elements.length > 0) return [null,elements];
};


function setState(element,type,state){

    element.dataset[type] = state;
};

function transition(type,element,firstClassNames,lastClassNames,delay,callback){

    if(Array.isArray(firstClassNames)) element.classList[type](...firstClassNames);
    else element.classList[type](firstClassNames);

    if(lastClassNames){
        if(Array.isArray(lastClassNames)){
            setTimeout( ()=>{
                element.classList[type](...lastClassNames);
            },delay || 100)
        }else{
            setTimeout( ()=>{
                element.classList[type](lastClassNames);
            },delay || 100)
        }
    }

    if(callback) callback();
};

function sanitizeFormData(data){
    
    const map = {
        '&':'&amp;',
        '<':'&lt;',
        '>':'&gt;',
        '"':'&quot;',
        "'":'&#39;',
        '/':'&#x2F;'
    }
    const regy = /[&<>"'\/]/g;
    return data.replace(regy, (match) => map[match]);
};

function fixCanvas(canvasElement,dpi){
    const parent = canvasElement.parentElement;
    const styleWidth = +getComputedStyle(parent).getPropertyValue('width').slice(0,-2);
    const styleHeight = +getComputedStyle(parent).getPropertyValue('height').slice(0,-2);
    canvasElement.setAttribute('width', styleWidth * dpi);
    canvasElement.setAttribute('height', styleHeight * dpi);
};
const monthDaysMap = {
    '1':31,
    '2':28,
    '3':31,
    '4':30,
    '5':31,
    '6':30,
    '7':31,
    '8':31,
    '9':30,
    '10':31,
    '11':30,
    '12':31
};
function createRandomDate(type){
    const rMonth = randomNumberInRange(1,12,true)
    const rDay = randomNumberInRange(1,monthDaysMap[`${rMonth}`],true);
    const year = '2025';
    switch(type){
        case 'yyyy-mm-dd':
            return `${year}-${addLeftZeroToNumber(rMonth)}-${addLeftZeroToNumber(rDay)}`;
        
        case 'mm-dd-yyyy':
            return `${addLeftZeroToNumber(rMonth)}-${addLeftZeroToNumber(rDay)}-${year}`;
        
        case 'dd-mm-yyyy':
            return `${addLeftZeroToNumber(rDay)}-${addLeftZeroToNumber(rMonth)}-${year}`;
        
        default:
            return `${addLeftZeroToNumber(rMonth)}-${addLeftZeroToNumber(rDay)}-${year}`;
    }
    
};
function sortDates(arr){
    const newArr = [...arr];
    if(typeof arr[0] === 'string'){
        return newArr.sort( (a,b)=> new Date(a) - new Date(b));
    }
    return newArr.sort( (a,b)=> new Date(a.date) - new Date(b.date));
};

export {
    randomNumberInRange,
    scale,
    getTodaysDate,
    createHtmlElement,
    getElement,
    getElements,
    setState,
    transition,
    sanitizeFormData,
    fixCanvas,
    createRandomDate,
    sortDates
}
